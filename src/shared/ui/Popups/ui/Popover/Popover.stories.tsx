import type { Meta, StoryObj } from '@storybook/react';

import { Popover } from './Popover';
import { Button } from '../../../Button';

const meta: Meta<typeof Popover> = {
    title: 'shared/Popover',
    component: Popover,
    decorators: [
        (Story) => {
            return (
                <div style={{ padding: 100 }}>
                    <Story />
                </div>
            );
        },
    ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const TopRight: Story = {
    args: { children: 'children', direction: 'bottom right', trigger: <Button>Открыть</Button> },
};
