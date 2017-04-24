import React from 'react'
import PropTypes from 'prop-types'
import './LeafletNav.scss'
import IconFavorite from 'material-ui/svg-icons/action/favorite'

export const LeafletPage = (props) => {
  return (
    <div className={(props.position === props.activePage) ? 'leafletPageTitleSelected' : 'leafletPageTitle'}>
      <IconFavorite className={props.isFavorited ? 'leafletPageFav' : 'leafletPageFavFiller'}
        onTouchTap={() => props.togglePageFavorite(props.position)} />
      <span onTouchTap={() => props.selectPage(props.position)}>{props.title}</span>
    </div>
  )
}

LeafletPage.propTypes = {
  title       : PropTypes.string.isRequired,
  isFavorited : PropTypes.bool,
  selectPage  : PropTypes.func.isRequired,
  position    : PropTypes.array.isRequired,
  activePage  : PropTypes.any.isRequired,
  togglePageFavorite : PropTypes.func.isRequired
}

export default LeafletPage
