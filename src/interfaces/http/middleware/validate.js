export const validateSchema = (schema, source = 'body') => {
    return (req, res, next) => {
        const data = source === 'query' ? req.query : req.body;
        
        const { error, value } = schema.validate(data, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            const messages = error.details.map((detail) => detail.message);
            return res.status(400).json({ error: messages });
        }

        if (source === 'query') {
            Object.defineProperty(req, 'query', {
                value: value,
                writable: true,
                configurable: true,
                enumerable: true
            });
        } else {
            req.body = value;
        }
        
        next();
    };
};
