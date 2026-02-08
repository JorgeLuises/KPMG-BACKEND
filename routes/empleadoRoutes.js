import express from 'express';
import checkAuth from '../middleware/authMiddleware.js';
import { mostrarEmpleados, mostrarEmpleado, agregarEmpleado, editarEmpleado, eliminarEmpleado } from '../controllers/empleadoController.js';

const router = express.Router();

router.get('/empleados', checkAuth, mostrarEmpleados);
router.get('/empleado/:id', checkAuth, mostrarEmpleado);
router.post('/agregarEmpleado', checkAuth, agregarEmpleado);
router.patch('/editarEmpleado/:id', checkAuth, editarEmpleado);
router.delete('/eliminarEmpleado/:id', checkAuth, eliminarEmpleado);

export default router;