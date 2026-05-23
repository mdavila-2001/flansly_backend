export { sequelize } from '../db.js';
import { UserModel } from './user.model.js';
import { PostModel } from './post.model.js';
import { SupportGoalModel } from './support_goal.model.js';
import { CommentModel } from './comment.model.js';

const models = {
    UserModel,
    PostModel,
    SupportGoalModel,
    CommentModel
};

Object.values(models).forEach((model) => {
    if (typeof model.associate === 'function') {
        model.associate(models);
    }
});

export {
    UserModel,
    PostModel,
    SupportGoalModel,
    CommentModel
};