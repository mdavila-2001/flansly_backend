import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js';

export class DonationModel extends Model {
    static associate(models) {
        this.belongsTo(models.UserModel, {
            foreignKey: 'followerId',
            as: 'follower'
        });
        this.belongsTo(models.UserModel, {
            foreignKey: 'creatorId',
            as: 'creator'
        });
        this.belongsTo(models.SupportTypeModel, {
            foreignKey: 'supportTypeId',
            as: 'supportType'
        });
    }
}

DonationModel.init({
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
    },
    supportTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Donation',
    tableName: 'donations',
    updatedAt: false
});
