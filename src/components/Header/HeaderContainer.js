import { connect } from 'react-redux'
import Header from './Header.js'
import { openDrawerSelector } from './HeaderSelectors'
import { setDrawer } from './HeaderReducer'

export const headerTitleSelector = state => {
  return state.header ? state.header.title : 'Notebook'
}

export const locationPathSelector = state => {
  return state.location ? state.location.pathname : '/'
}

const mapDispatchToProps = {
  setDrawer: (value) => setDrawer(value)
}

const mapStateToProps = (state) => ({
  title: headerTitleSelector(state),
  path: locationPathSelector(state),
  openDrawer : openDrawerSelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
