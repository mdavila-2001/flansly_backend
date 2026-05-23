import { Router } from 'express';
import { CreatorController } from '../controllers/creator.controller.js';
import { PostController } from '../controllers/post.controller.js';
import { isAuth } from '../middleware/is_auth.js';
import { checkRole } from '../middleware/check_role.js';
import { validateSchema } from '../middleware/validate.js';
import { uploadImage } from '../middleware/upload_image.js';
import { goalSchema, postTextSchema } from '../validation/creator.validation.js';

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

router.get('/reports', async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        const report = await useCases.getCreatorReports.execute(req.user.id, startDate, endDate);
        return res.status(200).json(report);
    } catch (error) {
        next(error);
    }
});

export default router;
