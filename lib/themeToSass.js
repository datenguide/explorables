const theme = require('./muiTheme.js')
const convertJs = require('json-sass').convertJs
const fs = require('fs')

// TODO wrap font names in quotes
// TODO remove unused variables
// TODO fix spacing

const sass = Object.keys(theme)
  .map((vars) => `$${vars}: ${convertJs(theme[vars])}`)
  .join(';\n')

fs.writeFile('mui-theme.scss', sass, 'UTF-8', () => {
  // eslint-disable-next-line no-console
  console.log('done')
})
