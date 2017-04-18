import React from 'react'
import { LeafletTitle } from 'routes/Leaflet/components/LeafletContent/LeafletTitle.js'
import { shallow } from 'enzyme'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

describe('(Component) LeafletTitle', () => {
  const props = { title: '10.3.1 Molecular Dynamics', isFavorited: false }
  const t = true

  let _component
  beforeEach(() => {
    _component = shallow(
      <LeafletTitle title={props.title} isFavorited={props.isFavorited} />
    )
  })

  it('Should renders the title', () => {
    const title = _component.find('span')
    expect(title).to.exist
    expect(title.text()).to.match(/10\.3\.1 Molecular Dynamics/)
  })

  it('Should have a green heart when favorited', () => {
    expect(_component.find({ color: '#4CAF50' })).to.not.exist
    const favComponent = shallow(<LeafletTitle title={props.title} isFavorited={t} />)
    expect(favComponent.find({ color: '#4CAF50' })).to.exist
  })
})
