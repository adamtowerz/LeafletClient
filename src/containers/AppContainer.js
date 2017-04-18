import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory, Router } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux'

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  componentDidMount () {
    injectTapEventPlugin()
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory} children={routes} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
