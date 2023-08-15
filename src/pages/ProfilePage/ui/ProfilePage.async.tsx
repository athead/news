import { lazy } from 'react';

export const ProfilePageAsync = lazy(
    () => {
        return new Promise((resolve) => {
        // @ts-ignore
            setTimeout(() => { return resolve(import('./ProfilePage')); }, 1500);
        });
    },
);
