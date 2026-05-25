import Joi from 'joi';

export const donateSchema = Joi.object({
    creatorId: Joi.string().guid({ version: 'uuidv4' }).required(),
    quantity: Joi.number().integer().min(1).required()
});

export const commentSchema = Joi.object({
    content: Joi.string().min(1).max(500).required()
});

export const historyQuerySchema = Joi.object({
    startDate: Joi.string().isoDate().optional().allow(null, ''),
    endDate: Joi.string().isoDate().optional().allow(null, ''),
    creatorName: Joi.string().optional().allow(null, '')
});
