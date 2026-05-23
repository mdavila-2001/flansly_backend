import { Router } from 'express';
import { FollowerController } from '../controllers/follower.controller.js';
import { isAuth } from '../middleware/is_auth.js';
import { checkRole } from '../middleware/check_role.js';
import { validateSchema } from '../middleware/validate.js';
import { donateSchema, commentSchema } from '../validation/follower.validation.js';

const router = Router();

// Seguridad global: solo seguidores autenticados
router.use(isAuth, checkRole(['follower']));

router.post('/donate',
    validateSchema(donateSchema),
    FollowerController.donate
);

router.get('/feed', FollowerController.feed);

router.post('/posts/:id/comments',
    validateSchema(commentSchema),
    FollowerController.comment
);

router.post('/favorites/:id', FollowerController.toggleFavorite);

export default router;
