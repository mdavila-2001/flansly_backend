import { Donation } from '../../../domain/entities/donation.js';
import { Follow } from '../../../domain/entities/follow.js';
import { BusinessRuleError } from '../../../domain/errors/business_rule.error.js';
import { NotFoundError } from '../../errors/not_found.error.js';

export class DonateFlans {
    constructor(followerRepository, userRepository) {
        this.followerRepository = followerRepository;
        this.userRepository = userRepository;
    }

    async execute(followerId, creatorId, quantity) {
        if (followerId === creatorId) {
            throw new BusinessRuleError('Un creador no puede auto-donarse flanes.');
        }

        const creator = await this.userRepository.findById(creatorId);
        if (!creator) {
            throw new NotFoundError('El creador especificado no existe.');
        }

        if (!creator.isCreator()) {
            throw new BusinessRuleError('Solo se pueden donar flanes a usuarios con el rol de creador.');
        }

        const price = await this.followerRepository.findSupportTypePriceById(1);
        if (!price) {
            throw new BusinessRuleError('El tipo de soporte "flan" no está configurado en el sistema.');
        }

        const donationEntity = Donation.createFlanDonation(followerId, creatorId, quantity, price);

        const savedDonation = await this.followerRepository.saveDonation(donationEntity);

        const alreadyFollowing = await this.followerRepository.isFollowing(followerId, creatorId);
        if (!alreadyFollowing) {
            const followEntity = new Follow({ followerId, creatorId });
            await this.followerRepository.saveFollow(followEntity);
        }

        return savedDonation;
    }
}
