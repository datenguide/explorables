import React from 'react'
import MapDemo from '../components/MapDemo'

export default {
  title: 'Map',
  component: Map,
}

export const map = () => (
  <MapDemo mapboxApiAccessToken={process.env.STORYBOOK_MAPBOX_TOKEN} />
)
