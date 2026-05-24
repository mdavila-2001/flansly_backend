import { AppError } from '../../../domain/errors/app.error.js';

export class ValidationError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}
