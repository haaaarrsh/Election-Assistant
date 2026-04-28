import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

import { ELECTION_STEPS } from './data/electionData';
import { trackStepView, trackChatOpen } from './utils/analytics';
import { TimelineStep } from './components/TimelineStep';
import { InfoPanel } from './components/InfoPanel';
import { ChatModal } from './components/ChatModal';
import './index.css';

/** Unique, stable ID linking timeline nav to the info panel. */
const INFO_PANEL_ID = 'election-info-panel';

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatTriggerRef = useRef(null);

  const handleOpenChat = useCallback(() => {
    trackChatOpen();
    setIsChatOpen(true);
  }, []);

  const handleCloseChat = useCallback(() => setIsChatOpen(false), []);

  const handleNextStep = useCallback(() => setActiveStep((prev) => {
    const next = prev + 1;
    trackStepView(ELECTION_STEPS[next].id, ELECTION_STEPS[next].title);
    return next;
  }), []);

  const handleStepClick = useCallback((index) => {
    trackStepView(ELECTION_STEPS[index].id, ELECTION_STEPS[index].title);
    setActiveStep(index);
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Election Assistant</h1>
          <p>
            Your interactive guide to understanding the voting process,
            timelines, and exactly what you need to do.
          </p>
        </motion.div>
      </header>

      <main id="main-content" className="main-content">
        {/* ── Timeline ── */}
        <motion.section
          className="timeline-container glass"
          aria-label="Election process timeline"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <nav aria-label="Election steps navigation">
            <ol className="timeline-list">
              {ELECTION_STEPS.map((step, index) => (
                <TimelineStep
                  key={step.id}
                  step={step}
                  index={index}
                  isActive={index === activeStep}
                  isCompleted={index < activeStep}
                  infoPanelId={INFO_PANEL_ID}
                  onClick={() => handleStepClick(index)}
                />
              ))}
            </ol>
          </nav>

          <button
            ref={chatTriggerRef}
            className="assistant-trigger"
            onClick={handleOpenChat}
            aria-haspopup="dialog"
            aria-label="Open FAQ Assistant chat"
          >
            <MessageSquare size={20} aria-hidden="true" />
            Ask the AI Assistant
          </button>
        </motion.section>

        {/* ── Info Panel ── */}
        <InfoPanel
          id={INFO_PANEL_ID}
          activeStep={activeStep}
          onNext={handleNextStep}
        />
      </main>

      {/* ── Chat Modal ── */}
      <ChatModal
        isOpen={isChatOpen}
        triggerRef={chatTriggerRef}
        onClose={handleCloseChat}
      />
    </div>
  );
}

export default App;
