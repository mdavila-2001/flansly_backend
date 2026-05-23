import { PostModel, CommentModel } from '../database/models/index.js';
import { Post } from '../../domain/entities/post.js';

export class PostRepository {
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
            const postEntity = new Post({
                id: raw.id,
                creatorId: raw.creatorId,
                contentText: raw.contentText,
                imageUrl: raw.imageUrl,
                createdAt: raw.createdAt
            });
            postEntity.comments = raw.comments || [];
            return postEntity;
        });
    }
}
