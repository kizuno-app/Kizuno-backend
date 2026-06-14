# Event Flow

We use an internal `EventEmitter` abstracting over what would be Kafka/RabbitMQ in the future.

### Defined Events
1. **USER_REGISTERED**
   - **Publisher:** Auth Module
   - **Subscribers:** User Module (creates profile)

2. **POST_CREATED**
   - **Publisher:** Post Module
   - **Subscribers:** Feed Module (pushes to follower feeds)

3. **POST_LIKED / POST_COMMENTED**
   - **Publisher:** Post Module
   - **Subscribers:** Notification Module (alerts post owner), Feed Module (updates ranking)

4. **USER_FOLLOWED**
   - **Publisher:** Connection Module
   - **Subscribers:** Notification Module

5. **MESSAGE_SENT**
   - **Publisher:** Chat Module
   - **Subscribers:** Real-time Gateway (Socket.io)
