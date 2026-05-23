import bcrypt from 'bcrypt';
import { HashServicePort } from '../../application/ports/hash.service.port.js';

const SALT_ROUNDS = 10; 

export class BcryptService extends HashServicePort {
    async hash(plainPassword) {
        return await bcrypt.hash(plainPassword, SALT_ROUNDS);
    }

    async compare(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}