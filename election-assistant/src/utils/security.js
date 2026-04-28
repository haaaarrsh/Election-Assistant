/**
 * Sanitizes a string to prevent XSS when content is rendered as text.
 * Since we use React (which escapes by default), this is a defense-in-depth
 * layer for any values used in dynamic attributes or passed to third parties.
 * @param {string} value
 * @returns {string}
 */
export function sanitizeText(value) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Validates that an FAQ answer exists for a given question key.
 * Prevents undefined from being rendered if the data falls out of sync.
 * @param {Record<string, string>} data
 * @param {string} question
 * @returns {string}
 */
export function getFaqAnswer(data, question) {
  const answer = data[question];
  if (typeof answer !== 'string' || answer.trim() === '') {
    return 'Sorry, no answer is available for that question.';
  }
  return answer;
}
