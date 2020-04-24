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
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <RegionSelect onSelect={handleSelect} />
        </Grid>
        <Grid item xs={12}>
          {/* <RegionCards region={region} /> */}
          <Typography variant="h1" classes={{ h1: styles.title }}>
            {withNutsSpacing(region).map((part) => (
              <span className={styles.idPart} key={part}>
                {part}
              </span>
            ))}
          </Typography>
        </Grid>
        {getNutsHierarchy(region).map((parts, index) => (
          <Grid key={parts.id} item xs={3}>
            <div className={styles.nutsHierarchy}>
              <Typography variant="h5">{parts.id}</Typography>
              <Typography variant="h6">{parts.name}</Typography>
              <Typography variant="caption">NUTS {parts.nuts}: </Typography>
              <Typography variant="caption">{parts.nutsDescription}</Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  )
}

export default RegionKeys
