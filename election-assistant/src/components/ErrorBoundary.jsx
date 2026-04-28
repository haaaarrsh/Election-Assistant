import { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Catches render errors in the child tree and displays a graceful fallback.
 * Prevents a crashed sub-tree from taking down the entire app.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // In production this would forward to Sentry / GA4 / logging service
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, info.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            role="alert"
            style={{
              padding: '2rem',
              textAlign: 'center',
              color: 'var(--text-muted)',
            }}
          >
            <h2>Something went wrong.</h2>
            <p>Please refresh the page and try again.</p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};
