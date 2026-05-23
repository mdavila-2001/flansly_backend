import { AppError } from '../../../domain/errors/app.error.js';

export const errorHandler = (error, req, res, next) => {
    // Errores semánticos controlados de la aplicación/dominio (herederos de AppError)
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
    }

    // Errores provenientes de Sequelize: ocultar detalle nativo y registrar para auditoría
    if (error.name && error.name.startsWith('Sequelize')) {
        console.error('💥 [Error Sequelize]:', error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json({
            error: 'Ocurrió un conflicto de persistencia o restricción en el sistema de datos'
        });
    }

    // Errores no controlados (Bug, red, etc.)
    console.error('💥 [Error Inesperado]:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
};
