import { RegisterUser } from '../../../application/use_cases/auth/RegisterUser.js';
import { LoginUser } from '../../../application/use_cases/auth/LoginUser.js';
import { UserRepository } from '../../../infrastructure/repositories/UserRepository.js';

export class AuthController {
    static async register(req, res, next) {
        try {
            const userRepository = new UserRepository();
            const registerUser = new RegisterUser(userRepository);
            const user = await registerUser.execute(req.body);

            return res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email,
                displayName: user.displayName,
                role: user.role
            });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const userRepository = new UserRepository();
            const loginUser = new LoginUser(userRepository);
            const result = await loginUser.execute(req.body);

            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}
