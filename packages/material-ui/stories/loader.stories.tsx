import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Loader, LoaderProps } from '@blb-ventures/material-ui/components/loaders/loader';

export default {
  title: 'Example/Loader',
  component: Loader,
} as Meta;

const Template: Story<LoaderProps> = args => <Loader {...args} />;

export const Fixed = Template.bind({});
Fixed.args = {
  position: 'fixed',
};
