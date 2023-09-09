import { StoryFn } from '@storybook/react';
import { Suspense } from 'react';

export const SuspenceDecorator = (Story: StoryFn) => {
    return (
        <Suspense>
            <Story />
        </Suspense>
    );
};
