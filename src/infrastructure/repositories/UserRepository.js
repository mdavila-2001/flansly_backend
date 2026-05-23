import { UserModel } from '../database/models/index.js';
import { User } from '../../domain/entities/user.js';

export class UserRepository {
    async findByEmail(email) {
        const record = await UserModel.findOne({ where: { email } });
        if (!record) return null;
        return new User(record.toJSON());
    }

    async findByUsername(username) {
        const record = await UserModel.findOne({ where: { username } });
        if (!record) return null;
        return new User(record.toJSON());
    }

    async save(userEntity) {
        const created = await UserModel.create({
            username: userEntity.username,
            email: userEntity.email,
            password: userEntity.password,
            displayName: userEntity.displayName,
            role: userEntity.role,
            profileImageUrl: userEntity.profileImageUrl,
            bannerImageUrl: userEntity.bannerImageUrl
        });

        return new User(created.toJSON());
    }

    async findById(id) {
        const record = await UserModel.findByPk(id);
        if (!record) return null;
        return new User(record.toJSON());
    }

    async update(userEntity) {
        await UserModel.update({
            displayName: userEntity.displayName,
            profileImageUrl: userEntity.profileImageUrl,
            bannerImageUrl: userEntity.bannerImageUrl
        }, { where: { id: userEntity.id } });

        return userEntity;
    }
}
