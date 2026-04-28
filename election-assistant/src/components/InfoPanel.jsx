import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { ELECTION_STEPS } from '../data/electionData';

/**
 * Displays full details for the currently selected election step.
 */
export function InfoPanel({ id, activeStep, onNext }) {
  const step = ELECTION_STEPS[activeStep];
  const hasNext = activeStep < ELECTION_STEPS.length - 1;
  const nextStep = hasNext ? ELECTION_STEPS[activeStep + 1] : null;
  const StepIcon = step.icon;

  return (
    <motion.section
      id={id}
      className="info-panel glass"
      aria-label={`Details for: ${step.title}`}
      aria-live="polite"
      aria-atomic="true"
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
            <StepIcon size={40} color="var(--primary)" aria-hidden="true" />
            <h2>{step.title}</h2>
          </div>

          <div className="info-body">
            <p className="info-description">{step.description}</p>

            <h3 id={`checklist-heading-${activeStep}`}>Action Checklist</h3>
            <ul aria-labelledby={`checklist-heading-${activeStep}`}>
              {step.details.map((detail, idx) => (
                <motion.li
                  key={detail}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                >
                  {detail}
                </motion.li>
              ))}
            </ul>
          </div>

          {hasNext && (
            <motion.button
              className="next-phase-btn"
              whileHover={{ background: 'rgba(255,255,255,0.05)' }}
              onClick={onNext}
              aria-label={`Go to next phase: ${nextStep.title}`}
            >
              Next Phase <ChevronRight size={16} aria-hidden="true" />
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}

InfoPanel.propTypes = {
  id: PropTypes.string.isRequired,
  activeStep: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
};
