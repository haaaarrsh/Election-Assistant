import '@testing-library/jest-dom';
import { vi } from 'vitest';

// jsdom does not implement scrollIntoView — polyfill it
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// ─── Mock framer-motion ───────────────────────────────────────────────────────
// Framer-motion uses CSS animations which don't run in jsdom.
// This mock makes every motion.* component render as its plain HTML equivalent
// so that animations don't interfere with DOM assertions.
vi.mock('framer-motion', async () => {
  const React = await import('react');

  const motion = new Proxy({}, {
    get: (_target, tag) => {
      const MotionComponent = React.forwardRef(({ children, ...props }, ref) => {
        // Strip framer-specific props so they don't end up in the DOM
        const {
          initial, animate, exit, transition,
          whileHover, whileTap, whileFocus,
          variants, layout, layoutId,
          ...domProps
        } = props;
        return React.createElement(tag, { ...domProps, ref }, children);
      });
      MotionComponent.displayName = `motion.${tag}`;
      return MotionComponent;
    },
  });

  const AnimatePresence = ({ children }) => children;
  AnimatePresence.displayName = 'AnimatePresence';

  return { motion, AnimatePresence };
});
