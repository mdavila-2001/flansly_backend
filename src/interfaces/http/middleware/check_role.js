import { ForbiddenError } from '../../../application/errors/forbidden.error.js';

export const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return next(new ForbiddenError('No posees los privilegios requeridos para consumir este recurso'));
        }

        next();
    };
};
