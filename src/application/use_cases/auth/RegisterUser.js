import { User } from '../../../domain/entities/user.js';
import { BcryptService } from '../../../infrastructure/security/bcrypt.service.js';
import { BusinessRuleError } from '../../../domain/errors/BusinessRuleError.js';

export class RegisterUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(data) {
        const existingByEmail = await this.userRepository.findByEmail(data.email);
        if (existingByEmail) {
            throw new BusinessRuleError('El nombre de usuario o correo electrónico ya se encuentra registrado');
        }

        const existingByUsername = await this.userRepository.findByUsername(data.username);
        if (existingByUsername) {
            throw new BusinessRuleError('El nombre de usuario o correo electrónico ya se encuentra registrado');
        }

        const hashedPassword = await BcryptService.hashPassword(data.password);

        const userEntity = new User({
            username: data.username,
            email: data.email,
            password: hashedPassword,
            displayName: data.displayName,
            role: data.role
        });

        const savedUser = await this.userRepository.save(userEntity);

        return savedUser;
    }
}
