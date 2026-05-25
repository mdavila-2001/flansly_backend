import { Op } from 'sequelize';
import { sequelize, SupportTypeModel, DonationModel, FollowModel, FavoriteModel, PostModel, UserModel, CommentModel, SupportGoalModel } from '../database/models/index.js';
import { Donation } from '../../domain/entities/donation.js';
import { Follow } from '../../domain/entities/follow.js';
import { Favorite } from '../../domain/entities/favorite.js';
import { Post } from '../../domain/entities/post.js';
import { FollowerRepositoryPort } from '../../application/ports/follower.repository.port.js';

export class FollowerRepository extends FollowerRepositoryPort {
    async findSupportTypePriceById(id) {
        if (id === 1) {
            const [supportType] = await SupportTypeModel.findOrCreate({
                where: { id: 1 },
                defaults: {
                    name: 'flan',
                    price: 10
                }
            });
            return Number(supportType.price);
        }

        const supportType = await SupportTypeModel.findByPk(id);
        if (!supportType) return null;
        return Number(supportType.price);
    }

    async saveDonation(donationEntity) {
        const created = await DonationModel.create({
            followerId: donationEntity.followerId,
            creatorId: donationEntity.creatorId,
            supportTypeId: donationEntity.supportTypeId,
            quantity: donationEntity.quantity,
            totalAmount: donationEntity.totalAmount
        });

        return new Donation({
            id: created.id,
            followerId: created.followerId,
            creatorId: created.creatorId,
            supportTypeId: created.supportTypeId,
            quantity: created.quantity,
            totalAmount: Number(created.totalAmount),
            createdAt: created.createdAt
        });
    }

    async hasDonatedToCreator(followerId, creatorId) {
        const donation = await DonationModel.findOne({
            where: { followerId, creatorId }
        });
        return donation !== null;
    }

    async isFollowing(followerId, creatorId) {
        const follow = await FollowModel.findOne({
            where: { followerId, creatorId }
        });
        return follow !== null;
    }

    async saveFollow(followEntity) {
        const created = await FollowModel.create({
            followerId: followEntity.followerId,
            creatorId: followEntity.creatorId
        });

        return new Follow({
            id: created.id,
            followerId: created.followerId,
            creatorId: created.creatorId,
            createdAt: created.createdAt
        });
    }

    async isFavorite(followerId, creatorId) {
        const favorite = await FavoriteModel.findOne({
            where: { followerId, creatorId }
        });
        return favorite !== null;
    }

    async saveFavorite(favoriteEntity) {
        const created = await FavoriteModel.create({
            followerId: favoriteEntity.followerId,
            creatorId: favoriteEntity.creatorId
        });

        return new Favorite({
            id: created.id,
            followerId: created.followerId,
            creatorId: created.creatorId,
            createdAt: created.createdAt
        });
    }

    async deleteFavorite(followerId, creatorId) {
        await FavoriteModel.destroy({
            where: { followerId, creatorId }
        });
    }

    async getDonatedCreatorsPosts(followerId) {
        // 1. Obtener los IDs de creadores a los que se ha donado
        const donations = await DonationModel.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('creator_id')), 'creatorId']],
            where: { followerId }
        });

        const creatorIds = donations.map(d => d.get('creatorId')).filter(Boolean);
        if (creatorIds.length === 0) return [];

        // 2. Traer posts de esos creadores
        const records = await PostModel.findAll({
            where: { creatorId: creatorIds },
            include: [
                {
                    model: UserModel,
                    as: 'creator',
                    attributes: ['id', 'username', 'displayName', 'profileImageUrl']
                },
                {
                    model: CommentModel,
                    as: 'comments',
                    include: [
                        {
                            model: UserModel,
                            as: 'follower',
                            attributes: ['id', 'username', 'displayName']
                        }
                    ]
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        return records.map((record) => {
            const raw = record.toJSON();
            const postEntity = new Post({
                id: raw.id,
                creatorId: raw.creatorId,
                contentText: raw.contentText,
                imageUrl: raw.imageUrl,
                comments: raw.comments || [],
                createdAt: raw.createdAt,
                updatedAt: raw.updatedAt
            });
            // Adjuntar el creador para facilitar el despliegue en la interfaz HTTP
            postEntity.creator = raw.creator;
            return postEntity;
        });
    }

    async getDonationsByCreatorAndDates(creatorId, startDate, endDate) {
        console.log("--- AUDITORIA DE REPORTE INICIADA ---");
        console.log("ID del Creador consultado:", creatorId);
        console.log("Filtros de fecha crudos recibidos - Inicio:", startDate, " | Fin:", endDate);

        const where = { creatorId };

        if ((startDate && startDate.trim() !== "") || (endDate && endDate.trim() !== "")) {
            where.createdAt = {};
            if (startDate && startDate.trim() !== "") {
                const start = new Date(startDate);
                if (!Number.isNaN(start.getTime())) {
                    where.createdAt[Op.gte] = start;
                }
            }
            if (endDate && endDate.trim() !== "") {
                const end = new Date(endDate);
                if (!Number.isNaN(end.getTime())) {
                    end.setHours(23, 59, 59, 999);
                    where.createdAt[Op.lte] = end;
                }
            }
        }

        const records = await DonationModel.findAll({
            where,
            include: [
                {
                    model: UserModel,
                    as: 'follower',
                    attributes: ['id', 'username', 'displayName']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        console.log("Cantidad de registros encontrados en base de datos:", records.length);
        console.log("--- FIN DE CONSULTA DE REPORTE ---");

        return records.map((record) => {
            const raw = record.toJSON();
            return new Donation({
                id: raw.id,
                followerId: raw.followerId,
                creatorId: raw.creatorId,
                supportTypeId: raw.supportTypeId,
                quantity: raw.quantity,
                totalAmount: Number(raw.totalAmount),
                follower: raw.follower,
                createdAt: raw.createdAt
            });
        });
    }

    async getAllCreators(followerId) {
        const creators = await UserModel.findAll({
            where: { role: 'creator' },
            attributes: ['id', 'username', 'displayName', 'profileImageUrl', 'bannerImageUrl']
        });

        const favorites = await FavoriteModel.findAll({
            where: { followerId }
        });
        const favoriteCreatorIds = new Set(favorites.map(f => f.creatorId));

        return creators.map(c => {
            const raw = c.toJSON();
            return {
                ...raw,
                isFavorite: favoriteCreatorIds.has(raw.id)
            };
        });
    }

    async getCurrentFlans(creatorId) {
        return await DonationModel.sum('quantity', {
            where: {
                creatorId,
                supportTypeId: 1
            }
        }) || 0;
    }

    async getCreatorProfile(followerId, creatorId) {
        const creatorRecord = await UserModel.findOne({
            where: { id: creatorId, role: 'creator' },
            attributes: ['id', 'username', 'displayName', 'profileImageUrl', 'bannerImageUrl']
        });
        if (!creatorRecord) return null;

        const creator = creatorRecord.toJSON();

        // Verificar si es favorito
        const favorite = await FavoriteModel.findOne({
            where: { followerId, creatorId }
        });
        creator.isFavorite = favorite !== null;

        const goalRecord = await SupportGoalModel.findOne({
            where: { creatorId }
        });
        const supportGoal = goalRecord ? goalRecord.toJSON() : null;
        if (supportGoal) {
            supportGoal.currentFlans = await this.getCurrentFlans(creatorId);
        }

        const donation = await DonationModel.findOne({
            where: { followerId, creatorId }
        });
        const hasDonated = donation !== null;

        // Publicaciones con comentarios
        const postRecords = await PostModel.findAll({
            where: { creatorId },
            include: [
                {
                    model: UserModel,
                    as: 'creator',
                    attributes: ['id', 'username', 'displayName', 'profileImageUrl']
                },
                {
                    model: CommentModel,
                    as: 'comments',
                    include: [
                        {
                            model: UserModel,
                            as: 'follower',
                            attributes: ['id', 'username', 'displayName']
                        }
                    ]
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        const posts = postRecords.map(p => p.toJSON());

        return {
            creator,
            supportGoal,
            hasDonated,
            posts
        };
    }
}
