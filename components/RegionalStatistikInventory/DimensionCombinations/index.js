import React from 'react'
import _ from 'lodash'

import styles from './styles.scss'

const DimensionCombinations = ({ dimensions }) => {
  let allDimensions = []

  dimensions.forEach((m) => {
    m.forEach((d) => {
      if (!allDimensions.includes(d)) {
        allDimensions.push(d)
      }
    })
  })
  allDimensions = allDimensions.sort()

  const sortedDimensions = _.sortBy(dimensions, (d) => {
    const lead = d.length
    const ordinal = allDimensions
      .map((ad) => (d.includes(ad) ? '1' : '0'))
      .join('')
    return lead * (allDimensions.length + 1) + ordinal
  }).reverse()

  return (
    <div className={styles.root}>
      {sortedDimensions.every((a) => a.length === 0) && (
        <h4 className={styles.emptystate}>Keine</h4>
      )}
      <div className={styles.headingrow}>
        {allDimensions.map((d) => (
          <div key={d} className={styles.headingrowcell}>
            {d}
          </div>
        ))}
      </div>
      {sortedDimensions.map((m, index) => (
        <div key={index} className={styles.dimensionrow}>
          {allDimensions.map((d) => (
            <div key={d} className={styles.dimensionrowcell}>
              <span
                className={m.includes(d) ? styles.filleddot : styles.emptydot}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default DimensionCombinations
