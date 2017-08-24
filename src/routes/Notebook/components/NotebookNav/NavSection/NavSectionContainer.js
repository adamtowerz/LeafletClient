import { connect } from 'react-redux'
import { newLeaflet } from '../../../notebookReducer.js'

import NavSection from './NavSection'

const mapDispatchToProps = {
  newLeaflet: (title, position) => newLeaflet(title, position)

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(NavSection)
