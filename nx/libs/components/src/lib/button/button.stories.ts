import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from './button';
import { expect } from 'storybook/test';

const meta: Meta<Button> = {
  component: Button,
  title: 'Button',
};
export default meta;

type Story = StoryObj<Button>;

export const Primary: Story = {
  args: {
    label: 'Teste mich',
  },
};

export const Heading: Story = {
  args: {
    label: 'Moin',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Moin/gi)).toBeTruthy();
  },
};
