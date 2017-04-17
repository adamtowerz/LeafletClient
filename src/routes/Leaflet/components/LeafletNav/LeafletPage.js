import React from 'react'
import PropTypes from 'prop-types'
import './LeafletNav.scss'
import IconFavorite from 'material-ui/svg-icons/action/favorite'

const styles = {
  none: {

  },
  favorite: {
    width: '18px',
    height: '18px',
    opacity: '0.56',
    display: 'inline-block'
  },
  favoriteFiller: {
    width: '18px',
    display: 'inline-block'
  }
}
/*
props: {
  title: STRING,
  isFavorite: BOOLEAN,
  isSelected: BOOLEAN
}
*/

export const LeafletPage = (props) => (
  <div>
    {props.isFavorited ? <IconFavorite style={styles.favorite} /> : <span style={styles.favoriteFiller} />}
    <span className={props.isSelected ? 'leafletPageTitleSelected' : 'leafletPageTitle'}>{props.title}</span>
  </div>
)

LeafletPage.propTypes = {
  title       : PropTypes.string.isRequired,
  isFavorited : PropTypes.bool,
  isSelected  : PropTypes.bool
}

export default LeafletPage
