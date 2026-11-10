import { describe, it, expect, beforeEach } from 'vitest';
import { CoreServiceRegistry } from '../registry';

describe('Core Service Registry', () => {
  let registry: CoreServiceRegistry;

  beforeEach(() => {
    registry = new CoreServiceRegistry();
  });

  it('should register and retrieve a service successfully', () => {
    const mockProductService = {
      getProducts: () => ['Product 1', 'Product 2'],
    };

    registry.register('productManagement', mockProductService);

    expect(registry.has('productManagement')).toBe(true);
    const retrieved = registry.get<typeof mockProductService>('productManagement');
    expect(retrieved).toBeDefined();
    expect(retrieved.getProducts()).toHaveLength(2);
  });

  it('should throw an error when accessing an unregistered service', () => {
    expect(() => registry.get('unregisteredService')).toThrowError(
      "[Core Registry Error]: Service 'unregisteredService' is not registered with Core."
    );
  });

  it('should list all registered services correctly', () => {
    registry.register('svc1', {});
    registry.register('svc2', {});

    const list = registry.listRegisteredServices();
    expect(list).toEqual(['svc1', 'svc2']);
  });

  it('should clear all services upon clear()', () => {
    registry.register('svc1', {});
    registry.clear();

    expect(registry.listRegisteredServices()).toHaveLength(0);
    expect(registry.has('svc1')).toBe(false);
  });
});
