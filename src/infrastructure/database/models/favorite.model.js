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
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    followerId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    creatorId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Favorite',
    tableName: 'favorites',
    updatedAt: false
});
