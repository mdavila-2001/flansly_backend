export class GetCreatorPosts {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }

    async execute(creatorId) {
        return await this.postRepository.findByCreatorIdWithComments(creatorId);
    }
}
