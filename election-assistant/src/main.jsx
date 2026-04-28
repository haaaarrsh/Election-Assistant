import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from './components/ErrorBoundary.jsx'
import './index.css'

// Lazy-load App so the initial JS bundle is smaller
const App = lazy(() => import('./App.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: 'var(--text-muted)' }}>
          Loading…
        </div>
      }>
        <App />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>,
)
