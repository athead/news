import { lazy } from 'react';

export const AboutPageAsync = lazy(
    () => {
        return new Promise((resolve) => {
        // @ts-ignore
            setTimeout(() => { return resolve(import('./AboutPage')); }, 1500);
        });
    },
);
