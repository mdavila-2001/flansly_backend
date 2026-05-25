import { useCases } from '../../../infrastructure/container.js';

export class AuthController {
    static async register(req, res, next) {
        try {
            let profileImageUrl = null;
            let bannerImageUrl = null;

            if (req.files) {
                if (req.files.avatar?.[0]) {
                    profileImageUrl = `/uploads/avatar/${req.files.avatar[0].filename}`;
                }
                if (req.files.banner?.[0]) {
                    bannerImageUrl = `/uploads/banner/${req.files.banner[0].filename}`;
                }
            }

            const user = await useCases.registerUser.execute({
                ...req.body,
                profileImageUrl,
                bannerImageUrl
            });

            return res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email,
                displayName: user.displayName,
                role: user.role,
                profileImageUrl: user.profileImageUrl,
                bannerImageUrl: user.bannerImageUrl
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

    static async me(req, res, next) {
        try {
            const user = await useCases.getLoggedUser.execute(req.user.id);

            return res.status(200).json({
                id: user.id,
                username: user.username,
                email: user.email,
                displayName: user.displayName,
                role: user.role,
                profileImageUrl: user.profileImageUrl,
                bannerImageUrl: user.bannerImageUrl
            });
        } catch (error) {
            next(error);
        }
    }
}
