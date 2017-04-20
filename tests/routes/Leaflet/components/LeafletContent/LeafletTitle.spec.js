import React from 'react'
import { LeafletTitle } from 'routes/Leaflet/components/LeafletContent/LeafletTitle.js'
import { shallow } from 'enzyme'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

describe('(Component) LeafletTitle', () => {
  const props = { title: '10.3.1 Molecular Dynamics' }

  let _component
  beforeEach(() => {
    // the div is because: https://github.com/airbnb/enzyme/issues/570
    _component = shallow(
      <LeafletTitle title={props.title} />
    )
  })

  it('Should construct a leaf', () => {
    const leaf = _component.find('Leaf')
    expect(leaf).to.exist
  })

  it('Should pass correct title as prop', () => {
    expect(_component.props().leafData.title).to.match(/10\.3\.1 Molecular Dynamics/)
  })

  it('Should have \'title\' as leafID', () => {
    expect(_component.props().leafID).to.match(/title/)
  })
  /*
  it('throw props', () => {
    throw _component.props()
  })

  it('throw', () => {
    throw _component.debug()
  })
  */
})
