import getMuiTheme from 'material-ui/styles/getMuiTheme'

const leafletTheme = getMuiTheme({
  palette: {
    primary1Color: '#4CAF50',
    /*
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white
    */
    canvasColor: '#ffffff'
  },
  appBar: {
    height: 50
  }
})

export default leafletTheme
