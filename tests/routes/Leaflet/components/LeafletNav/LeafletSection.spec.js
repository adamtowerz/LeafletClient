import React from 'react'
import { LeafletSection } from 'routes/Leaflet/components/LeafletNav/LeafletSection.js'
import { shallow } from 'enzyme'

describe('(Component) LeafletSection', () => {
  const props = {
    title: '10.3',
    position: 0,
    pages: [
      { title: '10.3.1 Molecular Dynamics', isFavorited: false, isSelected: false },
      { title: '10.3.2 High Temperature Interactions', isFavorited: true, isSelected: true },
      { title: '10.3.3 High Pressure Systems', isFavorited: false, isSelected: false }
    ]
  }

  let _component
  beforeEach(() => {
    _component = shallow(<LeafletSection title={props.title} pages={props.pages} />)
  })

  it('Renders the title', () => {
    const title = _component.find('span')
    expect(title).to.exist
    expect(title.text()).to.match(/10\.3/)
  })

  it('Renders the chevron', () => {
    expect(_component.find('NavigationChevronRight')).to.exist
  })

  it('Right Chevron to Down Chevron when clicked', () => {
    expect(_component.find('HardwareKeyboardArrowDown')).to.not.exist
    _component.find('IconButton').simulate('click')
    expect(_component.find('NavigationChevronRight')).to.not.exist
    expect(_component.find('HardwareKeyboardArrowDown')).to.exist
  })

  it('Renders children on click', () => {
    _component.find('IconButton').simulate('click')
    expect(_component.find('li')).to.have.length(3)
  })
})
