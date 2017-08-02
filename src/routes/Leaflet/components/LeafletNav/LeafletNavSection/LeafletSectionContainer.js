import { connect } from 'react-redux'
import { newPage } from '../../../leafletReducer.js'

import LeafletSection from './LeafletSection'

const mapDispatchToProps = {
  newPage: (title, position) => newPage(title, position)

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(LeafletSection)
