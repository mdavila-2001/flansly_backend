// src/infrastructure/security/jwt.service.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class JwtService {
    static #secret = process.env.JWT_SECRET;

    static generateToken(payload, expiresIn = '24h') {
        if (!this.#secret) {
            throw new Error('CRITICAL ERROR: JWT_SECRET no está definido en el entorno.');
        }

        return jwt.sign(payload, this.#secret, { expiresIn });
    }

    static verifyToken(token) {
        try {
            return jwt.verify(token, this.#secret);
        } catch (error) {
            console.error(`🔒 [Seguridad JWT] Fallo de verificación: ${error.message}`);
            throw new Error('Token de acceso inválido o expirado.', {cause: error});
        }
    }
}