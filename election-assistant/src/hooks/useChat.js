import { useCallback, useEffect, useRef, useState } from 'react';
import { FAQ_DATA } from '../data/electionData';
import { getFaqAnswer } from '../utils/security';
import { trackFaqQuestion } from '../utils/analytics';

const INITIAL_MESSAGE = {
  type: 'bot',
  text: "Hello! I'm your Election Assistant. What do you need help with today?",
};

const BOT_RESPONSE_DELAY_MS = 600;

/**
 * Manages chat state, message scrolling, and FAQ interactions.
 * @returns {{ messages: Array, messagesEndRef: React.RefObject, handleFaqClick: Function }}
 */
export function useChat() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleFaqClick = useCallback((question) => {
    trackFaqQuestion(question);
    setMessages((prev) => [...prev, { type: 'user', text: question }]);

    const timerId = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: getFaqAnswer(FAQ_DATA, question) },
      ]);
    }, BOT_RESPONSE_DELAY_MS);

    return () => clearTimeout(timerId);
  }, []);

  return { messages, messagesEndRef, handleFaqClick };
}
