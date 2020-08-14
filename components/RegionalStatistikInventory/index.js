import React, { useState } from 'react'
import inventory from '../../data/inventory.json'
import StatisticSelect from './StatisticSelect'

import styles from './styles.scss'
import DimensionTable from './DimensionTable'

const RegionalStatistikInventory = () => {
  const [measures, setMeasures] = useState([])
  const [statistic, setStatistic] = useState('')

  const handleStatisticSelect = (option) => {
    setStatistic(option.value)
    setMeasures(inventory[option.value].measures)
  }

  return (
    <div className={styles.root}>
      <StatisticSelect
        onSelect={handleStatisticSelect}
        className={styles.statisticsselect}
      />

      {Object.keys(measures).map((measure, index) => (
        <DimensionTable
          key={index}
          statistic={statistic}
          measure={measure}
          dimensions={measures[measure]}
        />
      ))}
    </div>
  )
}

export default RegionalStatistikInventory
