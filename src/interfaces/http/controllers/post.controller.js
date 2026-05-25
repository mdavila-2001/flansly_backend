import { useCases } from '../../../infrastructure/container.js';

export class PostController {
    static async createPost(req, res, next) {
        try {
            let imageUrl = null;
            if (req.file) {
                imageUrl = `/uploads/${req.file.filename}`;
            }

            const textContent = req.body?.contentText || null;
            const post = await useCases.createPost.execute(req.user.id, textContent, imageUrl);

            return res.status(201).json(post);
        } catch (error) {
            console.error("❌ CRITICAL CRASH EN CREATE_POST:", error);
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
