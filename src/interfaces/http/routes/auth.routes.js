import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { validateSchema } from '../middleware/validate.js';
import { registerSchema, loginSchema } from '../validation/auth.validation.js';

const router = Router();

router.post('/register', validateSchema(registerSchema), AuthController.register);
router.post('/login', validateSchema(loginSchema), AuthController.login);

export default router;
