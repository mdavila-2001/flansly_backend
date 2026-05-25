export class GetCreatorReports {
    constructor(followerRepository) {
        this.followerRepository = followerRepository;
    }

    async execute(creatorId, startDate, endDate) {
        const donations = await this.followerRepository.getDonationsByCreatorAndDates(creatorId, startDate, endDate);
        
        const totalFlans = donations.reduce((sum, current) => sum + current.quantity, 0);
        const totalAmountBs = donations.reduce((sum, current) => sum + Number(current.totalAmount), 0);

        console.log("--- PROCESAMIENTO DE METRICAS EN CASO DE USO ---");
        console.log("Suma total de flanes calculada:", totalFlans);
        console.log("Suma total en Bolivianos calculada: Bs.", totalAmountBs);

        return {
            metrics: {
                totalFlans,
                totalAmountBs
            },
            transactions: donations.map(d => ({
                id: d.id,
                followerName: d.follower?.displayName || 'Seguidor Anonimo',
                quantity: d.quantity,
                totalAmount: d.totalAmount,
                createdAt: d.createdAt
            }))
        };
    }
}