import { BusinessRuleError } from '../errors/BusinessRuleError.js';

export class Post {
    constructor({
        id,
        creatorId,
        contentText = null,
        imageUrl = null,
        createdAt,
        updatedAt,
        deletedAt
    }) {
        this.id = id;
        this.creatorId = creatorId;
        this.contentText = contentText;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
        this.deletedAt = deletedAt || null;

        this.validate();
    }

    validate() {
        if (!this.creatorId) {
            throw new BusinessRuleError('El post debe pertenecer obligatoriamente a un creador.');
        }

        // Regla de Negocio: Un post no puede estar vacío
        const hasText = this.contentText && this.contentText.trim().length > 0;
        const hasImage = this.imageUrl && this.imageUrl.trim().length > 0;

        if (!hasText && !hasImage) {
            throw new BusinessRuleError('El post debe contener al menos texto o una imagen.');
        }
    }

    updateContent(newText, newImageUrl) {
        if (newText !== undefined) this.contentText = newText;
        if (newImageUrl !== undefined) this.imageUrl = newImageUrl;
        this.updatedAt = new Date();
        this.validate();
    }

    isOwner(userId) {
        return this.creatorId === userId;
    }

    softDelete() {
        this.deletedAt = new Date();
    }
}