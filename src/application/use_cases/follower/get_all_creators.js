export class GetAllCreators {
    constructor(followerRepository) {
        this.followerRepository = followerRepository;
    }

    async execute(followerId) {
        return await this.followerRepository.getAllCreators(followerId);
    }
}
