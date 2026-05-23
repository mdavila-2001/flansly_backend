import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js';

export class SupportTypeModel extends Model {
    static associate(models) {
        this.hasMany(models.DonationModel, {
            foreignKey: 'supportTypeId',
            as: 'donations'
        });
    }
}

SupportTypeModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'SupportType',
    tableName: 'support_types',
    timestamps: false
});
