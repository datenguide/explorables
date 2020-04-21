import React, { useEffect, useState } from 'react'

import { ThemeProvider } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import theme from '../muiTheme'
import RegionSelect from './RegionSelect'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import regions from '@datenguide/metadata'
import Box from '@material-ui/core/Box'

const NUTS_LEVELS = [2, 3, 5, 8]

const NUTS_DESCRIPTIONS = [
  'Bundesland',
  'Regierungsbezirk',
  'Kreis',
  'Gemeinde',
]

const getNutsHierarchy = (region) => {
  if (!region) {
    return []
  }
  const nutsHierarchy = []
  const regionId = region.value
  let i = 0
  while (NUTS_LEVELS[i] <= regionId.length) {
    const levelId = regionId.substring(0, NUTS_LEVELS[i])
    nutsHierarchy.push({
      id: levelId,
      nuts: i + 1,
      name: regions[levelId] && regions[levelId].name,
      nutsDescription: NUTS_DESCRIPTIONS[i],
    })
    i++
  }
  return nutsHierarchy
}

const RegionKeys = () => {
  const [region, setRegion] = useState(null)
  const [nutsHierarchy, setNutsHierarchy] = useState([])

  useEffect(() => {
    const nutsHierarchy = getNutsHierarchy(region)
    setNutsHierarchy(nutsHierarchy)
  }, [region])

  const handleSelect = (region) => {
    setRegion(region)
  }

  const renderNutsHierarchy = (n) => {
    const result = []
    for (let i = 0; i < n.length; i++) {
      const part = n[i]
      result.push(
        <Card key={part.id} component="span" m={1}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {part.id}
            </Typography>
            <Typography variant="h5" component="h2">
              {part.name}
            </Typography>
            <Typography color="textSecondary">
              NUTS Level {part.nuts}
            </Typography>
            <Typography variant="body2" component="p">
              {part.nutsDescription}
            </Typography>
          </CardContent>
        </Card>
      )
      if (i < n.length - 1) {
        result.push(<ArrowForwardIosIcon />)
      }
    }
    return result
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
          <Box
            style={{
              display: 'flex',
              backgroundColor: '#c3e5f1',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              height: '200px',
            }}
          >
            {renderNutsHierarchy(nutsHierarchy)}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default RegionKeys
