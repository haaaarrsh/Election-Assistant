import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Calendar, 
  UserPlus, 
  Mail, 
  Vote, 
  Landmark, 
  HelpCircle,
  X,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import './index.css';

const ELECTION_STEPS = [
  {
    id: 'register',
    title: 'Voter Registration',
    date: 'Check local deadlines',
    icon: UserPlus,
    description: 'Ensure you are eligible to vote and registered at your current address.',
    details: [
      'Check your voter registration status online.',
      "Gather necessary ID (Driver's License, State ID, SSN).",
      'Register to vote via mail, online, or in-person.',
      'Update your address if you have moved recently.'
    ]
  },
  {
    id: 'research',
    title: 'Research Candidates & Measures',
    date: 'Weeks before election',
    icon: Landmark,
    description: 'Learn about who and what is on your ballot to make informed decisions.',
    details: [
      'Find your sample ballot on your local election website.',
      'Read non-partisan voter guides.',
      'Research candidate platforms and past voting records.',
      'Understand local propositions and ballot measures.'
    ]
  },
  {
    id: 'early-vote',
    title: 'Early or Mail-In Voting',
    date: 'Usually 2-4 weeks prior',
    icon: Mail,
    description: 'Skip the lines on Election Day by voting early or by mail if eligible.',
    details: [
      'Request an absentee or mail-in ballot before the deadline.',
      'Follow instructions carefully (signatures, witness requirements).',
      'Track your ballot online to ensure it is received.',
      'Find early voting locations and their operating hours.'
    ]
  },
  {
    id: 'election-day',
    title: 'Election Day Voting',
    date: 'First Tuesday in Nov',
    icon: Vote,
    description: 'Head to the polls. Your voice matters in shaping the future.',
    details: [
      'Confirm your specific polling location (it may have changed).',
      'Bring required identification.',
      'If you are in line when polls close, STAY IN LINE. You have the right to vote.',
      'Ask poll workers for help if you have questions or need accommodations.'
    ]
  }
];

const FAQ_DATA = {
  "How do I register to vote?": "You can register online, by mail, or in person at your local election office or DMV. Requirements vary by state, so check your Secretary of State's website.",
  "What ID do I need?": "Voter ID laws vary by state. Some require a photo ID (like a driver's license or passport), while others accept utility bills or bank statements. Check your state's specific requirements.",
  "Where is my polling place?": "Your polling place is based on your residential address. You can look it up on your state or county election website, or by calling your local election office.",
  "Can I vote early?": "Most states offer some form of early voting or mail-in voting. Deadlines to request mail-in ballots are usually a week or two before Election Day."
};

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: "Hello! I'm your Election Assistant. What do you need help with today?" }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleFaqClick = (question) => {
    setChatMessages(prev => [...prev, { type: 'user', text: question }]);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { type: 'bot', text: FAQ_DATA[question] }]);
    }, 600);
  };

  return (
    <div className="app-container">
      <header className="header">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Election Assistant</h1>
          <p>Your interactive guide to understanding the voting process, timelines, and exactly what you need to do.</p>
        </motion.div>
      </header>

      <main className="main-content">
        {/* Timeline Section */}
        <motion.section 
          className="timeline-container glass"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {ELECTION_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;

            return (
              <motion.div 
                key={step.id}
                className={`timeline-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => setActiveStep(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="step-icon-container">
                  <div className="step-icon">
                    {isCompleted ? <CheckCircle2 size={24} /> : <Icon size={24} />}
                  </div>
                </div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <div className="step-date">
                    <Calendar size={14} />
                    <span>{step.date}</span>
                  </div>
                  {isActive && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2 text-sm text-gray-400"
                      style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}
                    >
                      {step.description}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            );
          })}

          <button 
            className="assistant-trigger"
            onClick={() => setIsChatOpen(true)}
          >
            <MessageSquare size={20} />
            Ask the AI Assistant
          </button>
        </motion.section>

        {/* Info Panel Section */}
        <motion.section 
          className="info-panel glass"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="info-header">
                {React.createElement(ELECTION_STEPS[activeStep].icon, { size: 40, color: 'var(--primary)' })}
                <h2>{ELECTION_STEPS[activeStep].title}</h2>
              </div>
              <div className="info-body">
                <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
                  {ELECTION_STEPS[activeStep].description}
                </p>
                <h3>Action Checklist</h3>
                <ul>
                  {ELECTION_STEPS[activeStep].details.map((detail, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                    >
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              {activeStep < ELECTION_STEPS.length - 1 && (
                <motion.button 
                  style={{
                    marginTop: '2rem',
                    background: 'transparent',
                    border: '1px solid var(--border)',
                    color: 'var(--text-main)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s'
                  }}
                  whileHover={{ background: 'rgba(255,255,255,0.05)' }}
                  onClick={() => setActiveStep(prev => prev + 1)}
                >
                  Next Phase <ChevronRight size={16} />
                </motion.button>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.section>
      </main>

      {/* Chat Assistant Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            className="chat-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="chat-window glass"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
            >
              <div className="chat-header">
                <h3><HelpCircle size={24} color="var(--primary)" /> FAQ Assistant</h3>
                <button className="close-btn" onClick={() => setIsChatOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              
              <div className="chat-messages">
                {chatMessages.map((msg, i) => (
                  <motion.div 
                    key={i} 
                    className={`message ${msg.type}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {msg.text}
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="chat-input-area">
                <p style={{ marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Common questions:
                </p>
                <div className="faq-chips">
                  {Object.keys(FAQ_DATA).map((q, i) => (
                    <button 
                      key={i} 
                      className="faq-chip"
                      onClick={() => handleFaqClick(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
