import jwt from 'jsonwebtoken';

export default function checkAuth(req, res, next) {
    //Extraer token de las cookies
    const token = req.cookies._token;

    if(!token) {
        return res.status(401).json({ mensaje: 'Autorización denegada, requieres iniciar sesión para poder acceder' });
    }

    try {
        //Verificar el token con la palabra secreta
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(401).json({ mensaje: 'Token no válido' });
    }
}