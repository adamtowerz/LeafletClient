import React from 'react'
import { bindActionCreators } from 'redux'
import { shallow } from 'enzyme'
import NavLeaflet from '../../../../../src/routes/Notebook/components/NotebookNav/NavLeaflet/NavLeaflet'

describe('(Component) NavLeaflet', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      title : '10.3.1 Molecular Dynamics',
      isFavorited : false,
      position : [1, 2],
      activeLeaflet : [1, 3],
      ...bindActionCreators({
        selectLeaflet : (_spies.selectLeaflet = sinon.spy()),
        toggleLeafletFavorite   : (_spies.toggleLeafletFavorite = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<NavLeaflet {..._props} />)
  })

  it('Should only bold when is selected', () => {
    expect(_wrapper.find('.leafletTitleSelected')).to.not.exist
    expect(_wrapper.find('.leafletTitle')).to.exist
    let _propsSelect = _props
    _propsSelect.position = _props.activeLeaflet
    expect(shallow(<NavLeaflet {..._propsSelect} />).find('.leafletTitleSelected')).to.exist
  })

  describe('A title bar...', () => {
    let _title

    beforeEach(() => {
      _title = _wrapper.find('span')
    })

    it('Should renders the title', () => {
      expect(_title).to.exist
      expect(_title.text()).to.match(/10\.3\.1 Molecular Dynamics/)
    })

    it('Should dispatch a `selectLeaflet` action when clicked', () => {
      _spies.selectLeaflet.should.have.not.been.called
      _title.simulate('touchTap')
      // _spies.dispatch.should.have.been.called
      _spies.selectLeaflet.should.have.been.called
    })
  })

  describe('A favorite button...', () => {
    let _button

    beforeEach(() => {
      _button = _wrapper.find('ActionFavorite')
    })

    it('Should only shows heart when favorited', () => {
      expect(_wrapper.find('ActionFavorite').hasClass('leafletFav')).to.be.false
      expect(_wrapper.find('ActionFavorite').hasClass('leafletFavFiller')).to.be.true
      const _propsFav = { ..._props, isFavorited: true }
      const favComponent = shallow(<NavLeaflet {..._propsFav} />)
      expect(favComponent.find('ActionFavorite').hasClass('leafletFav')).to.be.true
    })

    it('Should dispatch a `toggleLeafletFavorite` action when clicked', () => {
      _spies.dispatch.should.have.not.been.called
      _button.simulate('touchTap')
      // _spies.dispatch.should.have.been.called
      _spies.toggleLeafletFavorite.should.have.been.called
    })
  })
})
