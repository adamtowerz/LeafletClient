import { connect } from 'react-redux'
import LeafletPage from '../components/LeafletNav/LeafletPage.js'
import { selectPage, togglePageFavorite } from '../modules/leaflet.js'
import { activePageSelector } from './selectors'

const mapDispatchToProps = {
  selectPage: (position) => selectPage(position),
  togglePageFavorite: (position) => togglePageFavorite(position)
}

const mapStateToProps = (state) => ({
  activePage: activePageSelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(LeafletPage)
