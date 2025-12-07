import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from './button';
import { expect } from 'storybook/test';

const meta: Meta<Button> = {
  component: Button,
  title: 'Button',
  argTypes: {
    press: { action: 'press' },
    severity: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'info'],
    },
  },
  args: {
    label: 'Moin',
    severity: 'primary',
  },
};
export default meta;

type Story = StoryObj<Button>;

export const Primary: Story = {
  args: {
    label: 'Teste mich',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Teste mich',
    severity: 'secondary',
  },
};

export const Danger: Story = {
  args: {
    label: 'Teste mich',
    severity: 'danger',
  },
};

export const Info: Story = {
  args: {
    label: 'Teste mich',
    severity: 'info',
  },
};

export const Heading: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/Moin/gi)).toBeTruthy();
  },
};
