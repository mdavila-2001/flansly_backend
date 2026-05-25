export class GoalRepositoryPort {
    async findByCreatorId(creatorId) {
        throw new Error('Not implemented');
    }

    async upsert(creatorId, title, description, targetFlans) {
        throw new Error('Not implemented');
    }
}
