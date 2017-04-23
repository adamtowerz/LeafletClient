import { connect } from 'react-redux'
import Header from '../components/Header/Header.js'

export const leafletTitleSelector = state => state.leaflet.title

const mapDispatchToProps = {

}

const mapStateToProps = (state) => ({
  title: leafletTitleSelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
