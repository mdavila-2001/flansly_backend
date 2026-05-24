import { BusinessRuleError } from '../errors/business_rule.error.js';

export class Follow {
    constructor({ id, followerId, creatorId, createdAt }) {
        this.id = id;
        this.followerId = followerId;
        this.creatorId = creatorId;
        this.createdAt = createdAt || new Date();

        this.validate();
    }

    validate() {
        if (!this.followerId || !this.creatorId) {
            throw new BusinessRuleError('El seguimiento requiere un seguidor y un creador.');
        }

        if (this.followerId === this.creatorId) {
            throw new BusinessRuleError('Un creador no puede seguirse a sí mismo.');
        }
    }
}
