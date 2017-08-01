import LeafletRoute from 'routes/Leaflet'

describe('(Route) Leaflet', () => {
  let _route

  beforeEach(() => {
    _route = LeafletRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `counter`', () => {
    expect(_route.path).to.equal('Leaflet')
  })
})
