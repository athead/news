import { lazy } from 'react';

export const MainPageAsync = lazy(
    () => {
        return new Promise((resolve) => {
        // @ts-ignore
            setTimeout(() => { return resolve(import('./MainPage')); }, 1500);
        });
    },
);
