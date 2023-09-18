import { lazy } from 'react';

export const SettingsPageAsync = lazy(() => {
    return import('./SettingsPage');
});
