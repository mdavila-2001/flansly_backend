export class UpdateSupportGoal {
    constructor(goalRepository) {
        this.goalRepository = goalRepository;
    }

    async execute(creatorId, title, description) {
        return await this.goalRepository.upsert(creatorId, title, description);
    }
}
