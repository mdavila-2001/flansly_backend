import { AppError } from '../../domain/errors/app.error.js';

export class NotFoundError extends AppError {
    constructor(message) {
        super(message, 404);
    }
}
