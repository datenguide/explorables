import React from 'react'
import RegionKeys from '../components/RegionKeys'
import { withKnobs, boolean } from '@storybook/addon-knobs'

export default {
  title: 'Region Keys',
  component: RegionKeys,
  decorators: [withKnobs],
}

export const regionKeys = () => (
  <RegionKeys flip={boolean('Flip Numbers', false)} />
)
