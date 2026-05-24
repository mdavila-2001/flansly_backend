export class GetFollowerFeed {
    constructor(followerRepository) {
        this.followerRepository = followerRepository;
    }

    async execute(followerId) {
        return await this.followerRepository.getDonatedCreatorsPosts(followerId);
    }
}
