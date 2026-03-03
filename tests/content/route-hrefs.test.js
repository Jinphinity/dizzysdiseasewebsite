import { describe, expect, it } from 'vitest';
import { routeToHref } from '../../src/content/route-hrefs.js';

describe('routeToHref', () => {
  it('maps required routes to html pages', () => {
    expect(routeToHref('/')).toBe('index.html');
    expect(routeToHref('/archive')).toBe('archive.html');
    expect(routeToHref('/armory')).toBe('armory.html');
    expect(routeToHref('/comms')).toBe('comms.html');
    expect(routeToHref('/devlog')).toBe('devlog.html');
  });
});
