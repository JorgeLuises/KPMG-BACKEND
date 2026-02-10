import express from 'express';
import { registrarUsuario, iniciarSesion, cerrarSesion, resetContraseña, verificacionToken } from '../controllers/usuarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/registro', registrarUsuario);
router.post('/login', iniciarSesion);
router.post('/logout', checkAuth, cerrarSesion);
router.post('/reestablecerPassword', resetContraseña);
router.get('/verificacion', checkAuth, verificacionToken);

export default router;