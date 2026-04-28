import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X } from 'lucide-react';
import { useRef } from 'react';
import { useChat } from '../hooks/useChat';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { FAQ_DATA } from '../data/electionData';

/**
 * Modal dialog containing the FAQ chat assistant.
 */
export function ChatModal({ isOpen, triggerRef, onClose }) {
  const { messages, messagesEndRef, handleFaqClick } = useChat();
  const closeBtnRef = useRef(null);
  const { handleKeyDown } = useFocusTrap(isOpen, closeBtnRef, triggerRef);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="chat-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          aria-hidden="true"
        >
          <motion.div
            className="chat-window glass"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-dialog-title"
            aria-describedby="chat-dialog-desc"
            aria-hidden="false"
            tabIndex={-1}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            onKeyDown={handleKeyDown}
          >
            {/* Header */}
            <div className="chat-header">
              <h3 id="chat-dialog-title">
                <HelpCircle size={24} color="var(--primary)" aria-hidden="true" />
                FAQ Assistant
              </h3>
              <button
                ref={closeBtnRef}
                className="close-btn"
                onClick={onClose}
                aria-label="Close FAQ Assistant"
              >
                <X size={24} aria-hidden="true" />
              </button>
            </div>

            {/* Messages */}
            <div
              className="chat-messages"
              role="log"
              aria-live="polite"
              aria-label="Chat conversation"
              aria-relevant="additions"
            >
              <p id="chat-dialog-desc" className="sr-only">
                Select one of the common questions below to get an answer from the Election Assistant.
              </p>
              {messages.map((msg) => (
                <motion.div
                  key={`${msg.type}-${msg.text}`}
                  className={`message ${msg.type}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  role={msg.type === 'bot' ? 'status' : undefined}
                  aria-label={msg.type === 'bot' ? `Assistant: ${msg.text}` : `You: ${msg.text}`}
                >
                  {msg.text}
                </motion.div>
              ))}
              <div ref={messagesEndRef} aria-hidden="true" />
            </div>

            {/* FAQ Chips */}
            <div className="chat-input-area">
              <p
                id="faq-chips-label"
                style={{ marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}
              >
                Common questions:
              </p>
              <div className="faq-chips" role="group" aria-labelledby="faq-chips-label">
                {Object.entries(FAQ_DATA).map(([question]) => (
                  <button
                    key={question}
                    className="faq-chip"
                    onClick={() => handleFaqClick(question)}
                    aria-label={`Ask: ${question}`}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

ChatModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  triggerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  onClose: PropTypes.func.isRequired,
};
