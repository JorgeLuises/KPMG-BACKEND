import express from 'express';
import mostrarCiudades from '../controllers/ciudadController.js';

const router = express.Router();

router.get('/mostrarCiudades', mostrarCiudades);

export default router;