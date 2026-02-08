import { check, validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import { Usuario } from '../models/indexModels.js';
import { generarJWT, generarId } from "../helpers/tokens.js";

// ====== Creación de usuario ====== //
async function registrarUsuario(req, res) {
    try {
        //Validación de campos
        await check('nombre')
            .notEmpty().withMessage('El nombre no puede ir vacío')
            .isLength({ min: 2 }).withMessage('El nombre debe de tener almenos dos caracteres').run(req);
        await check('email').isEmail().withMessage('Está no es una dirección de correo valida').run(req);
        await check('password').isLength({ min: 6 }).withMessage('Tu contraseña debe de contener al menos 6 caracteres').run(req);
        await check('repitePassword').equals(req.body.password).withMessage('Tus contraseñas no son iguales').run(req);

        let resultado = validationResult(req);

        //Mostrar errores de validación
        if (!resultado.isEmpty()) {
            return res.status(400).json({
                errores: resultado.array(),
                usuario: {
                    nombre: req.body.nombre,
                    email: req.body.email
                }
            });
        }

        //Verificar que el usuario no exista en la base de datos
        const existeUsuario = await Usuario.findOne({ where: { email: req.body.email } });
        if (existeUsuario) {
            return res.status(400).json({
                errores: [{ msg: 'Ya existe un usuario registrado con ese correo, intenta con un nuevo' }],
                usuario: {
                    nombre: req.body.nombre,
                    email: req.body.email
                }
            });
        }

        //Creación de usuario
        await Usuario.create({
            nombreUsuario: req.body.nombre,
            email: req.body.email,
            password: req.body.password,
            token: generarId()
        });

        res.status(201).json({
            mensaje: 'Usuario creado correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errores: [{ msg: "Hubo un error al registrar el usuario"}]});
    }
}

// ===== Login del usuario ===== //
async function iniciarSesion(req, res) {
    const { email, password } = req.body;

    try {
        //Validación de campos
        await check('email').isEmail().withMessage('Esta no es una dirección de correo valida').run(req);
        await check('password').notEmpty().withMessage('Se requiere ingresar una contraseña').run(req);

        let resultado = validationResult(req);

        //Verificar validación
        if (!resultado.isEmpty()) {
            return res.status(400).json({
                errores: resultado.array(),
                usuario: {
                    email: email
                }
            });
        }

        //Verificar que exista el usuario
        const usuario = await Usuario.findOne({ where: { email }});
        if(!usuario) {
            return res.status(400).json({
                errores: [{ msg: 'El usuario no existe' }],
                usuario: {
                    email: email
                }
            });
        }

        //Verificar password
        if(!usuario.verificarPassword(password)) {
            return res.status(400).json({
                errores: [{ msg: 'Contraseña incorrecta, intenta de nuevo' }],
                usuario: {
                    email: email
                }
            });
        }

        //Autenticar usuario
        const token = generarJWT(usuario.idUsuario);
        return res.cookie('_token', token, {
            httpOnly: true
        }).status(200).json({ mensaje: 'Usuario logeado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errores: [{ msg: "Hubo un error al iniciar la sesion"}]});
    }
}

// ======= Reestablecer contraseña ====//
async function resetContraseña(req, res) {
    const { email, password } = req.body;

    try {
        //Validación de campos
        await check('email').isEmail().withMessage('Esta no es una dirección de correo valida').run(req);
        await check('password').isLength({ min: 6 }).withMessage('Tu contraseña debe de contener al menos 6 caracteres').run(req);

        let resultado = validationResult(req);

        //Verificar la validación de campos
        if(!resultado.isEmpty()) {
            return res.status(400).json({
                errores: resultado.array(),
                usuario: {
                    email: email
                }
            })
        }

        //Verificar que exista usuario
        const usuario = await Usuario.findOne({ where: { email }});
        if(!usuario) {
            return res.status(400).json({
                errores: [{ msg: "La dirección de correo no se encunetra registrada" }],
                usuario: {
                    email: email
                }
            })
        }

        //Establecer nueva contraseña
        if(usuario.token) {
            const salt = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash(password, salt);
            await usuario.save();
            return res.status(201).json({
                mensaje: "Contraseña restablecida correctamente"
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ errores: [{ msg: "Hubo un error al reestablecer la contraseña"}]});
    }
}

function verificacionToken(req, res) {
    res.status(200).json({ mensaje: "Usuario autenticado correctamente" });
}

export {
    registrarUsuario,
    iniciarSesion,
    resetContraseña,
    verificacionToken
}