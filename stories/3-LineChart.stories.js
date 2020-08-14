import React from 'react'
import { LineChart } from '../components/LineChart'

import rawData from '../data/district_count.json'

export default {
  title: 'LineChart',
  component: LineChart,
}

export const lineChart = () => {
  return (
    <LineChart
      data={rawData.data}
      yAccessor={(e) => e.value}
      xAccessor={(e) => e.year}
      aspectRatio={0.9}
    />
  )
}
