import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { TokenServicePort } from '../../application/ports/token.service.port.js';

dotenv.config();

export class JwtService extends TokenServicePort {
    #secret = process.env.JWT_SECRET;

    generateToken(payload, expiresIn = '24h') {
        if (!this.#secret) {
            throw new Error('CRITICAL ERROR: JWT_SECRET no está definido en el entorno.');
        }

        return jwt.sign(payload, this.#secret, { expiresIn });
    }

    verifyToken(token) {
        if (!this.#secret) {
            throw new Error('CRITICAL ERROR: JWT_SECRET no está definido en el entorno.');
        }

        try {
            return jwt.verify(token, this.#secret);
        } catch (error) {
            console.error(`🔒 [Seguridad JWT] Fallo de verificación: ${error.message}`);
            throw new Error('Token de acceso inválido o expirado.', {cause: error});
        }
    }
}