import { connect } from 'react-redux'
import { newSection } from '../../leafletReducer.js'
import LeafletNav from './index'

const mapDispatchToProps = {
  newSection : (title) => newSection(title)
}

const mapStateToProps = (state) => ({
  sections: state.leaflet.sections
})

export default connect(mapStateToProps, mapDispatchToProps)(LeafletNav)
