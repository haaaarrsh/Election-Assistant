import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatModal } from '../components/ChatModal';
import { FAQ_DATA } from '../data/electionData';

const FIRST_QUESTION = Object.keys(FAQ_DATA)[0];
const triggerRef = { current: null };

describe('ChatModal', () => {
  it('does not render when isOpen is false', () => {
    render(<ChatModal isOpen={false} triggerRef={triggerRef} onClose={vi.fn()} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders the dialog when isOpen is true', () => {
    render(<ChatModal isOpen={true} triggerRef={triggerRef} onClose={vi.fn()} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('shows the initial greeting message', () => {
    render(<ChatModal isOpen={true} triggerRef={triggerRef} onClose={vi.fn()} />);
    expect(screen.getByText(/Hello! I'm your Election Assistant/i)).toBeInTheDocument();
  });

  it('renders all FAQ chip buttons', () => {
    render(<ChatModal isOpen={true} triggerRef={triggerRef} onClose={vi.fn()} />);
    Object.keys(FAQ_DATA).forEach((q) => {
      expect(screen.getByText(q)).toBeInTheDocument();
    });
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ChatModal isOpen={true} triggerRef={triggerRef} onClose={onClose} />);
    await user.click(screen.getByRole('button', { name: /close faq assistant/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when Escape key is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ChatModal isOpen={true} triggerRef={triggerRef} onClose={onClose} />);
    
    // Wait for the focus trap to focus the close button (50ms delay)
    const closeBtn = screen.getByRole('button', { name: /close faq assistant/i });
    await waitFor(() => expect(closeBtn).toHaveFocus());
    
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('shows a user message after clicking a FAQ chip', async () => {
    const user = userEvent.setup();
    render(<ChatModal isOpen={true} triggerRef={triggerRef} onClose={vi.fn()} />);
    await user.click(screen.getByText(FIRST_QUESTION));
    // The text now appears in two places: the chip and the new message
    const messages = screen.getAllByText(FIRST_QUESTION);
    expect(messages.length).toBeGreaterThanOrEqual(2);
  });

  it('shows a bot response after clicking a FAQ chip', async () => {
    const user = userEvent.setup();
    render(<ChatModal isOpen={true} triggerRef={triggerRef} onClose={vi.fn()} />);
    await user.click(screen.getByText(FIRST_QUESTION));
    await waitFor(() => {
      expect(screen.getByText(FAQ_DATA[FIRST_QUESTION])).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('has aria-modal="true" on the dialog', () => {
    render(<ChatModal isOpen={true} triggerRef={triggerRef} onClose={vi.fn()} />);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('has a labelled dialog title heading', () => {
    render(<ChatModal isOpen={true} triggerRef={triggerRef} onClose={vi.fn()} />);
    // The dialog title is in an h3 with id="chat-dialog-title"
    expect(document.getElementById('chat-dialog-title')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'chat-dialog-title');
  });
});
