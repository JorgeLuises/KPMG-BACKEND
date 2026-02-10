import Ciudad from "../models/Ciudad.js";

//====== Mostrar todas las ciudades ====//
export default async function mostrarCiudades(req, res) {
    try {
        const ciudades = await Ciudad.findAll({
            attributes: ['idCiudad', 'nombreCiudad']
        });
        res.status(200).json(ciudades);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al mostrar las ciudades' });
    }
}
