export function createAnalytics() {
  const history = [];

  function track(event, details = {}) {
    const payload = {
      event,
      details,
      timestamp: new Date().toISOString()
    };

    history.push(payload);

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(payload);
    }

    // Keep development visibility without coupling to a vendor SDK.
    if (import.meta.env.DEV) {
      console.info('[analytics]', payload);
    }

    return payload;
  }

  return {
    track,
    getHistory() {
      return [...history];
    }
  };
}
