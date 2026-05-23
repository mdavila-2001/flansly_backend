import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js';

export class CommentModel extends Model {
    static associate(models) {
        this.belongsTo(models.PostModel, {
            foreignKey: 'postId',
            as: 'post'
        });
        
        this.belongsTo(models.UserModel, {
            foreignKey: 'followerId',
            as: 'follower'
        });
    }
}

CommentModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    postId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    followerId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    updatedAt: false
});