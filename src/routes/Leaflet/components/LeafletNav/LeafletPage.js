import React from 'react'
import PropTypes from 'prop-types'
import './LeafletNav.scss'
import IconFavorite from 'material-ui/svg-icons/action/favorite'

export const LeafletPage = (props) => {
  return (
    <div className={(props.position === props.activePage) ? 'leafletPageTitleSelected' : 'leafletPageTitle'}
      onTouchTap={() => props.selectPage(props.position)}>
      <IconFavorite className={props.isFavorited ? 'leafletPageFav' : 'leafletPageFavFiller'} />
      <span>{props.title}</span>
    </div>
  )
}

LeafletPage.propTypes = {
  title       : PropTypes.string.isRequired,
  isFavorited : PropTypes.bool,
  selectPage  : PropTypes.func.isRequired,
  position    : PropTypes.array.isRequired,
  activePage  : PropTypes.any.isRequired
}

export default LeafletPage
