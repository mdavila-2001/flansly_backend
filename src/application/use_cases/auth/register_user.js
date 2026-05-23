import { User } from '../../../domain/entities/user.js';
import { BusinessRuleError } from '../../../domain/errors/business_rule.error.js';

export class RegisterUser {
    constructor(userRepository, hashService) {
        this.userRepository = userRepository;
        this.hashService = hashService;
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

        const hashedPassword = await this.hashService.hash(data.password);

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
