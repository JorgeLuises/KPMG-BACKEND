import { DataTypes } from "sequelize";
import db from '../config/db.js';

const Empleado = db.define('empleado', {
    idEmpleado: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    nombreEmpleado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    educacion: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    anioUnion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    genero: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    benched: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    experiencia: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

export default Empleado;