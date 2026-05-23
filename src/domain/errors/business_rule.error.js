import { AppError } from './app.error.js';

export class BusinessRuleError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}