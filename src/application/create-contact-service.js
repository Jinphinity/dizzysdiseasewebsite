const LOCAL_QUEUE_KEY = 'dd_mvp_contact_queue_v1';

export function createContactService(storage = window.localStorage) {
  async function submit({ endpoint, payload }) {
    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          return {
            ok: false,
            mode: 'remote',
            message: 'Transmission failed. Please retry.'
          };
        }

        return {
          ok: true,
          mode: 'remote',
          message: 'Transmission sent successfully.'
        };
      }

      let queue = [];
      try {
        const raw = storage.getItem(LOCAL_QUEUE_KEY);
        queue = raw ? JSON.parse(raw) : [];
      } catch {
        queue = [];
      }

      queue.push({ ...payload, receivedAt: new Date().toISOString() });
      storage.setItem(LOCAL_QUEUE_KEY, JSON.stringify(queue));

      return {
        ok: true,
        mode: 'local',
        message: 'Transmission recorded locally (configure Formspree endpoint for live delivery).'
      };
    } catch (err) {
      return {
        ok: false,
        mode: 'error',
        message: 'Network unreachable. Transmission could not be sent.'
      };
    }
  }

  return {
    submit
  };
}
