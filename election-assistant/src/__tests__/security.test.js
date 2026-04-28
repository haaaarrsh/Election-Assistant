import { describe, it, expect } from 'vitest';
import { sanitizeText, getFaqAnswer } from '../utils/security';

describe('sanitizeText', () => {
  it('returns empty string for non-string input', () => {
    expect(sanitizeText(null)).toBe('');
    expect(sanitizeText(undefined)).toBe('');
    expect(sanitizeText(123)).toBe('');
  });

  it('escapes HTML special characters', () => {
    expect(sanitizeText('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;',
    );
  });

  it('escapes ampersands', () => {
    expect(sanitizeText('Candidates & Measures')).toBe('Candidates &amp; Measures');
  });

  it('escapes single quotes', () => {
    expect(sanitizeText("driver's license")).toBe("driver&#x27;s license");
  });

  it('returns clean text unchanged (no false positives)', () => {
    expect(sanitizeText('Hello world')).toBe('Hello world');
  });
});

describe('getFaqAnswer', () => {
  const data = {
    'Valid question': 'A valid answer.',
    'Empty answer': '',
  };

  it('returns the answer for a valid question', () => {
    expect(getFaqAnswer(data, 'Valid question')).toBe('A valid answer.');
  });

  it('returns fallback for an unknown question', () => {
    expect(getFaqAnswer(data, 'Unknown question')).toContain('no answer is available');
  });

  it('returns fallback for an empty answer', () => {
    expect(getFaqAnswer(data, 'Empty answer')).toContain('no answer is available');
  });

  it('returns fallback for whitespace-only answer', () => {
    expect(getFaqAnswer({ q: '   ' }, 'q')).toContain('no answer is available');
  });
});
