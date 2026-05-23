import { BusinessRuleError } from "../errors/business_rule.error.js";
import { ROLES, ALL_ROLES } from "../constants/roles.js";

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
        deletedAt,
        skipPasswordValidation = false
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
        this.skipPasswordValidation = skipPasswordValidation;

        this.validate();
    }

    validate() {
        if (!this.username?.length < 3) {
            throw new BusinessRuleError('El nombre de usuario debe tener al menos 3 caracteres.');
        }

        if (!this.email?.includes('@')) {
            throw new BusinessRuleError('El formato del correo electrónico no es válido.');
        }

        if (!this.skipPasswordValidation && !this.password) {
            throw new BusinessRuleError('La contraseña es obligatoria.');
        }

        if (!this.displayName) {
            throw new BusinessRuleError('El nombre público a mostrar es obligatorio.');
        }

        if (!ALL_ROLES.includes(this.role)) {
            throw new BusinessRuleError(`Rol inválido. Un usuario solo puede ser: ${ALL_ROLES.join(', ')}.`);
        }
    }

    isCreator() {
        return this.role === ROLES.CREATOR;
    }

    isFollower() {
        return this.role === ROLES.FOLLOWER;
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