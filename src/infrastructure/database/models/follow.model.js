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
    modelName: 'Follow',
    tableName: 'follows',
    updatedAt: false
});
