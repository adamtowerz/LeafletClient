import React from 'react'
import { Header } from 'components/Header/Header'
import { mount } from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import leafletTheme from '../../src/theme'

describe('(Component) Header', () => {
  let _wrapper
  // _wrapper = shallow(<Header />)
  beforeEach(() => {
    _wrapper = mount(<MuiThemeProvider><Header /></MuiThemeProvider>)
  })

  describe('Appbar', () => {
    it('Should render an appbar', () => {
      const appbar = _wrapper.find('AppBar')
      expect(appbar).to.exist
    })

    it('Should contain an IconMenu', () => {
      const iconmenu = _wrapper.find('IconMenu')
      expect(iconmenu).to.exist
    })
  })
})
