import Departamento from "../models/Departamento.js";

//====== Mostrar todos los departamentos ====//
export default async function mostrarDepartamentos(req, res) {
    try {
        const departamentos = await Departamento.findAll({
            attributes: ['idDepartamento', 'departamento']
        });
        res.status(200).json(departamentos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al mostrar los departamentos' });
    }
}