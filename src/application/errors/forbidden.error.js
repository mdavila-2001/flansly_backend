import { AppError } from '../../domain/errors/app.error.js';

export class ForbiddenError extends AppError {
    constructor(message) {
        super(message, 403);
    }
}
