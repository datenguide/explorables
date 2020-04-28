import React, { useState } from 'react'
// import FlipNumbers from 'react-flip-numbers'

import { ThemeProvider } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import theme from '../../lib/styles/muiTheme'
import RegionSelect from './RegionSelect'
import { getNutsHierarchy, getNutsComponents } from '../../lib/nutsFormatting'

import styles from './styles.scss'

// {/*<FlipNumbers*/}
// {/*  height={40}*/}
// {/*  width={40}*/}
// {/*  color="red"*/}
// {/*  background="white"*/}
// {/*  play*/}
// {/*  perspective={100}*/}
// {/*  numbers={part}*/}
// {/*/>*/}

const RegionKeys = () => {
  const [region, setRegion] = useState(null)

  const handleSelect = (region) => {
    setRegion(region)
  }

  return (
    <ThemeProvider theme={theme}>
      <RegionSelect onSelect={handleSelect} />
      {getNutsComponents(region).map((part) => part)}
      {getNutsHierarchy(region).map((parts, index) => (
        <>
          <div className={styles.nutsHierarchyLabel}>
            <Typography variant="h6">{parts.name}</Typography>
            <Typography variant="caption">{parts.nutsDescription}</Typography>
          </div>
          <div className={styles.nutsHierarchyId}>
            <Typography variant="h5">{parts.id}</Typography>
          </div>
        </>
      ))}
    </ThemeProvider>
  )
}

export default RegionKeys
