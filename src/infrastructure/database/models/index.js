export { sequelize } from '../db.js';
import { UserModel } from './user.model.js';
import { PostModel } from './post.model.js';
import { SupportGoalModel } from './support_goal.model.js';
import { CommentModel } from './comment.model.js';
import { SupportTypeModel } from './support_type.model.js';
import { DonationModel } from './donation.model.js';
import { FollowModel } from './follow.model.js';
import { FavoriteModel } from './favorite.model.js';

const models = {
    UserModel,
    PostModel,
    SupportGoalModel,
    CommentModel,
    SupportTypeModel,
    DonationModel,
    FollowModel,
    FavoriteModel
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
    CommentModel,
    SupportTypeModel,
    DonationModel,
    FollowModel,
    FavoriteModel
};