import express from 'express';
import mostrarDepartamentos from '../controllers/departamentoController.js';

const router = express.Router();

router.get('/mostrarDepartamentos', mostrarDepartamentos);

export default router;