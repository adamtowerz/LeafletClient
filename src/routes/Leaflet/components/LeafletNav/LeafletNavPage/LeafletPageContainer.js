import { connect } from 'react-redux'
import LeafletPage from './LeafletPage.js'
import { selectPage, togglePageFavorite } from '../../../leafletReducer.js'
import { activePageSelector } from '../../../selectors/index'

const mapDispatchToProps = {
  selectPage: (position) => selectPage(position),
  togglePageFavorite: (position) => togglePageFavorite(position)
}

const mapStateToProps = (state) => ({
  activePage: activePageSelector(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(LeafletPage)
