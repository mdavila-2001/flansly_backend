import { JwtService } from '../../../infrastructure/security/jwt.service.js';
import { UnauthorizedError } from '../../../application/errors/UnauthorizedError.js';

export const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedError('Token de acceso ausente, inválido o expirado');
        }

        const token = authHeader.split(' ')[1];
        const decoded = JwtService.verifyToken(token);

        req.user = {
            id: decoded.id,
            username: decoded.username,
            role: decoded.role
        };

        next();
    } catch (error) {
        next(new UnauthorizedError('Token de acceso ausente, inválido o expirado'));
    }
};
