import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js';

export class UserModel extends Model {
    static associate(models) {
        this.hasMany(models.PostModel, {
            foreignKey: 'creatorId',
            as: 'posts'
        });
    }
}

UserModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(150),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    displayName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('creator', 'follower'),
        allowNull: false
    },
    profileImageUrl: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    bannerImageUrl: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
});