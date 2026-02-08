import { exit } from 'node:process';
import db from '../config/db.js';
import paymentDescriptions from './paymentTier.js';
import paises from './paises.js';
import departamentos from './departamentos.js';
import { Ciudad, NivelPago, Pais, Departamento } from '../models/indexModels.js';

async function importarDatos() {
    try {
        //Autenticar la conexion a la base de datos
        await db.authenticate();

        //Formateo de la tabla de la base de datos
        await db.sync({ force: true });

        //Inserción de datos
        await Promise.all([
            NivelPago.bulkCreate(paymentDescriptions),
            Departamento.bulkCreate(departamentos)
        ]);

        const paisesInsertados = await Pais.bulkCreate(paises, { returning: true });
        const ciudadesConPais = [
            { nombreCiudad: 'Bangalore', idPais: paisesInsertados.find(p => p.nombrePais === 'India').idPais },
            { nombreCiudad: 'Pune', idPais: paisesInsertados.find(p => p.nombrePais === 'India').idPais },
            { nombreCiudad: 'New Delhi', idPais: paisesInsertados.find(p => p.nombrePais === 'India').idPais },
            { nombreCiudad: 'CDMX', idPais: paisesInsertados.find(p => p.nombrePais === 'México').idPais },
            { nombreCiudad: 'New York', idPais: paisesInsertados.find(p => p.nombrePais === 'Estados Unidos').idPais }
        ];
        await Ciudad.bulkCreate(ciudadesConPais);

        await db.close();

        console.log('Datos insertados correctamente');
        exit()
    } catch (error) {
        console.error(error);
        exit(1);
    }
}

if (process.argv[2] === "-i") {
    importarDatos();
}