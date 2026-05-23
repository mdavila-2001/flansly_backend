export class HashServicePort {
    async hash(plainText) {
        throw new Error('Not implemented');
    }

    async compare(plainText, hashed) {
        throw new Error('Not implemented');
    }
}
