import { Comment } from '../../../domain/entities/comment.js';
import { BusinessRuleError } from '../../../domain/errors/business_rule.error.js';
import { NotFoundError } from '../../errors/not_found.error.js';

export class CreateFollowerComment {
    constructor(followerRepository, postRepository, commentRepository) {
        this.followerRepository = followerRepository;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }

    async execute(followerId, postId, content) {
        const post = await this.postRepository.findById(postId);
        if (!post) {
            throw new NotFoundError('La publicación no fue encontrada.');
        }

        if (post.creatorId !== followerId) {
            const hasSupported = await this.followerRepository.hasDonatedToCreator(followerId, post.creatorId);
            if (!hasSupported) {
                throw new BusinessRuleError('Acceso bloqueado: Debes apoyar económicamente a este creador con al menos un flan para comentar.');
            }
        }

        const commentEntity = new Comment({
            postId,
            followerId,
            content
        });

        return await this.commentRepository.save(commentEntity);
    }
}
