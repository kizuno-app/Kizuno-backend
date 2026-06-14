import EventEmitter from 'events';

class EventBus extends EventEmitter {
  private static instance: EventBus;

  private constructor() {
    super();
    // Increase limit if many modules subscribe to the same event
    this.setMaxListeners(20); 
  }

  public static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  // Abstraction layer for future Kafka replacement
  public async publish(topic: string, message: any): Promise<void> {
    console.log(`[EventBus] Publishing event: ${topic}`, message);
    // In a real Kafka setup, this would be producer.send()
    this.emit(topic, message);
  }

  public async subscribe(topic: string, handler: (message: any) => void): Promise<void> {
    console.log(`[EventBus] Subscribing to event: ${topic}`);
    // In a real Kafka setup, this would be consumer.subscribe()
    this.on(topic, handler);
  }
}

export const eventBus = EventBus.getInstance();

export const CoreEvents = {
  USER_REGISTERED: 'USER_REGISTERED',
  PROFILE_UPDATED: 'PROFILE_UPDATED',
  POST_CREATED: 'POST_CREATED',
  POST_LIKED: 'POST_LIKED',
  POST_COMMENTED: 'POST_COMMENTED',
  POST_SHARED: 'POST_SHARED',
  USER_FOLLOWED: 'USER_FOLLOWED',
  USER_UNFOLLOWED: 'USER_UNFOLLOWED',
  MESSAGE_SENT: 'MESSAGE_SENT',
  NOTIFICATION_CREATED: 'NOTIFICATION_CREATED',
} as const;
