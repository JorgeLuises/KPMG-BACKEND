import NivelPago from "../models/NivelesPago.js";

//===== Mostrar todos los niveles de pago ====//
export default async function mostrarPagos(req, res) {
    try {
        const pagos = await NivelPago.findAll({
            attributes: ['idPago']
        });
        res.status(200).json(pagos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al mostrar los niveles de pago' });
    }
}