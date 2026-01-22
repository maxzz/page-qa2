import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/0-all/0-app';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
