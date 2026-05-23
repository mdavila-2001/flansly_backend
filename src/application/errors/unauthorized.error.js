import { AppError } from '../../domain/errors/app.error.js';

export class UnauthorizedError extends AppError {
    constructor(message) {
        super(message, 401);
    }
}
