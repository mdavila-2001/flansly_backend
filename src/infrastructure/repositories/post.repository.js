import { PostModel, CommentModel } from '../database/models/index.js';
import { Post } from '../../domain/entities/post.js';
import { PostRepositoryPort } from '../../application/ports/post.repository.port.js';

export class PostRepository extends PostRepositoryPort {
    async save(postEntity) {
        const created = await PostModel.create({
            creatorId: postEntity.creatorId,
            contentText: postEntity.contentText,
            imageUrl: postEntity.imageUrl
        });

        return new Post(created.toJSON());
    }

    async findByCreatorIdWithComments(creatorId) {
        const records = await PostModel.findAll({
            where: { creatorId },
            include: [{
                model: CommentModel,
                as: 'comments'
            }],
            order: [['createdAt', 'DESC']]
        });

        return records.map((record) => {
            const raw = record.toJSON();
            return new Post({
                id: raw.id,
                creatorId: raw.creatorId,
                contentText: raw.contentText,
                imageUrl: raw.imageUrl,
                comments: raw.comments || [],
                createdAt: raw.createdAt
            });
        });
    }

    async findById(id) {
        const record = await PostModel.findByPk(id);
        if (!record) return null;
        return new Post(record.toJSON());
    }
}
