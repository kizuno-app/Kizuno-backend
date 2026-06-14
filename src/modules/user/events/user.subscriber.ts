import { eventBus, CoreEvents } from '../../../shared/events';
import { UserService } from '../services/user.service';

export const setupUserEventSubscribers = () => {
  eventBus.subscribe(CoreEvents.USER_REGISTERED, async (data: { userId: string; firstName: string; lastName: string }) => {
    try {
      console.log(`[UserModule] Received USER_REGISTERED for user: ${data.userId}`);
      await UserService.createInitialProfile(data);
    } catch (error) {
      console.error(`[UserModule] Failed to handle USER_REGISTERED event`, error);
    }
  });
};
