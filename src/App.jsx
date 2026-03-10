import React from 'react';
import { AppProviders } from './providers/AppProviders';
import AppRoutes from './routes';
import './index.css';

export default function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}
