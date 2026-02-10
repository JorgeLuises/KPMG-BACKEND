import { check, validationResult } from "express-validator";
import Empleado from "../models/Empleado.js";
import { Op, Sequelize } from "sequelize";
import Departamento from "../models/Departamento.js";
import Ciudad from "../models/Ciudad.js";

//====== Mostrar todos los empleados ====//
async function mostrarEmpleados(req, res) {
    try {
        const empleados = await Empleado.findAll({
            attributes: {
                include: [
                    [Sequelize.col('departamento.departamento'), 'departamento'],
                    [Sequelize.col('ciudad.nombreCiudad'), 'nombreCiudad']
                ]
            },
            include: [
                { model: Departamento, attributes: [], required: false },
                { model: Ciudad, attributes: [], required: false }
            ],
            raw: true
        });

        res.status(200).json(empleados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errores: [{ msg: 'Error al mostrar los empleados' }] });
    }
}

//===== Mostrar un empleado ====//
async function mostrarEmpleado(req, res) {
    const { id } = req.params;

    try {
        const empleado = await Empleado.findOne({ where: { idEmpleado: id } });
        if (!empleado) {
            return res.status(404).json({ errores: [{ msg: 'Empleado no encontrado' }] });
        }
        res.status(200).json(empleado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errores: [{ msg: 'Error al mostrar el empleado' }] });
    }
}

//===== Agregar empleado ====//
async function agregarEmpleado(req, res) {
    const { educacion, anioUnion, edad, genero, benched, experiencia, idDepartamento, idCiudad, idPago, nombreEmpleado } = req.body;

    try {
        //Validación de campos
        await check('anioUnion')
            .isInt({ min: 1900, max: 2025 }).withMessage('El año de unión debe ser un número entre 1900 y 2025')
            .notEmpty().withMessage('El año de unión es obligatorio').run(req);
        await check('edad')
            .isInt({ min: 0 }).withMessage('La edad debe ser un número positivo')
            .notEmpty().withMessage('La edad es obligatoria').run(req);
        await check('benched')
            .isBoolean().withMessage('El campo benched debe ser un valor valido (si o no)')
            .notEmpty().withMessage('El campo benched es obligatorio').run(req);
        await check('experiencia')
            .isInt({ min: 0 }).withMessage('La experiencia debe ser un número positivo')
            .notEmpty().withMessage('La experiencia es obligatoria').run(req);
        await check('idDepartamento').notEmpty().withMessage('El departamento es obligatorio').run(req);
        await check('idCiudad').notEmpty().withMessage('La ciudad es obligatoria').run(req);
        await check('idPago').notEmpty().withMessage('El nivel de pago es obligatorio').run(req);
        await check('nombreEmpleado')
            .notEmpty().withMessage('El nombre del empleado es obligatorio')
            .isLength({ min: 2 }).withMessage('El nombre del empleado debe tener al menos 2 caracteres').run(req);

        let resultado = validationResult(req);
        if (!resultado.isEmpty()) {
            return res.status(400).json({ errores: resultado.array() });
        }

        //Evitar datos duplicados
        const empleado = await Empleado.findOne({ where: { nombreEmpleado } });
        if (empleado) {
            return res.status(400).json({ errores: [{ msg: 'Ya existe un empleado registrado con ese nombre, intenta con uno nuevo' }] });
        }

        //Creación de empleado
        await Empleado.create({
            educacion,
            anioUnion,
            edad,
            genero,
            benched,
            experiencia,
            idDepartamento,
            idCiudad,
            idPago,
            nombreEmpleado
        });

        res.status(201).json({ mensaje: 'Empleado agregado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errores: [{ msg: 'Error al agregar el empleado' }] });
    }
}

//===== Editar empleado ======//
async function editarEmpleado(req, res) {
    const { id } = req.params;
    const { educacion, anioUnion, edad, genero, benched, experiencia, idDepartamento, idCiudad, idPago, nombreEmpleado } = req.body;

    try {
        //Validación de campos
        await check('anioUnion')
            .isInt({ min: 1900, max: 2025 }).withMessage('El año de unión debe ser un número entre 1900 y 2025')
            .notEmpty().withMessage('El año de unión es obligatorio').run(req);
        await check('edad')
            .isInt({ min: 0 }).withMessage('La edad debe ser un número positivo')
            .notEmpty().withMessage('La edad es obligatoria').run(req);
        await check('benched')
            .isBoolean().withMessage('El campo benched debe ser un valor valido (si o no)')
            .notEmpty().withMessage('El campo benched es obligatorio').run(req);
        await check('experiencia')
            .isInt({ min: 0 }).withMessage('La experiencia debe ser un número positivo')
            .notEmpty().withMessage('La experiencia es obligatoria').run(req);
        await check('idDepartamento').notEmpty().withMessage('El departamento es obligatorio').run(req);
        await check('idCiudad').notEmpty().withMessage('La ciudad es obligatoria').run(req);
        await check('idPago').notEmpty().withMessage('El nivel de pago es obligatorio').run(req);
        await check('nombreEmpleado')
            .notEmpty().withMessage('El nombre del empleado es obligatorio')
            .isLength({ min: 2 }).withMessage('El nombre del empleado debe tener al menos 2 caracteres').run(req);

        let resultado = validationResult(req);
        if (!resultado.isEmpty()) {
            return res.status(400).json({ errores: resultado.array() });
        }

        //Verificar que el empleado exista en la base de datos
        const empleado = await Empleado.findOne({ where: { idEmpleado: id } });
        if (!empleado) {
            return res.status(404).json({ errores: [{ msg: 'Empleado no encontrado' }] });
        }

        //Evitar datos duplicados
        const empleadoExistente = await Empleado.findOne({ where: { idEmpleado: { [Op.ne]: id }, nombreEmpleado } });
        if (empleadoExistente) {
            return res.status(400).json({ errores: [{ msg: 'Ya existe un empleado registrado con ese nombre, intenta con uno nuevo' }] });
        }

        //Actualización de empleado
        await Empleado.update({
            educacion,
            anioUnion,
            edad,
            genero,
            benched,
            experiencia,
            idDepartamento,
            idCiudad,
            idPago,
            nombreEmpleado
        }, { where: { idEmpleado: id } });
        res.status(200).json({ mensaje: 'Empleado actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errores: [{ msg: 'Error al editar el empleado' }] });
    }
}

//======= Eliminar empleado ======//
async function eliminarEmpleado(req, res) {
    const { id } = req.params;

    try {
        //Busqueda de empleado
        const empleado = await Empleado.findOne({ where: { idEmpleado: id } });
        if (!empleado) {
            return res.status(404).json({ mensaje: 'Empleado no encontrado' });
        }

        //Eliminación de empleado
        await Empleado.destroy({ where: { idEmpleado: id } });
        res.status(200).json({ mensaje: 'Empleado eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar el empleado' });
    }
}

export {
    mostrarEmpleados,
    mostrarEmpleado,
    agregarEmpleado,
    editarEmpleado,
    eliminarEmpleado
}