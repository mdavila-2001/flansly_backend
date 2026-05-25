export class GetSupportGoal {
    constructor(goalRepository, followerRepository) {
        this.goalRepository = goalRepository;
        this.followerRepository = followerRepository;
    }

    async execute(creatorId) {
        const goal = await this.goalRepository.findByCreatorId(creatorId);
        if (!goal) return null;

        const currentFlans = await this.followerRepository.getCurrentFlans(creatorId);
        return {
            ...goal,
            currentFlans
        };
    }
}
