import { useCases } from '../../../infrastructure/container.js';

export class AuthController {
    static async register(req, res, next) {
        try {
            const user = await useCases.registerUser.execute(req.body);

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
            const result = await useCases.loginUser.execute(req.body);

            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}
