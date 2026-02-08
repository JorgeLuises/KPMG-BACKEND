import Ciudad from "./Ciudad.js";
import Departamento from "./Departamento.js";
import Empleado from "./Empleado.js";
import NivelPago from "./NivelesPago.js";
import Pais from "./Pais.js";
import Usuario from "./Usuario.js";

Ciudad.belongsTo(Pais, { foreignKey: 'idPais' });

Empleado.belongsTo(Departamento, { foreignKey: 'idDepartamento' });
Empleado.belongsTo(Ciudad, { foreignKey: 'idCiudad' });
Empleado.belongsTo(NivelPago, { foreignKey: 'idPago' });

export {
    Ciudad,
    Departamento,
    Empleado,
    NivelPago,
    Pais,
    Usuario
}