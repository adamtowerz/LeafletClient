import { connect } from 'react-redux'
import { newSection } from '../modules/leaflet'
import LeafletNav from '../components/LeafletNav'

const mapDispatchToProps = {
  newSection : (title) => newSection(title)
}

const mapStateToProps = (state) => ({
  sections: state.leaflet.sections
})

export default connect(mapStateToProps, mapDispatchToProps)(LeafletNav)
