import { BusinessRuleError } from "../errors/BusinessRuleError.js";

export class User {
    constructor({
        id,
        username,
        email,
        password,
        displayName,
        role,
        profileImageUrl = null,
        bannerImageUrl = null,
        createdAt,
        updatedAt,
        deletedAt
    }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.displayName = displayName;
        this.role = role;
        this.profileImageUrl = profileImageUrl;
        this.bannerImageUrl = bannerImageUrl;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
        this.deletedAt = deletedAt || null;

        this.validate();
    }

    validate() {
        if (!this.username || this.username.length < 3) {
            throw new BusinessRuleError('El nombre de usuario debe tener al menos 3 caracteres.');
        }

        if (!this.email || !this.email.includes('@')) {
            throw new BusinessRuleError('El formato del correo electrónico no es válido.');
        }

        if (!this.password) {
            throw new BusinessRuleError('La contraseña es obligatoria.');
        }

        if (!this.displayName) {
            throw new BusinessRuleError('El nombre público a mostrar es obligatorio.');
        }

        if (!['creator', 'follower'].includes(this.role)) {
            throw new BusinessRuleError('Rol inválido. Un usuario solo puede ser "creator" o "follower".');
        }
    }

    isCreator() {
        return this.role === 'creator';
    }

    isFollower() {
        return this.role === 'follower';
    }

    updateProfileImages(profileUrl, bannerUrl) {
        if (!this.isCreator()) {
            throw new BusinessRuleError('Solo los creadores pueden tener un perfil público con imágenes.');
        }
        if (profileUrl) this.profileImageUrl = profileUrl;
        if (bannerUrl) this.bannerImageUrl = bannerUrl;
        this.updatedAt = new Date();
    }

    softDelete() {
        this.deletedAt = new Date();
    }
}