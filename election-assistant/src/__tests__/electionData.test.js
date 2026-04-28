import { describe, it, expect } from 'vitest';
import { ELECTION_STEPS, FAQ_DATA } from '../data/electionData';

describe('ELECTION_STEPS data integrity', () => {
  it('has at least one step', () => {
    expect(ELECTION_STEPS.length).toBeGreaterThan(0);
  });

  it.each(ELECTION_STEPS)('step "$title" has all required fields', (step) => {
    expect(step.id).toBeTruthy();
    expect(step.title).toBeTruthy();
    expect(step.date).toBeTruthy();
    expect(step.icon).toBeTruthy(); // Lucide icons are forwardRef objects, still a valid React component
    expect(step.description).toBeTruthy();
    expect(Array.isArray(step.details)).toBe(true);
    expect(step.details.length).toBeGreaterThan(0);
  });

  it('has unique step ids', () => {
    const ids = ELECTION_STEPS.map((s) => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('each step has at least 2 detail items', () => {
    ELECTION_STEPS.forEach((step) => {
      expect(step.details.length).toBeGreaterThanOrEqual(2);
    });
  });
});

describe('FAQ_DATA integrity', () => {
  it('has at least one question', () => {
    expect(Object.keys(FAQ_DATA).length).toBeGreaterThan(0);
  });

  it('every answer is a non-empty string', () => {
    Object.entries(FAQ_DATA).forEach(([question, answer]) => {
      expect(typeof answer, `Answer for "${question}"`).toBe('string');
      expect(answer.trim().length, `Answer for "${question}"`).toBeGreaterThan(0);
    });
  });
});
