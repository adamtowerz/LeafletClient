import React from 'react'
import PropTypes from 'prop-types'
import './LeafletNav.scss'
import IconFavorite from 'material-ui/svg-icons/action/favorite'

/*
const styles = {
  icon: {
    width: '18px',
    height: '18px'
  }
}
*/
/*
props: {
  title: STRING,
  isFavorite: BOOLEAN,
  isSelected: BOOLEAN
}
*/

export const LeafletPage = (props) => (
  <div className={props.isSelected ? 'leafletPageTitleSelected' : 'leafletPageTitle'}>
    <IconFavorite className={props.isFavorited ? 'leafletPageFav' : 'leafletPageFavFiller'} />
    <span>{props.title}</span>
  </div>
)

LeafletPage.propTypes = {
  title       : PropTypes.string.isRequired,
  isFavorited : PropTypes.bool,
  isSelected  : PropTypes.bool
}

export default LeafletPage
