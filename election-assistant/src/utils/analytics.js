/** @type {string} Replace with your actual GA4 Measurement ID */
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

/**
 * Returns true only in a real browser production environment.
 * Prevents tracking noise during development or testing.
 */
const isTrackingEnabled = () =>
  typeof window !== 'undefined' &&
  typeof window.gtag === 'function' &&
  import.meta.env.PROD;

/**
 * Track a named event with optional parameters.
 * @param {string} eventName - GA4 event name (snake_case recommended).
 * @param {Record<string, string | number | boolean>} [params] - Optional event parameters.
 */
export function trackEvent(eventName, params = {}) {
  if (!isTrackingEnabled()) return;
  window.gtag('event', eventName, params);
}

/**
 * Track when a user selects a timeline step.
 * @param {string} stepId - The id of the selected step.
 * @param {string} stepTitle - The display title of the selected step.
 */
export function trackStepView(stepId, stepTitle) {
  trackEvent('step_view', {
    step_id: stepId,
    step_title: stepTitle,
  });
}

/**
 * Track when a user asks an FAQ question.
 * @param {string} question - The FAQ question string.
 */
export function trackFaqQuestion(question) {
  trackEvent('faq_question_asked', { question });
}

/**
 * Track when the chat modal is opened.
 */
export function trackChatOpen() {
  trackEvent('chat_modal_open');
}

export { GA_MEASUREMENT_ID };
