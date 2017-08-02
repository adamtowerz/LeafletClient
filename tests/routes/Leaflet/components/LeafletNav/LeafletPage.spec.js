import React from 'react'
import { LeafletPage } from 'routes/Leaflet/components/LeafletNav/LeafletNavPage/LeafletPage.js'
import { bindActionCreators } from 'redux'
import { shallow } from 'enzyme'

describe('(Component) LeafletPage', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      title : '10.3.1 Molecular Dynamics',
      isFavorited : false,
      position : [1, 2],
      activePage : [1, 3],
      ...bindActionCreators({
        selectPage : (_spies.selectPage = sinon.spy()),
        togglePageFavorite   : (_spies.togglePageFavorite = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<LeafletPage {..._props} />)
  })

  it('Should only bold when is selected', () => {
    expect(_wrapper.find('.leafletPageTitleSelected')).to.not.exist
    expect(_wrapper.find('.leafletPageTitle')).to.exist
    let _propsSelect = _props
    _propsSelect.position = _props.activePage
    expect(shallow(<LeafletPage {..._propsSelect} />).find('.leafletPageTitleSelected')).to.exist
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

    it('Should dispatch a `selectPage` action when clicked', () => {
      _spies.selectPage.should.have.not.been.called
      _title.simulate('touchTap')
      // _spies.dispatch.should.have.been.called
      _spies.selectPage.should.have.been.called
    })
  })

  describe('A favorite button...', () => {
    let _button

    beforeEach(() => {
      _button = _wrapper.find('ActionFavorite')
    })

    it('Should only shows heart when favorited', () => {
      expect(_wrapper.find('ActionFavorite').hasClass('leafletPageFav')).to.be.false
      expect(_wrapper.find('ActionFavorite').hasClass('leafletPageFavFiller')).to.be.true
      const _propsFav = { ..._props, isFavorited: true }
      const favComponent = shallow(<LeafletPage {..._propsFav} />)
      expect(favComponent.find('ActionFavorite').hasClass('leafletPageFav')).to.be.true
    })

    it('Should dispatch a `togglePageFavorite` action when clicked', () => {
      _spies.dispatch.should.have.not.been.called
      _button.simulate('touchTap')
      // _spies.dispatch.should.have.been.called
      _spies.togglePageFavorite.should.have.been.called
    })
  })
})
