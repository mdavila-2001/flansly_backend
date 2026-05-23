import { BusinessRuleError } from '../errors/business_rule.error.js';

export class Donation {
    constructor({ 
        id, 
        followerId, 
        creatorId, 
        supportTypeId = 1,
        quantity, 
        totalAmount, 
        createdAt 
    }) {
        this.id = id;
        this.followerId = followerId;
        this.creatorId = creatorId;
        this.supportTypeId = supportTypeId;
        this.quantity = quantity;
        this.totalAmount = totalAmount; 
        this.createdAt = createdAt || new Date();

        this.validate();
    }

    validate() {
        if (!this.followerId || !this.creatorId) {
            throw new BusinessRuleError('La donación requiere identificar tanto al seguidor como al creador.');
        }

        if (this.followerId === this.creatorId) {
            throw new BusinessRuleError('Un creador no puede auto-donarse flanes.');
        }

        if (this.quantity === undefined || this.quantity < 1) {
            throw new BusinessRuleError('Se debe donar al menos 1 flan.');
        }

        if (this.totalAmount === undefined || this.totalAmount <= 0) {
            throw new BusinessRuleError('El monto total de la donación debe ser mayor a cero.');
        }
    }

    static createFlanDonation(followerId, creatorId, quantity, pricePerUnit) {
        const total = quantity * pricePerUnit;
        
        return new Donation({
            followerId,
            creatorId,
            supportTypeId: 1, 
            quantity,
            totalAmount: total
        });
    }
}