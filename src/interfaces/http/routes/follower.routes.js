import { Router } from 'express';
import { FollowerController } from '../controllers/follower.controller.js';
import { isAuth } from '../middleware/is_auth.js';
import { checkRole } from '../middleware/check_role.js';
import { validateSchema } from '../middleware/validate.js';
import { donateSchema, commentSchema, historyQuerySchema } from '../validation/follower.validation.js';

const router = Router();

router.use(isAuth, checkRole(['follower']));

router.get('/history',
    validateSchema(historyQuerySchema, 'query'),
    FollowerController.getHistory
);

router.post('/donate',
    validateSchema(donateSchema),
    FollowerController.donate
);

router.get('/feed', FollowerController.feed);

router.get('/creators', FollowerController.getAllCreators);
router.get('/creators/:id', FollowerController.getCreatorProfile);

router.post('/posts/:id/comments',
    validateSchema(commentSchema),
    FollowerController.comment
);

router.post('/favorites/:id', FollowerController.toggleFavorite);

export default router;
