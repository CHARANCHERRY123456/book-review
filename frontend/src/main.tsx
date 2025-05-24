import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './styles/globals.css';
import { logger } from './logger';

// Initialize logger
logger.init();


// Log application start
logger.info('Application started', { timestamp: new Date().toISOString() });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);