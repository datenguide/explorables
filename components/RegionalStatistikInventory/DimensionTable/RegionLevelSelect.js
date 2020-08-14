import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'

import styles from './styles.scss'

const RegionLevelSelect = ({ onChange, options, value, className }) => {
  const handleChange = (event) => {
    onChange(Number(event.target.value))
  }

  return (
    <FormControl component="fieldset">
      <h4 className={styles.subtitle}>Regionale Tiefen</h4>
      <RadioGroup value={value} onChange={handleChange}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}

export default RegionLevelSelect
