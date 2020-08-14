const fs = require('fs')
const sass = require('node-sass')
const sassUtils = require('node-sass-utils')(sass)

const theme = require('./muiTheme.js')

const transformVariables = (prefix, obj, unit, result) => {
  Object.keys(obj).map((key) => {
    const subKeys = obj[key]
    if (subKeys instanceof Object) {
      result = transformVariables(`${prefix}-${key}`, subKeys, unit, result)
    } else {
      result =
        result +
        `${prefix}-${key}: ${sassUtils.sassString(
          sassUtils.castToSass(subKeys)
        )}${unit};\n`
    }
  })
  return result
}

const breakpoints = transformVariables(
  '$breakpoints',
  theme.breakpoints.values,
  'px',
  ''
)
const direction = `$direction: ${theme.direction};\n`
const palette = transformVariables('$palette', theme.palette, '', '')
const shadows = transformVariables('$shadows', { ...theme.shadows }, '', '')
const typography = transformVariables('$typography', theme.typography, '', '')
const spacing = transformVariables(
  '$spacing',
  Array(21)
    .fill()
    .map((v, i) => i)
    .map((spacing) => theme.spacing(spacing)),
  'px',
  ''
)
const shape = transformVariables('$shape', theme.shape, 'px', '')
const transitions = transformVariables(
  '$transitions',
  theme.transitions,
  '',
  ''
)
const zIndex = transformVariables('$z-index', theme.zIndex, '', '')

const result = breakpoints
  .concat('\n')
  .concat(direction)
  .concat('\n')
  .concat(palette)
  .concat('\n')
  .concat(shadows)
  .concat('\n')
  .concat(typography)
  .concat('\n')
  .concat(spacing)
  .concat('\n')
  .concat(shape)
  .concat('\n')
  .concat(transitions)
  .concat('\n')
  .concat(zIndex)

fs.writeFile('mui-variables.scss', result, 'UTF-8', () => {
  // eslint-disable-next-line no-console
  console.log('done')
})
