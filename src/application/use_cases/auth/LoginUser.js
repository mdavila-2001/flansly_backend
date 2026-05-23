import { BcryptService } from '../../../infrastructure/security/bcrypt.service.js';
import { JwtService } from '../../../infrastructure/security/jwt.service.js';
import { UnauthorizedError } from '../../errors/UnauthorizedError.js';

export class LoginUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({ identity, password }) {
        let user = await this.userRepository.findByEmail(identity);
        if (!user) {
            user = await this.userRepository.findByUsername(identity);
        }

        if (!user) {
            throw new UnauthorizedError('Credenciales de acceso incorrectas');
        }

        const passwordMatch = await BcryptService.comparePassword(password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedError('Credenciales de acceso incorrectas');
        }

        const token = JwtService.generateToken({
            id: user.id,
            username: user.username,
            role: user.role
        });

        return {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                displayName: user.displayName,
                role: user.role
            },
            token
        };
    }
}
