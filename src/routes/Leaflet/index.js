import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'Leaflet',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Leaflet = require('./containers/LeafletContainer').default
      const reducer = require('./modules/leaflet').default

      /*  Add the reducer to the store on key 'leaflet'  */
      injectReducer(store, { key: 'leaflet', reducer })

      /*  Return getComponent   */
      cb(null, Leaflet)

    /* Webpack named bundle   */
    }, 'leaflet')
  }
})
