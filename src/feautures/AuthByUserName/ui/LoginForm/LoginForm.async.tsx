import { FC, lazy } from 'react';
import { LoginFormProps } from './LoginForm';

export const LoginFormAsync = lazy<FC<LoginFormProps>>(
    () => {
        return new Promise((resolve) => {
        // @ts-ignore
            setTimeout(() => { return resolve(import('./LoginForm')); }, 1500);
        });
    },
);
