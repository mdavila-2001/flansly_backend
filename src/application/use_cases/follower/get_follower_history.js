export class GetFollowerHistory {
    constructor(followerRepository) {
        this.followerRepository = followerRepository;
    }

    async execute(followerId, filters = {}) {
        return await this.followerRepository.getDonationsByFollowerAndFilters(
            followerId,
            filters.startDate,
            filters.endDate,
            filters.creatorName
        );
    }
}
