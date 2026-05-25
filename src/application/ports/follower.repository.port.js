export class FollowerRepositoryPort {
    async findSupportTypePriceById(id) {
        throw new Error('Not implemented');
    }

    async saveDonation(donationEntity) {
        throw new Error('Not implemented');
    }

    async hasDonatedToCreator(followerId, creatorId) {
        throw new Error('Not implemented');
    }

    async isFollowing(followerId, creatorId) {
        throw new Error('Not implemented');
    }

    async saveFollow(followEntity) {
        throw new Error('Not implemented');
    }

    async isFavorite(followerId, creatorId) {
        throw new Error('Not implemented');
    }

    async saveFavorite(favoriteEntity) {
        throw new Error('Not implemented');
    }

    async deleteFavorite(followerId, creatorId) {
        throw new Error('Not implemented');
    }

    async getDonatedCreatorsPosts(followerId) {
        throw new Error('Not implemented');
    }

    async getDonationsByCreatorAndDates(creatorId, startDate, endDate) {
        throw new Error('Not implemented');
    }

    async getAllCreators(followerId) {
        throw new Error('Not implemented');
    }

    async getCreatorProfile(followerId, creatorId) {
        throw new Error('Not implemented');
    }
}
