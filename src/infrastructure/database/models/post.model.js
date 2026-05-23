import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js';

export class PostModel extends Model {
    static associate(models) {
        this.belongsTo(models.UserModel, {
            foreignKey: 'creatorId',
            as: 'creator'
        });
        this.hasMany(models.CommentModel, {
            foreignKey: 'postId',
            as: 'comments'
        });
    }
}

PostModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    creatorId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    contentText: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    imageUrl: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Post',
    tableName: 'posts'
});