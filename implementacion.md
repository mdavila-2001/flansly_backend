# Implementación - Fases 1, 2 y 3 de Flansly Backend

## Fase 1 — Infraestructura Transversal (DoD)

### Archivos creados:
- `src/application/errors/NotFoundError.js` — Error semántico 404
- `src/application/errors/UnauthorizedError.js` — Error semántico 401
- `src/application/errors/ForbiddenError.js` — Error semántico 403
- `src/interfaces/http/middleware/error_handler.js` — Middleware centralizado de errores (oculta errores de Sequelize con mensaje genérico)
- `src/interfaces/http/middleware/validate.js` — Factory `validateSchema(schema)` con Joi (`abortEarly: false`, `stripUnknown: true`)
- `src/interfaces/http/middleware/is_auth.js` — Guardián de autenticación Bearer JWT → inyecta `req.user`
- `src/interfaces/http/middleware/check_role.js` — Factory `checkRole(roles[])` de autorización por rol

### Archivos modificados:
- `src/interfaces/app.js` — Import y registro de `errorHandler` después de rutas
- `src/domain/entities/user.js` — Fix: extensión `.js` faltante en import de BusinessRuleError

---

## Fase 2 — US4: Autenticación de Usuarios

### Archivos creados:
- `src/infrastructure/repositories/UserRepository.js` — Métodos: `findByEmail`, `findByUsername`, `save`
- `src/interfaces/http/validation/auth.validation.js` — Esquemas Joi: `registerSchema` (5 campos), `loginSchema` (identity + password)
- `src/application/use_cases/auth/RegisterUser.js` — Verifica unicidad → hashea bcrypt → instancia entidad User → persiste
- `src/application/use_cases/auth/LoginUser.js` — Busca por email/username → compara bcrypt → genera JWT → retorna datos + token
- `src/interfaces/http/controllers/AuthController.js` — Delegador puro: `register` (201), `login` (200), errores vía `next(error)`
- `src/interfaces/http/routes/auth.routes.js` — `POST /register` y `POST /login` con validación Joi
- `src/interfaces/http/routes/index.js` — Monta auth bajo `/auth`

### Archivos modificados:
- `src/interfaces/app.js` — Import de `apiRoutes` y `app.use('/api', apiRoutes)`
- `src/infrastructure/database/models/user.model.js` — Fix: `models.Post` → `models.PostModel` en associate

### Endpoints:
- `POST /api/auth/register` — Registro de usuario
- `POST /api/auth/login` — Inicio de sesión

---

## Fase 3 — US5: Gestión de Contenido y Perfil del Creador

### Archivos creados:
- `src/infrastructure/repositories/PostRepository.js` — Métodos: `save`, `findByCreatorIdWithComments` (eager loading + ORDER BY DESC)
- `src/infrastructure/repositories/GoalRepository.js` — Método: `saveGoal` (upsert: actualiza si existe, crea si no)
- `src/interfaces/http/validation/creator.validation.js` — Esquemas Joi: `goalSchema`, `postTextSchema`
- `src/application/use_cases/creator/UpdateCreatorProfile.js` — Busca usuario, actualiza displayName, delega imágenes al método de dominio `updateProfileImages`
- `src/application/use_cases/creator/UpdateSupportGoal.js` — Delegador directo a `GoalRepository.saveGoal`
- `src/application/use_cases/creator/CreatePost.js` — Instancia entidad `Post` (dispara invariantes: al menos texto o imagen) → persiste
- `src/application/use_cases/creator/GetCreatorPosts.js` — Invoca `findByCreatorIdWithComments`
- `src/interfaces/http/controllers/CreatorController.js` — 4 métodos: `updateProfile`, `updateGoal`, `createPost`, `getPosts`
- `src/interfaces/http/routes/creator.routes.js` — Protegido globalmente con `isAuth` + `checkRole(['creator'])`

### Archivos modificados:
- `src/infrastructure/repositories/UserRepository.js` — Agregados métodos `findById` y `update`
- `src/infrastructure/database/models/post.model.js` — Agregada asociación `hasMany(CommentModel, as: 'comments')`
- `src/interfaces/http/routes/index.js` — Montaje de `creatorRoutes` bajo `/creator`

### Endpoints (protegidos — solo rol `creator`):
- `PUT /api/creator/profile` — Actualizar perfil (avatar + banner vía Multer)
- `PUT /api/creator/goal` — Crear/actualizar meta de apoyo
- `POST /api/creator/posts` — Crear publicación (texto y/o imagen)
- `GET /api/creator/posts` — Listar publicaciones con comentarios

---

## Estructura Final del Proyecto

```
src/
├── application/
│   ├── errors/
│   │   ├── NotFoundError.js
│   │   ├── UnauthorizedError.js
│   │   └── ForbiddenError.js
│   └── use_cases/
│       ├── auth/
│       │   ├── RegisterUser.js
│       │   └── LoginUser.js
│       └── creator/
│           ├── UpdateCreatorProfile.js
│           ├── UpdateSupportGoal.js
│           ├── CreatePost.js
│           └── GetCreatorPosts.js
├── domain/
│   ├── entities/
│   │   ├── user.js
│   │   ├── post.js
│   │   ├── comment.js
│   │   └── donation.js
│   └── errors/
│       └── BusinessRuleError.js
├── infrastructure/
│   ├── database/
│   │   ├── db.js
│   │   ├── schema.js
│   │   └── models/
│   │       ├── index.js
│   │       ├── user.model.js
│   │       ├── post.model.js
│   │       ├── comment.model.js
│   │       └── support_goal.model.js
│   ├── repositories/
│   │   ├── UserRepository.js
│   │   ├── PostRepository.js
│   │   └── GoalRepository.js
│   └── security/
│       ├── bcrypt.service.js
│       └── jwt.service.js
└── interfaces/
    ├── app.js
    └── http/
        ├── controllers/
        │   ├── AuthController.js
        │   └── CreatorController.js
        ├── middleware/
        │   ├── check_role.js
        │   ├── error_handler.js
        │   ├── is_auth.js
        │   ├── upload_image.js
        │   └── validate.js
        ├── routes/
        │   ├── index.js
        │   ├── auth.routes.js
        │   └── creator.routes.js
        └── validation/
            ├── auth.validation.js
            └── creator.validation.js
```
