import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middlewares/errorHandler';

const app: Application = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Import Routes
import { authRoutes, setupAuthEventSubscribers } from './modules/auth';
import { userRoutes, setupUserEventSubscribers } from './modules/user';
import { postRoutes } from './modules/post';
import { feedRoutes, setupFeedEventSubscribers } from './modules/feed';
import { connectionRoutes } from './modules/connection';
import { chatRoutes } from './modules/chat';
import { notificationRoutes, setupNotificationEventSubscribers } from './modules/notification';
import { discoverRoutes } from './modules/discover';
import { organizationRoutes, platformAdminOrganizationRoutes } from './modules/organization';
import { reportRoutes } from './modules/report';
import { setupEmailEventSubscribers } from './modules/email';
// Setup Event Subscribers
setupAuthEventSubscribers();
setupUserEventSubscribers();
setupFeedEventSubscribers();
setupNotificationEventSubscribers();
setupEmailEventSubscribers();

// Register Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/feed', feedRoutes);
app.use('/api/v1/connections', connectionRoutes);
app.use('/api/v1/chat', chatRoutes);
app.use('/api/v1/user-alerts', notificationRoutes);
app.use('/api/v1/discover', discoverRoutes);
app.use('/api/v1/organizations', organizationRoutes);
app.use('/api/v1/_sys/x-org-ops', platformAdminOrganizationRoutes);
app.use('/api/v1/reports', reportRoutes);
// Error Handling
app.use(errorHandler);

export default app;
