import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js';

export class FavoriteModel extends Model {
    static associate(models) {
        this.belongsTo(models.UserModel, {
            foreignKey: 'followerId',
            as: 'follower'
        });
        this.belongsTo(models.UserModel, {
            foreignKey: 'creatorId',
            as: 'creator'
        });
    }
}

FavoriteModel.init({
    followerId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    creatorId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    }
}, {
    sequelize,
    modelName: 'Favorite',
    tableName: 'favorites',
    updatedAt: false
});

FavoriteModel.removeAttribute('id');
