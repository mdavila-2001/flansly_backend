import Joi from 'joi';

export const registerSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    displayName: Joi.string().required(),
    role: Joi.string().valid('creator', 'follower').required()
});

export const loginSchema = Joi.object({
    identity: Joi.string().required(),
    password: Joi.string().required()
});
