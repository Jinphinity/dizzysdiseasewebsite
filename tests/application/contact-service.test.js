import { afterEach, describe, expect, it, vi } from 'vitest';
import { createContactService } from '../../src/application/create-contact-service.js';

function createMemoryStorage() {
  const data = new Map();

  return {
    getItem(key) {
      return data.has(key) ? data.get(key) : null;
    },
    setItem(key, value) {
      data.set(key, value);
    }
  };
}

describe('createContactService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('stores submission locally when endpoint is missing', async () => {
    const storage = createMemoryStorage();
    const service = createContactService(storage);

    const result = await service.submit({
      endpoint: '',
      payload: { name: 'A', email: 'a@b.com', message: 'Hello' }
    });

    expect(result.ok).toBe(true);
    expect(result.mode).toBe('local');
    expect(storage.getItem('dd_mvp_contact_queue_v1')).toContain('a@b.com');
  });

  it('returns remote failure when endpoint response is not ok', async () => {
    const storage = createMemoryStorage();
    const service = createContactService(storage);
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));

    const result = await service.submit({
      endpoint: 'https://example.com/form',
      payload: { name: 'A', email: 'a@b.com', message: 'Hello' }
    });

    expect(result.ok).toBe(false);
    expect(result.mode).toBe('remote');
  });
});
