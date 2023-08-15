import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
    title: 'shared/Modal',
    component: Modal,
    // argTypes: {
    //     backgroundColor: { control: 'color' },
    // },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        isOpen: true,
        children: 'Loren inpum text AASDFAJSD; KGJHA; DKJGHALKJDGLKAHDK;',
    },
};

export const Dark: Story = {
    args: {
        isOpen: true,
        children: 'Loren inpum text AASDFAJSD; KGJHA; DKJGHALKJDGLKAHDK;',
    },
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
