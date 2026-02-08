import { DataTypes } from "sequelize";
import db from '../config/db.js';

const Departamento = db.define('departamento', {
    idDepartamento: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    departamento: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
});

export default Departamento;