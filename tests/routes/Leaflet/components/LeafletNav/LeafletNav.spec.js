import React from 'react'
import { LeafletNav } from 'routes/Leaflet/components/LeafletNav/LeafletNav.js'
import { bindActionCreators } from 'redux'
import { shallow } from 'enzyme'

describe('(Component) LeafletNav', () => {
  let _props, _spies, _component

  beforeEach(() => {
    _spies = {}
    _props = {
      sections: [
        { title: '10.3',
          pages: [
            { title: '10.3.1 Molecular Dynamics', isFavorited: false, isSelected: false },
            { title: '10.3.2 High Temperature Interactions', isFavorited: true, isSelected: true },
            { title: '10.3.3 High Pressure Systems', isFavorited: false, isSelected: false }
          ]
        },
        { title: '10.4',
          pages: [
            { title: 'pepe', isFavorited: false, isSelected: false }
          ]
        }
      ],
      ...bindActionCreators({
        newSection : (_spies.newSection = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _component = shallow(<LeafletNav {..._props} />)
  })

  it('Renders the searchbar', () => {
    const title = _component.find('TextField')
    expect(title).to.exist
  })

  it('Renders correct amount of children', () => {
    expect(_component.find('Connect(LeafletSection)')).to.have.length(_props.sections.length)
  })

  describe('The New Section button...', () => {
    it('Renders The New Section button', () => {
      expect(_component.find('FlatButton')).to.exist
    })

    it('Renders the modal on click', () => {
      _component.find('FlatButton').simulate('click')
      expect(_component.state().open).to.be.true
    })
  })
})
