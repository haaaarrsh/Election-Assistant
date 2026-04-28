import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { ELECTION_STEPS } from '../data/electionData';

/**
 * A single step entry in the election timeline.
 */
export function TimelineStep({ step, index, isActive, isCompleted, infoPanelId, onClick }) {
  const Icon = step.icon;
  const stepStatus = isCompleted ? 'completed' : isActive ? 'current' : 'upcoming';
  const totalSteps = ELECTION_STEPS.length;

  return (
    <li>
      <motion.button
        className={`timeline-step${isActive ? ' active' : ''}${isCompleted ? ' completed' : ''}`}
        onClick={onClick}
        aria-current={isActive ? 'step' : undefined}
        aria-label={`Step ${index + 1} of ${totalSteps}: ${step.title}. Status: ${stepStatus}.`}
        aria-controls={infoPanelId}
        aria-expanded={isActive}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        <div className="step-icon-container">
          <div className="step-icon" aria-hidden="true">
            {isCompleted ? <CheckCircle2 size={24} /> : <Icon size={24} />}
          </div>
        </div>

        <div className="step-content">
          <h3 className="step-title">{step.title}</h3>
          <div className="step-date">
            <Calendar size={14} aria-hidden="true" />
            <span>{step.date}</span>
          </div>
          {isActive && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="step-description"
            >
              {step.description}
            </motion.p>
          )}
        </div>
      </motion.button>
    </li>
  );
}

TimelineStep.propTypes = {
  step: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  infoPanelId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
