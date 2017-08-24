import { connect } from 'react-redux'
import { newSection } from '../../notebookReducer.js'
import NotebookNav from './index'

const mapDispatchToProps = {
  newSection : (title) => newSection(title)
}

const mapStateToProps = (state) => ({
  sections: state.notebook.sections
})

export default connect(mapStateToProps, mapDispatchToProps)(NotebookNav)
