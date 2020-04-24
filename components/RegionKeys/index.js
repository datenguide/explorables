import React, { useState } from 'react'

import { ThemeProvider } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import theme from '../muiTheme'
import RegionSelect from './RegionSelect'
import Grid from '@material-ui/core/Grid'
import RegionCards from './RegionCards'

const RegionKeys = () => {
  const [region, setRegion] = useState(null)

  const handleSelect = (region) => {
    setRegion(region)
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>Suche nach einer Region:</Typography>
        </Grid>
        <Grid item xs={12}>
          <RegionSelect onSelect={handleSelect} />
        </Grid>
        <Grid item xs={12}>
          <RegionCards region={region} />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default RegionKeys
