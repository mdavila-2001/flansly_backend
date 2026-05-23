import { NotFoundError } from '../../errors/NotFoundError.js';

export class UpdateCreatorProfile {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId, { displayName, profileImageUrl, bannerImageUrl }) {
        const userEntity = await this.userRepository.findById(userId);

        if (!userEntity) {
            throw new NotFoundError('El usuario no fue encontrado en el sistema.');
        }

        if (displayName) {
            userEntity.displayName = displayName;
        }

        userEntity.updateProfileImages(profileImageUrl, bannerImageUrl);

        await this.userRepository.update(userEntity);

        return userEntity;
    }
}
