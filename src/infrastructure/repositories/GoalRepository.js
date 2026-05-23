import { SupportGoalModel } from '../database/models/index.js';

export class GoalRepository {
    async saveGoal(creatorId, title, description) {
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
