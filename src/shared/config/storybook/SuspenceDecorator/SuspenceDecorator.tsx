import { StoryFn } from '@storybook/react';
import '@/app/styles/index.scss';
import { Suspense } from 'react';

export const SuspenceDecorator = (Story: StoryFn) => {
    return (
        <Suspense>
            <Story />
        </Suspense>
    );
};
