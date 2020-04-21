import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
})

export default theme
