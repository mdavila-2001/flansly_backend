import { SupportGoalModel } from '../database/models/index.js';
import { GoalRepositoryPort } from '../../application/ports/goal.repository.port.js';

export class GoalRepository extends GoalRepositoryPort {
    async upsert(creatorId, title, description) {
        const existing = await SupportGoalModel.findOne({ where: { creatorId } });

        if (existing) {
            existing.title = title;
            existing.description = description;
            await existing.save();
            return existing.toJSON();
        }

        const created = await SupportGoalModel.create({
            creatorId,
            title,
            description
        });

        return created.toJSON();
    }
}
