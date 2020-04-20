import React from 'react'
import Map from '../components/map'

export default {
  title: 'Map',
  component: Map,
}

export const map = () => (
  <Map mapboxApiAccessToken={process.env.STORYBOOK_MAPBOX_TOKEN} />
)
