import { useCases } from '../../../infrastructure/container.js';

export class CreatorController {
    static async updateProfile(req, res, next) {
        try {
            let profileImageUrl = null;
            let bannerImageUrl = null;

            if (req.files) {
                if (req.files.avatar?.[0]) {
                    profileImageUrl = `/uploads/${req.files.avatar[0].filename}`;
                }
                if (req.files.banner?.[0]) {
                    bannerImageUrl = `/uploads/${req.files.banner[0].filename}`;
                }
            }

            const user = await useCases.updateCreatorProfile.execute(req.user.id, {
                displayName: req.body.displayName,
                profileImageUrl,
                bannerImageUrl
            });

            return res.status(200).json({
                id: user.id,
                username: user.username,
                displayName: user.displayName,
                profileImageUrl: user.profileImageUrl,
                bannerImageUrl: user.bannerImageUrl
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateGoal(req, res, next) {
        try {
            const result = await useCases.updateSupportGoal.execute(req.user.id, req.body.title, req.body.description);

            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}
