module.exports = (layer, componentName) => {
    return `import type { Meta, StoryObj } from '@storybook/react';

import { ${componentName} } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
    title: '${layer}/${componentName}',
    component: ${componentName},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {},
};`;
};
