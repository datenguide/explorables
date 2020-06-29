import React, { useState } from 'react'

import RegionLevelSelect from './RegionLevelSelect'
import DimensionCombinations from '../DimensionCombinations'
import schema from '../../../data/schema.json'

import styles from './styles.scss'

const levelToLevelOption = (l) => {
  switch (l) {
    case '0':
      return { label: 'DG - Deutschland', value: 0 }
    case '1':
      return { label: 'NUTS 1 - Bundesländer', value: 1 }
    case '2':
      return { label: 'NUTS 2 - Regierungsbezirke', value: 2 }
    case '3':
      return { label: 'NUTS 3 - Kreise', value: 3 }
    case '4':
      return { label: 'LAU - Gemeinden', value: 4 }
    default:
      return null
  }
}

const DimensionTable = ({ statistic, measure, dimensions }) => {
  const [regionLevel, setRegionLevel] = useState(0)

  const handleChange = (value) => {
    setRegionLevel(value)
  }

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>
        {`${measure} - ${
          schema[statistic] && schema[statistic].measures[measure].title_de
        }`}
      </h2>
      <div className={styles.measurewrapper}>
        <RegionLevelSelect
          value={regionLevel}
          onChange={handleChange}
          options={Object.keys(dimensions)
            .filter((l) => dimensions[l].length !== 0)
            .map((l) => levelToLevelOption(l))}
          className={styles.regionlevelselect}
        />
        <div className={styles.combinationswrapper}>
          <h4 className={styles.subtitle}>Merkmalskombinationen</h4>
          <DimensionCombinations dimensions={dimensions[regionLevel]} />
        </div>
      </div>
    </div>
  )
}

export default DimensionTable
