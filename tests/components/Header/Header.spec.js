import React from 'react'
import { Header } from 'components/Header/Header'
import { shallow } from 'enzyme'
// import leafletTheme from '../../src/theme'

describe('(Component) Header', () => {
  let _wrapper, _props
  // _wrapper = shallow(<Header />)
  beforeEach(() => {
    _props = {
      title: 'xddd',
      path: '/'
    }

    _wrapper = shallow(<Header {..._props} />)
  })

  describe('Appbar', () => {
    it('Should render an appbar', () => {
      const appbar = _wrapper.find('AppBar')
      expect(appbar).to.exist
    })
  })
})
