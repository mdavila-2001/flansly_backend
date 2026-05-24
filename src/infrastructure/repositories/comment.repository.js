import { CommentModel } from '../database/models/index.js';
import { Comment } from '../../domain/entities/comment.js';
import { CommentRepositoryPort } from '../../application/ports/comment.repository.port.js';

export class CommentRepository extends CommentRepositoryPort {
    async save(commentEntity) {
        const created = await CommentModel.create({
            postId: commentEntity.postId,
            followerId: commentEntity.followerId,
            content: commentEntity.content
        });

        return new Comment({
            id: created.id,
            postId: created.postId,
            followerId: created.followerId,
            content: created.content,
            createdAt: created.createdAt
        });
    }
}
