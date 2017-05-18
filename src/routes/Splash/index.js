import { injectReducer } from '../../store/reducers'

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Splash = require('./containers/SplashContainer').default
      const reducer = require('./modules/splash').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'splash', reducer })

      /*  Return getComponent   */
      cb(null, Splash)

    /* Webpack named bundle   */
    }, 'splash')
  }
})
