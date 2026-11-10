/**
 * The Core Event Bus (Mediator Pattern)
 * Enables decoupled, asynchronous event emission and subscription across domain services.
 */

import { CoreEventMap, CoreEventName } from './contracts/events';

export type CoreEventHandler<T> = (payload: T) => Promise<void> | void;

export class CoreEventBus {
  private handlers = new Map<string, CoreEventHandler<any>[]>();

  /**
   * Subscribe to a core event.
   */
  public on<K extends CoreEventName>(eventName: K, handler: CoreEventHandler<CoreEventMap[K]>): void {
    const current = this.handlers.get(eventName) || [];
    this.handlers.set(eventName, [...current, handler]);
  }

  /**
   * Unsubscribe a handler from a core event.
   */
  public off<K extends CoreEventName>(eventName: K, handler: CoreEventHandler<CoreEventMap[K]>): void {
    const current = this.handlers.get(eventName) || [];
    this.handlers.set(eventName, current.filter(h => h !== handler));
  }

  /**
   * Emit an event asynchronously to all registered listeners with error boundaries.
   */
  public async emit<K extends CoreEventName>(eventName: K, payload: CoreEventMap[K]): Promise<void> {
    const current = this.handlers.get(eventName) || [];
    if (current.length === 0) return;

    // Execute handlers safely in parallel without crashing the caller
    const executions = current.map(async (handler) => {
      try {
        await handler(payload);
      } catch (err) {
        // In real execution, log to central logger
        console.error(`[Core Event Bus Error] Handler for '${eventName}' failed:`, err);
      }
    });

    await Promise.all(executions);
  }

  /**
   * Clear all registered event handlers (used primarily in test teardown).
   */
  public clear(): void {
    this.handlers.clear();
  }

  /**
   * Check listener count for an event.
   */
  public listenerCount<K extends CoreEventName>(eventName: K): number {
    return (this.handlers.get(eventName) || []).length;
  }
}

// Global Core Event Bus Singleton
export const coreEventBus = new CoreEventBus();
