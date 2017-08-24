import { injectReducer } from '../../store/reducers'
import { setDashboardContent } from './dashboardReducer'
import axios from 'axios'

export default (store) => ({
  path : 'dashboard',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Dashboard = require('./components/DashboardContainer').default
      const reducer = require('./dashboardReducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'dashboard', reducer })

      axios.post('/graphql', {
        query: `
          {
            profile(id:0) {
              notebooks {
                title
                author {
                  username
                }
                color
              }
            }
          }
           `
      }).then(response => {
        store.dispatch(setDashboardContent(response.data.data.profile.notebooks))
      })

      /*  Return getComponent   */
      cb(null, Dashboard)

    /* Webpack named bundle   */
    }, 'dashboard')
  }
})
