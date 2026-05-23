export class GetCreatorReports {
    constructor(followerRepository) {
        this.followerRepository = followerRepository;
    }

    async execute(creatorId, startDate, endDate) {
        const donations = await this.followerRepository.getDonationsByCreatorAndDates(creatorId, startDate, endDate);
        
        const totalFlans = donations.reduce((sum, current) => sum + current.quantity, 0);
        const totalAmountBs = donations.reduce((sum, current) => sum + Number(current.totalAmount), 0);

        return {
            metrics: {
                totalFlans,
                totalAmountBs
            },
            transactions: donations.map(d => ({
                id: d.id,
                followerName: d.follower?.displayName || 'Seguidor Anónimo',
                quantity: d.quantity,
                totalAmount: d.totalAmount,
                createdAt: d.createdAt
            }))
        };
    }
}