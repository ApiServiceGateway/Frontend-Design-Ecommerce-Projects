/**
 * The Core Service Registry
 * Serves as the central dependency container & type-safe service locator.
 * Modules register their interface implementation here, eliminating direct inter-module imports.
 */

import { CoreServiceName } from './contracts/service-names';

export class CoreServiceRegistry {
  private services = new Map<string, unknown>();

  /**
   * Register a domain service instance with the Core.
   */
  public register<T>(name: CoreServiceName | string, serviceInstance: T): void {
    if (!name || !serviceInstance) {
      throw new Error(`[Core Registry Error]: Both name and service instance are required.`);
    }
    this.services.set(name, serviceInstance);
  }

  /**
   * Retrieve a registered service instance by name.
   */
  public get<T>(name: CoreServiceName | string): T {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`[Core Registry Error]: Service '${name}' is not registered with Core.`);
    }
    return service as T;
  }

  /**
   * Check if a service is registered.
   */
  public has(name: CoreServiceName | string): boolean {
    return this.services.has(name);
  }

  /**
   * List all registered service names.
   */
  public listRegisteredServices(): string[] {
    return Array.from(this.services.keys());
  }

  /**
   * Clear registry (used primarily in test teardown).
   */
  public clear(): void {
    this.services.clear();
  }
}

// Global Core Service Registry Singleton
export const coreRegistry = new CoreServiceRegistry();
