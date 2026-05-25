import Joi from 'joi';

export const goalSchema = Joi.object({
    title: Joi.string().max(150).required(),
    description: Joi.string().required(),
    targetFlans: Joi.number().integer().min(1).required()
});

export const postTextSchema = Joi.object({
    contentText: Joi.string().optional().allow(null).min(1)
});
