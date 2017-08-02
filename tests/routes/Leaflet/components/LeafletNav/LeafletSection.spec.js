import React from 'react'
import { LeafletSection } from 'routes/Leaflet/components/LeafletNav/LeafletNavSection/LeafletSection.js'
import { bindActionCreators } from 'redux'
import { shallow } from 'enzyme'

describe('(Component) LeafletSection', () => {
  let _props, _spies, _component

  beforeEach(() => {
    _spies = {}
    _props = {
      title: '10.3',
      position: 0,
      pages: [
        { title: '10.3.1 Molecular Dynamics', isFavorited: false, isSelected: false },
        { title: '10.3.2 High Temperature Interactions', isFavorited: true, isSelected: true },
        { title: '10.3.3 High Pressure Systems', isFavorited: false, isSelected: false }
      ],
      ...bindActionCreators({
        newPage : (_spies.selectPage = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _component = shallow(<LeafletSection {..._props} />)
  })

  it('Renders the title', () => {
    const title = _component.find('span')
    expect(title).to.exist
    expect(title.text()).to.match(/10\.3/)
  })

  it('Renders the chevron', () => {
    expect(_component.find('NavigationChevronRight')).to.exist
  })

  it('Renders the new page button', () => {
    expect(_component.find('ContentAdd')).to.exist
  })

  it('Right Chevron to Down Chevron when clicked', () => {
    expect(_component.find('HardwareKeyboardArrowDown')).to.not.exist
    _component.find('IconButton').first().simulate('click')
    expect(_component.find('NavigationChevronRight')).to.not.exist
    expect(_component.find('HardwareKeyboardArrowDown')).to.exist
  })

  it('Renders children on chevron click', () => {
    _component.find('IconButton').first().simulate('click')
    expect(_component.find('li')).to.have.length(3)
  })

  it('Renders children on new page button click', () => {
    _component.find('IconButton').last().simulate('click')
    expect(_component.find('NewLeafletPage')).to.exist
  })
})
