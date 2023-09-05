import React from 'react';
import { createRoot } from 'react-dom/client';
import '@/app/styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { StoreProvider } from '@/app/providers/StoreProvider';

import App from './app/App';
import '@/shared/config/i18n/i18n';

// as Element
// говорим TS что элемент точно есть
// Добавлено в React 18
const root = createRoot(document.getElementById('root') as Element);
root.render(
    <BrowserRouter>
        <StoreProvider>
            <React.StrictMode>
                <ErrorBoundary>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </ErrorBoundary>
            </React.StrictMode>
        </StoreProvider>
    </BrowserRouter>,
);
