import { Post } from '../../../domain/entities/post.js';

export class CreatePost {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }

    async execute(creatorId, contentText, imageUrl) {
        const postEntity = new Post({
            creatorId,
            contentText: contentText || null,
            imageUrl: imageUrl || null
        });

        return await this.postRepository.save(postEntity);
    }
}
