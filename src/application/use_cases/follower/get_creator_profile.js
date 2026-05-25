import { NotFoundError } from '../../errors/not_found.error.js';

export class GetCreatorProfile {
    constructor(followerRepository) {
        this.followerRepository = followerRepository;
    }

    async execute(followerId, creatorId) {
        const profile = await this.followerRepository.getCreatorProfile(followerId, creatorId);
        if (!profile) {
            throw new NotFoundError('El creador solicitado no se encuentra registrado');
        }
        return profile;
    }
}
