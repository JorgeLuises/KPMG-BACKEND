import { DataTypes } from "sequelize";
import db from '../config/db.js';

const NivelPago = db.define('nivelPago', {
    idPago: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

export default NivelPago;