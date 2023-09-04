import { lazy } from 'react';

export const AdminPanelPageAsync = lazy(() => {
    return import('./AdminPanelPage');
});
