import { Router } from 'express';
import authRoutes from './auth.routes.js';
import creatorRoutes from './creator.routes.js';
import followerRoutes from './follower.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/creator', creatorRoutes);
router.use('/follower', followerRoutes);

export default router;
