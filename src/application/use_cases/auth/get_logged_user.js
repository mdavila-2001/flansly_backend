import { NotFoundError } from '../../errors/not_found.error.js';

export class GetLoggedUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError('Usuario no encontrado');
        }
        return user;
    }
}
