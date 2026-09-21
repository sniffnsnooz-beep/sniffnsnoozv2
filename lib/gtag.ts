export const GA_TRACKING_ID = "G-C819C0F186";

// Log specific events
export const trackConversion = (action: string, params: object = {}) => {
  if (typeof window !== "undefined" && typeof (window as any).gtag !== "undefined") {
    (window as any).gtag("event", action, params);
  } else {
    console.debug(`Analytics blocked or missing. Event: ${action}`, params);
  }
};
