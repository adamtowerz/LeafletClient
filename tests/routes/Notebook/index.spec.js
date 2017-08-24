import NotebookRoute from 'routes/Notebook'

describe('(Route) Notebook', () => {
  let _route

  beforeEach(() => {
    _route = NotebookRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `Notebook`', () => {
    expect(_route.path).to.equal('Notebook')
  })
})
