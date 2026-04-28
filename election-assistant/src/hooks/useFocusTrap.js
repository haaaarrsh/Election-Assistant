import { useCallback, useEffect, useRef } from 'react';

const FOCUS_DELAY_MS = 50;

/**
 * Manages focus lifecycle for a modal dialog:
 * - Focuses `initialFocusRef` when `isOpen` becomes true.
 * - Returns focus to `returnFocusRef` when `isOpen` becomes false.
 *
 * @param {boolean} isOpen - Whether the modal is currently open.
 * @param {React.RefObject} initialFocusRef - Element to focus on open.
 * @param {React.RefObject} returnFocusRef - Element to restore focus to on close.
 */
export function useFocusTrap(isOpen, initialFocusRef, returnFocusRef) {
  useEffect(() => {
    if (isOpen) {
      const timerId = setTimeout(
        () => initialFocusRef.current?.focus(),
        FOCUS_DELAY_MS,
      );
      return () => clearTimeout(timerId);
    } else {
      returnFocusRef.current?.focus();
    }
  }, [isOpen, initialFocusRef, returnFocusRef]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        returnFocusRef.current?.focus();
      }
    },
    [isOpen, returnFocusRef],
  );

  return { handleKeyDown };
}
