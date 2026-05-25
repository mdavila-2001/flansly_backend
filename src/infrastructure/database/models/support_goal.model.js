import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js';

export class SupportGoalModel extends Model {
    static associate(models) {
        this.belongsTo(models.UserModel, {
            foreignKey: 'creatorId',
            as: 'creator'
        });
    }
}

SupportGoalModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    creatorId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    targetFlans: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 50
    }
}, {
    sequelize,
    modelName: 'SupportGoal',
    tableName: 'support_goals'
});