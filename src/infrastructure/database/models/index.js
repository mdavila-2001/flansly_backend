export { sequelize } from '../db.js';
import { UserModel } from './user.model.js';
import { PostModel } from './post.model.js';

UserModel.hasMany(PostModel, {
    foreignKey: 'creatorId',
    as: 'posts',
    onDelete: 'CASCADE'
});

PostModel.belongsTo(UserModel, {
    foreignKey: 'creatorId',
    as: 'creator'
});

export {
    UserModel,
    PostModel
};