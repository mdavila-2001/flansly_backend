import { BusinessRuleError } from '../errors/business_rule.error.js';

export class Comment {
    constructor({ 
        id, 
        postId, 
        followerId, 
        content, 
        createdAt 
    }) {
        this.id = id;
        this.postId = postId;
        this.followerId = followerId;
        this.content = content;
        this.createdAt = createdAt || new Date();

        this.validate();
    }

    validate() {
        if (!this.postId) {
            throw new BusinessRuleError('El comentario debe estar vinculado a una publicación.');
        }

        if (!this.followerId) {
            throw new BusinessRuleError('Se requiere la identificación del seguidor que comenta.');
        }

        if (!this.content || this.content.trim().length === 0) {
            throw new BusinessRuleError('El contenido del comentario no puede estar vacío.');
        }

        if (this.content.length > 500) {
            throw new BusinessRuleError('El comentario no puede exceder los 500 caracteres.');
        }
    }
}