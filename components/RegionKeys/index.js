import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import FlipNumbers from 'react-flip-numbers'

import { ThemeProvider } from '@material-ui/core/styles'

import theme from '../../lib/styles/muiTheme'
import { getNutsHierarchy, getNutsComponents } from '../../lib/nutsFormatting'

import styles from './styles.scss'
import RegionSelectStatic from './RegionSelectStatic'

const RegionKeys = ({ flip }) => {
  const [region, setRegion] = useState(null)

  const handleSelect = (region) => {
    setRegion(region)
  }

  const getNutsHierarchySpan = (index) =>
    [
      styles.nutsHierarchyIdSpan8,
      styles.nutsHierarchyIdSpan5,
      styles.nutsHierarchyIdSpan3,
      styles.nutsHierarchyIdSpan2,
    ][index]

  const nutsComponents = getNutsComponents(region)

  const getNutsLabel = (nuts) => {
    return nuts !== 4 ? (
      <span className={styles.nutsLabel}>NUTS {nuts}</span>
    ) : null
  }

  const getSegment = (segment) => {
    return flip ? (
      <FlipNumbers
        height={75}
        width={50}
        color="black"
        background="#e5e5e5"
        play
        numbers={segment || 0}
      />
    ) : (
      segment
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.root}>
        <RegionSelectStatic
          className={styles.regionSelect}
          onSelect={handleSelect}
        />
        <div className={styles.regionKey}>
          <span
            className={clsx(
              styles.regionKeySegment,
              styles.regionKeySegmentSpan2
            )}
          >
            {getSegment(nutsComponents[0])}
          </span>
          <span className={styles.regionKeySegmentSeparator} />
          <span
            className={clsx(
              styles.regionKeySegment,
              styles.regionKeySegmentSpan1
            )}
          >
            {getSegment(nutsComponents[1])}
          </span>
          <span className={styles.regionKeySegmentSeparator} />
          <span
            className={clsx(
              styles.regionKeySegment,
              styles.regionKeySegmentSpan2
            )}
          >
            {getSegment(nutsComponents[2])}
          </span>
          <span className={styles.regionKeySegmentSeparator} />
          <span
            className={clsx(
              styles.regionKeySegment,
              styles.regionKeySegmentSpan3
            )}
          >
            {getSegment(nutsComponents[3])}
          </span>
        </div>
        <>
          {region && region.value !== '00000000' && (
            <div className={styles.nutsHierarchy}>
              {getNutsHierarchy(region).map((part, index) => (
                <div className={styles.nutsHierarchyRow} key={part.id}>
                  <div className={styles.nutsHierarchyLabel}>
                    <span className={styles.nutsHierarchyLabelName}>
                      {part.name} &middot;&nbsp;
                    </span>
                    <span> {part.nutsDescription}</span>
                  </div>
                  <div className={clsx(styles.nutsHierarchyIdWrapper)}>
                    <span
                      className={clsx(
                        styles.nutsHierarchyIdBorder,
                        getNutsHierarchySpan(index)
                      )}
                    >
                      <span className={styles.nutsHierarchyId}> {part.id}</span>
                    </span>

                    {getNutsLabel(part.nuts)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      </div>
    </ThemeProvider>
  )
}

RegionKeys.propTypes = {
  flip: PropTypes.bool,
}

RegionKeys.defaultProps = {
  flip: false,
}

export default RegionKeys
