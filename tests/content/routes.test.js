import { describe, expect, it } from 'vitest';
import { ROUTES, ROUTE_ORDER } from '../../src/content/routes.js';

describe('route manifest', () => {
  it('defines exactly five required assignment routes', () => {
    expect(ROUTE_ORDER).toEqual(['/', '/archive', '/armory', '/comms', '/devlog']);
    expect(Object.keys(ROUTES)).toHaveLength(5);
  });

  it('ensures each route has required content and image', () => {
    for (const path of ROUTE_ORDER) {
      const route = ROUTES[path];
      expect(route).toBeTruthy();
      expect(route.title?.length).toBeGreaterThan(3);
      expect(route.heroImage?.startsWith('/assets/rooms/')).toBe(true);
      expect(route.infoBlocks?.length).toBeGreaterThan(0);
    }
  });

  it('ensures contact route has required assignment contact fields', () => {
    const comms = ROUTES['/comms'];

    expect(comms.contact).toEqual(
      expect.objectContaining({
        phone: expect.any(String),
        email: expect.any(String),
        address: expect.any(String)
      })
    );
  });
});
