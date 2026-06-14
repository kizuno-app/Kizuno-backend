# Database Schema Plan

Due to the strict Modular Monolith nature, each module maintains its own schema logic physically mapped to a Postgres DB (Neon).

- **Auth DB:** Contains `AuthUser` (id, email, passwordHash)
- **User DB:** Contains `Profile` (userId, names, avatar, bio)
- **Post DB:** Contains `Post`, `Like`, `Comment`
- **Connection DB:** Contains `Connection` (followerId, followingId)
- **Chat DB:** Contains `Conversation`, `Participant`, `Message`
- **Notification DB:** Contains `Notification`

> Data Integrity: Cross-module foreign keys are intentionally NOT enforced at the database level. Instead, referential integrity is managed by application logic and events (e.g. if a user is deleted, a `USER_DELETED` event causes the Post module to delete their posts).
