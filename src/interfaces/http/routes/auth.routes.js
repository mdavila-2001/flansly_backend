import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { validateSchema } from '../middleware/validate.js';
import { registerSchema, loginSchema } from '../validation/auth.validation.js';
import { uploadImage } from '../middleware/upload_image.js';
import { isAuth } from '../middleware/is_auth.js';

const router = Router();

router.post('/register',
    uploadImage.fields([{ name: 'avatar', maxCount: 1 }, { name: 'banner', maxCount: 1 }]),
    validateSchema(registerSchema),
    AuthController.register
);
router.post('/login', validateSchema(loginSchema), AuthController.login);
router.get('/me', isAuth, AuthController.me);

export default router;
