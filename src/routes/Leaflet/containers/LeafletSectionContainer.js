import { connect } from 'react-redux'
import { newPage } from '../modules/leaflet.js'

import LeafletSection from '../components/LeafletNav/LeafletSection'

const mapDispatchToProps = {
  newPage: (title, position) => newPage(title, position)

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(LeafletSection)
