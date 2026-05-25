import Joi from 'joi';

export const reportsQuerySchema = Joi.object({
    start_date: Joi.string().isoDate().optional(),
    end_date: Joi.string().isoDate().optional()
});
