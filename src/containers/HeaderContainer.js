import { connect } from 'react-redux'
import Header from '../components/Header/Header.js'

export const leafletTitleSelector = state => {
  return state.leaflet ? state.leaflet.title : 'Leaflet'
}

export const locationPathSelector = state => {
  return state.location ? state.location.pathname : '/'
}

const mapDispatchToProps = {

}

const mapStateToProps = (state) => ({
  title: leafletTitleSelector(state),
  path: locationPathSelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
