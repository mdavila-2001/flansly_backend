import { Comment } from '../../../domain/entities/comment.js';
import { BusinessRuleError } from '../../../domain/errors/business_rule.error.js';
import { NotFoundError } from '../../errors/not_found.error.js';

export class CreateFollowerComment {
    constructor(followerRepository, postRepository, commentRepository) {
        this.followerRepository = followerRepository;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }

    async execute(followerId, postId, content) {
        // 1. Validar existencia de la publicación
        const post = await this.postRepository.findById(postId);
        if (!post) {
            throw new NotFoundError('La publicación no fue encontrada.');
        }

        // 2. Un creador no puede comentar en sus propias publicaciones con paywall (o sí, pero la regla dice "follower has ever supported creator". Si es el dueño, se salta la validación o se lanza error. Wait, a creator commenting on their own posts is fine, but since this is "Módulo Seguidor", it's followers).
        // Si el follower es el mismo creador del post, ¿puede comentar? "El Caso de Uso debe verificar de antemano si el seguidor ya apoyó a ese creador; si no hay donaciones previas, se bloquea la acción disparando un BusinessRuleError."
        // A follower cannot be the creator of the post anyway under standard paywall rules (and they can't self-donate). So they definitely have to have donated if they are a follower.
        if (post.creatorId === followerId) {
            // El creador dueño de la publicación puede comentar en su propio post sin paywall
            // Pero como esta acción es de Seguidor, si entra aquí es porque es seguidor.
            // Para ser robustos, si es el dueño puede comentar, de lo contrario validamos donaciones.
        }

        if (post.creatorId !== followerId) {
            const hasSupported = await this.followerRepository.hasDonatedToCreator(followerId, post.creatorId);
            if (!hasSupported) {
                throw new BusinessRuleError('Acceso bloqueado: Debes apoyar económicamente a este creador con al menos un flan para comentar.');
            }
        }

        // 3. Crear y validar entidad de dominio Comment
        const commentEntity = new Comment({
            postId,
            followerId,
            content
        });

        // 4. Guardar comentario privado
        return await this.commentRepository.save(commentEntity);
    }
}
