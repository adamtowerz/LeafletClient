import { connect } from 'react-redux'
import Header from '../components/Header/Header.js'
import { openDrawerSelector } from '../components/Header/HeaderSelectors'
import { setDrawer } from '../components/Header/HeaderReducer'

export const leafletTitleSelector = state => {
  return state.leaflet ? state.leaflet.title : 'Leaflet'
}

export const locationPathSelector = state => {
  return state.location ? state.location.pathname : '/'
}

const mapDispatchToProps = {
  setDrawer: (value) => setDrawer(value)
}

const mapStateToProps = (state) => ({
  title: leafletTitleSelector(state),
  path: locationPathSelector(state),
  openDrawer : openDrawerSelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
