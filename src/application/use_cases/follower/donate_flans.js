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

        // 1. Verificar existencia del creador
        const creator = await this.userRepository.findById(creatorId);
        if (!creator) {
            throw new NotFoundError('El creador especificado no existe.');
        }

        if (!creator.isCreator()) {
            throw new BusinessRuleError('Solo se pueden donar flanes a usuarios con el rol de creador.');
        }

        // 2. Obtener el precio del flan dinámicamente
        const price = await this.followerRepository.findSupportTypePriceById(1);
        if (!price) {
            throw new BusinessRuleError('El tipo de soporte "flan" no está configurado en el sistema.');
        }

        // 3. Crear y validar entidad de dominio Donation
        const donationEntity = Donation.createFlanDonation(followerId, creatorId, quantity, price);

        // 4. Guardar donación
        const savedDonation = await this.followerRepository.saveDonation(donationEntity);

        // 5. Activar seguimiento automático si no lo sigue ya
        const alreadyFollowing = await this.followerRepository.isFollowing(followerId, creatorId);
        if (!alreadyFollowing) {
            const followEntity = new Follow({ followerId, creatorId });
            await this.followerRepository.saveFollow(followEntity);
        }

        return savedDonation;
    }
}
