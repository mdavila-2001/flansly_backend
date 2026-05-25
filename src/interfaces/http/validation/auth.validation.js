import Joi from 'joi';
import { ALL_ROLES } from '../../../domain/constants/roles.js';

export const registerSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    displayName: Joi.string().required(),
    role: Joi.string().valid(...ALL_ROLES).required()
});

export const loginSchema = Joi.object({
    identity: Joi.string().required(),
    password: Joi.string().required()
});
