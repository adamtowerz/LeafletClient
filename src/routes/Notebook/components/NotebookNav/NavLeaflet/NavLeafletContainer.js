import { connect } from 'react-redux'
import NavLeaflet from './NavLeaflet.js'
import { selectLeaflet, toggleLeafletFavorite } from '../../../notebookReducer.js'
import { activeLeafletSelector } from '../../../selectors/index'

const mapDispatchToProps = {
  selectLeaflet: (position) => selectLeaflet(position),
  toggleLeafletFavorite: (position) => toggleLeafletFavorite(position)
}

const mapStateToProps = (state) => ({
  activeLeaflet: activeLeafletSelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(NavLeaflet)
