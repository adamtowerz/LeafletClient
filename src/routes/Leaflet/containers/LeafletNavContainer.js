import { connect } from 'react-redux'
import LeafletNav from '../components/LeafletNav'

const mapDispatchToProps = {

}

const mapStateToProps = (state) => ({
  sections: state.leaflet.sections
})

export default connect(mapStateToProps, mapDispatchToProps)(LeafletNav)
