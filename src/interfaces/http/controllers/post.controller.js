import { useCases } from '../../../infrastructure/container.js';

export class PostController {
    static async createPost(req, res, next) {
        try {
            let imageUrl = null;
            if (req.file) {
                imageUrl = `/uploads/${req.file.filename}`;
            }

            const post = await useCases.createPost.execute(req.user.id, req.body.contentText, imageUrl);

            return res.status(201).json(post);
        } catch (error) {
            next(error);
        }
    }

    static async getPosts(req, res, next) {
        try {
            const posts = await useCases.getCreatorPosts.execute(req.user.id);

            return res.status(200).json(posts);
        } catch (error) {
            next(error);
        }
    }
}
