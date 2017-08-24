import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'Notebook',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Notebook = require('./components/NotebookContainer').default
      const reducer = require('./notebookReducer').default

      /*  Add the reducer to the store on key 'leaflet'  */
      injectReducer(store, { key: 'notebook', reducer })

      /*  Return getComponent   */
      cb(null, Notebook)

    /* Webpack named bundle   */
    }, 'notebook')
  }
})
