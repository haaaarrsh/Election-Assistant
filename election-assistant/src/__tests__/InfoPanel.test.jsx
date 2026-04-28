import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InfoPanel } from '../components/InfoPanel';
import { ELECTION_STEPS } from '../data/electionData';

const DEFAULT_PROPS = {
  id: 'test-info-panel',
  activeStep: 0,
  onNext: vi.fn(),
};

describe('InfoPanel', () => {
  it('renders the title for the active step', () => {
    render(<InfoPanel {...DEFAULT_PROPS} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      ELECTION_STEPS[0].title,
    );
  });

  it('renders the description for the active step', () => {
    render(<InfoPanel {...DEFAULT_PROPS} />);
    expect(screen.getByText(ELECTION_STEPS[0].description)).toBeInTheDocument();
  });

  it('renders all checklist items for the active step', () => {
    render(<InfoPanel {...DEFAULT_PROPS} />);
    ELECTION_STEPS[0].details.forEach((detail) => {
      expect(screen.getByText(detail)).toBeInTheDocument();
    });
  });

  it('shows the Next Phase button when not on the last step', () => {
    render(<InfoPanel {...DEFAULT_PROPS} activeStep={0} />);
    expect(screen.getByRole('button', { name: /next phase/i })).toBeInTheDocument();
  });

  it('hides the Next Phase button on the last step', () => {
    render(<InfoPanel {...DEFAULT_PROPS} activeStep={ELECTION_STEPS.length - 1} />);
    expect(screen.queryByRole('button', { name: /next phase/i })).not.toBeInTheDocument();
  });

  it('calls onNext when the Next Phase button is clicked', async () => {
    const user = userEvent.setup();
    render(<InfoPanel {...DEFAULT_PROPS} activeStep={0} />);
    await user.click(screen.getByRole('button', { name: /next phase/i }));
    expect(DEFAULT_PROPS.onNext).toHaveBeenCalledOnce();
  });

  it('has correct aria-label for the current step', () => {
    render(<InfoPanel {...DEFAULT_PROPS} />);
    const section = screen.getByRole('region', {
      name: `Details for: ${ELECTION_STEPS[0].title}`,
    });
    expect(section).toBeInTheDocument();
  });

  it('updates content when activeStep changes', () => {
    const { rerender } = render(<InfoPanel {...DEFAULT_PROPS} activeStep={0} />);
    expect(screen.getByText(ELECTION_STEPS[0].title)).toBeInTheDocument();
    rerender(<InfoPanel {...DEFAULT_PROPS} activeStep={1} />);
    expect(screen.getByText(ELECTION_STEPS[1].title)).toBeInTheDocument();
  });
});
