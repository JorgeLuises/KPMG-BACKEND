import { DataTypes } from "sequelize";
import db from '../config/db.js';

const Ciudad = db.define('ciudad', {
    idCiudad: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    nombreCiudad: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
});

export default Ciudad;