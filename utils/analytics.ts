/**
 * Sniffnsnooz Analytics Event Helper (GTM / GA4 Integration)
 * Pushes custom interaction events into the browser dataLayer.
 */
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== "undefined") {
    // Ensure the dataLayer array exists on the global window context
    const dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer = dataLayer;

    // Push standard GTM event format
    dataLayer.push({
      event: eventName,
      timestamp: new Date().toISOString(),
      ...params,
    });
  }
}
