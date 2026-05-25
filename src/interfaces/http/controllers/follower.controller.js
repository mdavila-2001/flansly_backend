import { useCases } from '../../../infrastructure/container.js';

export class FollowerController {
    static async donate(req, res, next) {
        try {
            const { creatorId, quantity } = req.body;
            const donation = await useCases.donateFlans.execute(req.user.id, creatorId, quantity);

            return res.status(201).json(donation);
        } catch (error) {
            next(error);
        }
    }

    static async feed(req, res, next) {
        try {
            const posts = await useCases.getFollowerFeed.execute(req.user.id);

            return res.status(200).json(posts);
        } catch (error) {
            next(error);
        }
    }

    static async comment(req, res, next) {
        try {
            const comment = await useCases.createFollowerComment.execute(
                req.user.id,
                req.params.id,
                req.body.content
            );

            return res.status(201).json(comment);
        } catch (error) {
            next(error);
        }
    }

    static async toggleFavorite(req, res, next) {
        try {
            const result = await useCases.toggleFavoriteCreator.execute(req.user.id, req.params.id);

            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async getAllCreators(req, res, next) {
        try {
            const creators = await useCases.getAllCreators.execute(req.user.id);
            return res.status(200).json(creators);
        } catch (error) {
            next(error);
        }
    }

    static async getCreatorProfile(req, res, next) {
        try {
            const profile = await useCases.getCreatorProfile.execute(req.user.id, req.params.id);
            return res.status(200).json(profile);
        } catch (error) {
            next(error);
        }
    }
}
