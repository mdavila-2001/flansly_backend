import { tokenService } from '../../../infrastructure/container.js';
import { UnauthorizedError } from '../../../application/errors/unauthorized.error.js';

export const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedError('Token de acceso ausente, inválido o expirado');
        }

        const token = authHeader.split(' ')[1];
        const decoded = tokenService.verifyToken(token);

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
