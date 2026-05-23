export const errorHandler = (error, req, res, next) => {
    // Errores provenientes de Sequelize: ocultar detalle nativo
    if (error.name && error.name.startsWith('Sequelize')) {
        console.error(error);
        const statusCode = error.name === 'SequelizeValidationError' ? 400 : 500;
        return res.status(statusCode).json({
            error: 'Ocurrió un conflicto de persistencia o restricción en el sistema de datos'
        });
    }

    // Errores semánticos con statusCode definido (BusinessRuleError, NotFoundError, etc.)
    const statusCode = error.statusCode || 500;
    const message = error.statusCode
        ? error.message
        : 'Error interno del servidor';

    return res.status(statusCode).json({ error: message });
};
