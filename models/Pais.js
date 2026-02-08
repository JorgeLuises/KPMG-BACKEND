import { DataTypes } from "sequelize";
import db from '../config/db.js';

const Pais = db.define('pais', {
    idPais: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    nombrePais: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
});

export default Pais