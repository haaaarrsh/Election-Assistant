import { useCallback, useEffect, useRef, useState } from 'react';
import { FAQ_DATA } from '../data/electionData';

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
    setMessages((prev) => [...prev, { type: 'user', text: question }]);

    const timerId = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: FAQ_DATA[question] },
      ]);
    }, BOT_RESPONSE_DELAY_MS);

    // Return cleanup in case component unmounts mid-timeout
    return () => clearTimeout(timerId);
  }, []);

  return { messages, messagesEndRef, handleFaqClick };
}
