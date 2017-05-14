import React from 'react'
import { LeafletNav } from 'routes/Leaflet/components/LeafletNav/LeafletNav.js'
import { shallow } from 'enzyme'

describe('(Component) LeafletNav', () => {
  const props = {
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
    ]
  }

  let _component
  beforeEach(() => {
    _component = shallow(<LeafletNav sections={props.sections} />)
  })

  it('Renders the searchbar', () => {
    const title = _component.find('TextField')
    expect(title).to.exist
  })

  it('Renders correct amount of children', () => {
    expect(_component.find('Connect(LeafletSection)')).to.have.length(props.sections.length)
  })
})
