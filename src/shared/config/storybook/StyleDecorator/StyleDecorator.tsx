import { StoryFn } from '@storybook/react';
// eslint-disable-next-line fsdm/layer-imports
import '@/app/styles/index.scss';

export const StyleDecorator = (Story: StoryFn) => { return <Story />; };
