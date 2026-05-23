import { Router } from 'express';
import { CreatorController } from '../controllers/creator.controller.js';
import { PostController } from '../controllers/post.controller.js';
import { isAuth } from '../middleware/is_auth.js';
import { checkRole } from '../middleware/check_role.js';
import { validateSchema } from '../middleware/validate.js';
import { uploadImage } from '../middleware/upload_image.js';
import { goalSchema, postTextSchema } from '../validation/creator.validation.js';
import { reportsQuerySchema } from '../validation/reports.validation.js';

const router = Router();

router.use(isAuth, checkRole(['creator']));

router.put('/profile',
    uploadImage.fields([{ name: 'avatar', maxCount: 1 }, { name: 'banner', maxCount: 1 }]),
    CreatorController.updateProfile
);

router.put('/goal',
    validateSchema(goalSchema),
    CreatorController.updateGoal
);

router.post('/posts',
    uploadImage.single('image'),
    validateSchema(postTextSchema),
    PostController.createPost
);

router.get('/posts', PostController.getPosts);

router.get('/reports',
    validateSchema(reportsQuerySchema, 'query'),
    CreatorController.getReports
);

export default router;
