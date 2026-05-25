import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js';

export class FollowModel extends Model {
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

FollowModel.init({
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
    modelName: 'Follow',
    tableName: 'follows',
    updatedAt: false
});

FollowModel.removeAttribute('id');
