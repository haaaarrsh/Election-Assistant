import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useChat } from '../hooks/useChat';
import { FAQ_DATA } from '../data/electionData';

const FIRST_QUESTION = Object.keys(FAQ_DATA)[0];

describe('useChat', () => {
  it('initializes with a single bot greeting message', () => {
    const { result } = renderHook(() => useChat());
    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].type).toBe('bot');
    expect(result.current.messages[0].text).toContain("Election Assistant");
  });

  it('exposes messagesEndRef as a ref object', () => {
    const { result } = renderHook(() => useChat());
    expect(result.current.messagesEndRef).toBeDefined();
    expect(result.current.messagesEndRef).toHaveProperty('current');
  });

  it('adds a user message immediately on FAQ click', () => {
    const { result } = renderHook(() => useChat());
    act(() => {
      result.current.handleFaqClick(FIRST_QUESTION);
    });
    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[1]).toEqual({
      type: 'user',
      text: FIRST_QUESTION,
    });
  });

  it('adds a bot response after the delay', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.handleFaqClick(FIRST_QUESTION);
    });

    expect(result.current.messages).toHaveLength(2);

    await act(async () => {
      vi.advanceTimersByTime(700);
    });

    expect(result.current.messages).toHaveLength(3);
    expect(result.current.messages[2].type).toBe('bot');
    expect(result.current.messages[2].text).toBe(FAQ_DATA[FIRST_QUESTION]);

    vi.useRealTimers();
  });

  it('returns a fallback bot message for an unknown question', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.handleFaqClick('This question does not exist');
    });

    await act(async () => {
      vi.advanceTimersByTime(700);
    });

    expect(result.current.messages[2].type).toBe('bot');
    expect(result.current.messages[2].text).toContain('no answer is available');

    vi.useRealTimers();
  });

  it('can handle multiple sequential FAQ clicks', () => {
    const { result } = renderHook(() => useChat());
    const questions = Object.keys(FAQ_DATA).slice(0, 2);

    act(() => {
      result.current.handleFaqClick(questions[0]);
      result.current.handleFaqClick(questions[1]);
    });

    const userMessages = result.current.messages.filter((m) => m.type === 'user');
    expect(userMessages).toHaveLength(2);
  });
});
