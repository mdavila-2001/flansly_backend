import { SupportGoalModel } from '../database/models/index.js';
import { GoalRepositoryPort } from '../../application/ports/goal.repository.port.js';

export class GoalRepository extends GoalRepositoryPort {
    async findByCreatorId(creatorId) {
        const existing = await SupportGoalModel.findOne({ where: { creatorId } });
        return existing ? existing.toJSON() : null;
    }

    async upsert(creatorId, title, description, targetFlans) {
        const existing = await SupportGoalModel.findOne({ where: { creatorId } });

        if (existing) {
            existing.title = title;
            existing.description = description;
            existing.targetFlans = targetFlans;
            await existing.save();
            return existing.toJSON();
        }

        const created = await SupportGoalModel.create({
            creatorId,
            title,
            description,
            targetFlans
        });

        return created.toJSON();
    }
}
