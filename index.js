import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import db from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import empleadoRoutes from './routes/empleadoRoutes.js';

const app = express();

dotenv.config({ path: '.env' });

try {
    await db.authenticate();
    db.sync();
    console.log('DB connection succesfuly')
} catch (error) {
    console.error(error);
}

//===== Middlewares ====//
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Middleware para guardar datos en cookies
app.use(cookieParser());

//====== Routing ===== //
app.use('/usuario', usuarioRoutes);
app.use('/empleados', empleadoRoutes);


const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})