import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TimelineStep } from '../components/TimelineStep';
import { ELECTION_STEPS } from '../data/electionData';

const STEP = ELECTION_STEPS[0];
const DEFAULT_PROPS = {
  step: STEP,
  index: 0,
  isActive: false,
  isCompleted: false,
  infoPanelId: 'test-panel',
  onClick: vi.fn(),
};

describe('TimelineStep', () => {
  beforeEach(() => {
    DEFAULT_PROPS.onClick.mockClear();
  });

  it('renders the step title', () => {
    render(<TimelineStep {...DEFAULT_PROPS} />);
    expect(screen.getByText(STEP.title)).toBeInTheDocument();
  });

  it('renders the step date', () => {
    render(<TimelineStep {...DEFAULT_PROPS} />);
    expect(screen.getByText(STEP.date)).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    render(<TimelineStep {...DEFAULT_PROPS} />);
    await user.click(screen.getByRole('button'));
    expect(DEFAULT_PROPS.onClick).toHaveBeenCalledOnce();
  });

  it('has aria-current="step" when active', () => {
    render(<TimelineStep {...DEFAULT_PROPS} isActive={true} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-current', 'step');
  });

  it('does not have aria-current when inactive', () => {
    render(<TimelineStep {...DEFAULT_PROPS} isActive={false} />);
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-current');
  });

  it('shows the description paragraph when active', () => {
    render(<TimelineStep {...DEFAULT_PROPS} isActive={true} />);
    expect(screen.getByText(STEP.description)).toBeInTheDocument();
  });

  it('hides the description paragraph when inactive', () => {
    render(<TimelineStep {...DEFAULT_PROPS} isActive={false} />);
    expect(screen.queryByText(STEP.description)).not.toBeInTheDocument();
  });

  it('has aria-expanded=true when active', () => {
    render(<TimelineStep {...DEFAULT_PROPS} isActive={true} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('has aria-controls pointing to infoPanelId', () => {
    render(<TimelineStep {...DEFAULT_PROPS} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-controls', 'test-panel');
  });

  it('includes "completed" in aria-label when completed', () => {
    render(<TimelineStep {...DEFAULT_PROPS} isCompleted={true} />);
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      expect.stringContaining('completed'),
    );
  });

  it('is wrapped in a list item', () => {
    render(
      <ul>
        <TimelineStep {...DEFAULT_PROPS} />
      </ul>,
    );
    expect(screen.getByRole('listitem')).toBeInTheDocument();
  });
});
