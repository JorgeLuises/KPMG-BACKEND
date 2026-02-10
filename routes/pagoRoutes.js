import express from 'express';
import mostrarPagos from '../controllers/pagoControllers.js';

const router = express.Router();

router.get('/mostrarPagos', mostrarPagos);

export default router;