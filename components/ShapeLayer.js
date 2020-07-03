import React, { useState, useEffect } from 'react'
import { Source, Layer } from 'react-map-gl'
import { json } from 'd3-request'
import { feature } from 'topojson'

const DEFAULTS = {
  fill: {
    source: 'geojson',
    type: 'fill',
    layout: {},
    paint: {
      'fill-color': '#ff0000',
      'fill-opacity': 0.4,
      'fill-outline-color': '#000000',
    },
  },
  line: {
    source: 'geojson',
    type: 'line',
    layout: {},
    paint: {
      'line-color': '#000000',
      'line-opacity': 1,
      'line-width': 2,
    },
  },
}

class ShapeLayer extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { data: [] }
  }

  componentDidMount() {
    json(this.props.src, (error, data) => {
      if (!error) {
        this.setState({ data: feature(data, data.objects.regions) })
      }
    })
  }

  render() {
    const { hidden, options = DEFAULTS.fill } = this.props
    const layers = Array.isArray(options) ? options : [options]
    const layerOptions = layers.map(({ type = 'fill', ...options }) => {
      const opacityProp = `${type}-opacity`
      const layer = { ...DEFAULTS[type], ...options }
      const paint = { ...layer.paint }
      paint[opacityProp] = hidden ? 0 : paint[opacityProp]
      layer.paint = paint
      return layer
    })

    return this.state.data ? (
      <Source type="geojson" data={this.state.data}>
        {layerOptions.map((options, i) => {
          return <Layer {...options} key={i} />
        })}
      </Source>
    ) : (
      ''
    )
  }
}

export default ShapeLayer
