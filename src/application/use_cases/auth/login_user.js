import { UnauthorizedError } from '../../errors/unauthorized.error.js';

export class LoginUser {
    constructor(userRepository, hashService, tokenService) {
        this.userRepository = userRepository;
        this.hashService = hashService;
        this.tokenService = tokenService;
    }

    async execute({ identity, password }) {
        let user = await this.userRepository.findByEmail(identity);
        if (!user) {
            user = await this.userRepository.findByUsername(identity);
        }

        if (!user) {
            throw new UnauthorizedError('Credenciales de acceso incorrectas');
        }

        const passwordMatch = await this.hashService.compare(password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedError('Credenciales de acceso incorrectas');
        }

        const token = this.tokenService.generateToken({
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
