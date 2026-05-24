import { Favorite } from '../../../domain/entities/favorite.js';
import { BusinessRuleError } from '../../../domain/errors/business_rule.error.js';
import { NotFoundError } from '../../errors/not_found.error.js';

export class ToggleFavoriteCreator {
    constructor(followerRepository, userRepository) {
        this.followerRepository = followerRepository;
        this.userRepository = userRepository;
    }

    async execute(followerId, creatorId) {
        if (followerId === creatorId) {
            throw new BusinessRuleError('Un creador no puede agregarse a sí mismo a favoritos.');
        }

        // 1. Verificar existencia del creador
        const creator = await this.userRepository.findById(creatorId);
        if (!creator) {
            throw new NotFoundError('El creador especificado no existe.');
        }

        if (!creator.isCreator()) {
            throw new BusinessRuleError('Solo se pueden agregar creadores a favoritos.');
        }

        // 2. Comprobar si ya está en favoritos
        const alreadyFavorite = await this.followerRepository.isFavorite(followerId, creatorId);

        if (alreadyFavorite) {
            // Remueve
            await this.followerRepository.deleteFavorite(followerId, creatorId);
            return { isFavorite: false };
        } else {
            // Agrega
            const favoriteEntity = new Favorite({ followerId, creatorId });
            await this.followerRepository.saveFavorite(favoriteEntity);
            return { isFavorite: true };
        }
    }
}
