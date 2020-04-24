import React, { useState } from 'react'

import { ThemeProvider } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import theme from '../../lib/muiTheme'
import RegionSelect from './RegionSelect'
import Grid from '@material-ui/core/Grid'
import { getNutsHierarchy, withNutsSpacing } from '../../lib/nutsFormatting'

import styles from './styles.scss'

const RegionKeys = () => {
  const [region, setRegion] = useState(null)

  const handleSelect = (region) => {
    setRegion(region)
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={3} className={styles.root}>
        <Grid item xs={12}>
          <RegionSelect onSelect={handleSelect} />
        </Grid>
        <Grid item xs={4} />
        {withNutsSpacing(region).map((part) => (
          <Grid key={part} xs={2}>
            <Typography variant="h1" classes={{ h1: styles.title }}>
              {part}
            </Typography>
          </Grid>
        ))}
        {getNutsHierarchy(region).map((parts, index) => (
          <>
            <Grid item xs={4}>
              <div className={styles.nutsHierarchyLabel}>
                <Typography variant="h6">{parts.name}</Typography>
                <Typography variant="caption">
                  {parts.nutsDescription}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={2 + index * 2}>
              <div className={styles.nutsHierarchyId}>
                <Typography variant="h5">{parts.id}</Typography>
              </div>
            </Grid>
            <Grid item xs={12 - index} />
          </>
        ))}
      </Grid>
    </ThemeProvider>
  )
}

export default RegionKeys
