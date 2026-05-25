import { UserRepository } from './repositories/user.repository.js';
import { PostRepository } from './repositories/post.repository.js';
import { GoalRepository } from './repositories/goal.repository.js';
import { FollowerRepository } from './repositories/follower.repository.js';
import { CommentRepository } from './repositories/comment.repository.js';
import { BcryptService } from './security/bcrypt.service.js';
import { JwtService } from './security/jwt.service.js';

import { RegisterUser } from '../application/use_cases/auth/register_user.js';
import { LoginUser } from '../application/use_cases/auth/login_user.js';
import { GetLoggedUser } from '../application/use_cases/auth/get_logged_user.js';
import { CreatePost } from '../application/use_cases/creator/create_post.js';
import { GetCreatorPosts } from '../application/use_cases/creator/get_creator_posts.js';
import { UpdateCreatorProfile } from '../application/use_cases/creator/update_creator_profile.js';
import { UpdateSupportGoal } from '../application/use_cases/creator/update_support_goal.js';
import { GetSupportGoal } from '../application/use_cases/creator/get_support_goal.js';
import { GetCreatorReports } from '../application/use_cases/creator/get_creator_reports.js';

import { DonateFlans } from '../application/use_cases/follower/donate_flans.js';
import { GetFollowerFeed } from '../application/use_cases/follower/get_follower_feed.js';
import { CreateFollowerComment } from '../application/use_cases/follower/create_follower_comment.js';
import { ToggleFavoriteCreator } from '../application/use_cases/follower/toggle_favorite_creator.js';
import { GetAllCreators } from '../application/use_cases/follower/get_all_creators.js';
import { GetCreatorProfile } from '../application/use_cases/follower/get_creator_profile.js';
import { GetFollowerHistory } from '../application/use_cases/follower/get_follower_history.js';

const userRepository = new UserRepository();
const postRepository = new PostRepository();
const goalRepository = new GoalRepository();
const followerRepository = new FollowerRepository();
const commentRepository = new CommentRepository();
const hashService = new BcryptService();
const tokenService = new JwtService();

export const useCases = Object.freeze({
    registerUser: new RegisterUser(userRepository, hashService),
    loginUser: new LoginUser(userRepository, hashService, tokenService),
    getLoggedUser: new GetLoggedUser(userRepository),
    createPost: new CreatePost(postRepository),
    getCreatorPosts: new GetCreatorPosts(postRepository),
    updateCreatorProfile: new UpdateCreatorProfile(userRepository),
    updateSupportGoal: new UpdateSupportGoal(goalRepository),
    getSupportGoal: new GetSupportGoal(goalRepository, followerRepository),
    getCreatorReports: new GetCreatorReports(followerRepository),

    donateFlans: new DonateFlans(followerRepository, userRepository),
    getFollowerFeed: new GetFollowerFeed(followerRepository),
    createFollowerComment: new CreateFollowerComment(followerRepository, postRepository, commentRepository),
    toggleFavoriteCreator: new ToggleFavoriteCreator(followerRepository, userRepository),
    getAllCreators: new GetAllCreators(followerRepository),
    getCreatorProfile: new GetCreatorProfile(followerRepository),
    getFollowerHistory: new GetFollowerHistory(followerRepository),
});

export { tokenService };
