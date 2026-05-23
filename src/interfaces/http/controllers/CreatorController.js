import { UpdateCreatorProfile } from '../../../application/use_cases/creator/UpdateCreatorProfile.js';
import { UpdateSupportGoal } from '../../../application/use_cases/creator/UpdateSupportGoal.js';
import { CreatePost } from '../../../application/use_cases/creator/CreatePost.js';
import { GetCreatorPosts } from '../../../application/use_cases/creator/GetCreatorPosts.js';
import { UserRepository } from '../../../infrastructure/repositories/UserRepository.js';
import { PostRepository } from '../../../infrastructure/repositories/PostRepository.js';
import { GoalRepository } from '../../../infrastructure/repositories/GoalRepository.js';

export class CreatorController {
    static async updateProfile(req, res, next) {
        try {
            const userRepository = new UserRepository();
            const useCase = new UpdateCreatorProfile(userRepository);

            let profileImageUrl = null;
            let bannerImageUrl = null;

            if (req.files) {
                if (req.files.avatar && req.files.avatar[0]) {
                    profileImageUrl = `/uploads/${req.files.avatar[0].filename}`;
                }
                if (req.files.banner && req.files.banner[0]) {
                    bannerImageUrl = `/uploads/${req.files.banner[0].filename}`;
                }
            }

            const user = await useCase.execute(req.user.id, {
                displayName: req.body.displayName,
                profileImageUrl,
                bannerImageUrl
            });

            return res.status(200).json({
                id: user.id,
                username: user.username,
                displayName: user.displayName,
                profileImageUrl: user.profileImageUrl,
                bannerImageUrl: user.bannerImageUrl
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateGoal(req, res, next) {
        try {
            const goalRepository = new GoalRepository();
            const useCase = new UpdateSupportGoal(goalRepository);

            const result = await useCase.execute(req.user.id, req.body.title, req.body.description);

            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async createPost(req, res, next) {
        try {
            const postRepository = new PostRepository();
            const useCase = new CreatePost(postRepository);

            let imageUrl = null;
            if (req.file) {
                imageUrl = `/uploads/${req.file.filename}`;
            }

            const post = await useCase.execute(req.user.id, req.body.contentText, imageUrl);

            return res.status(201).json(post);
        } catch (error) {
            next(error);
        }
    }

    static async getPosts(req, res, next) {
        try {
            const postRepository = new PostRepository();
            const useCase = new GetCreatorPosts(postRepository);

            const posts = await useCase.execute(req.user.id);

            return res.status(200).json(posts);
        } catch (error) {
            next(error);
        }
    }
}
