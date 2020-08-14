const createMuiTheme = require('@material-ui/core').createMuiTheme

const theme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
})

module.exports = theme
