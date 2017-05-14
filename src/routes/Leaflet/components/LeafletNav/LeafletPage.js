import React from 'react'
import PropTypes from 'prop-types'
import './LeafletNav.scss'
import { arrayCompare } from '../../../../helpers'
import IconFavorite from 'material-ui/svg-icons/action/favorite'

export class LeafletPage extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    if (this.props.title !== nextProps.title) return true
    if (this.props.isFavorited !== nextProps.isFavorited) return true
    if (this.props.activePage !== nextProps.activePage) return true
    return false
  }

  render () {
    let className = arrayCompare(this.props.position, this.props.activePage)
      ? 'leafletPageTitleSelected' : 'leafletPageTitle'
    return (
      <div className={className}>
        <IconFavorite className={this.props.isFavorited ? 'leafletPageFav' : 'leafletPageFavFiller'}
          onTouchTap={() => this.props.togglePageFavorite(this.props.position)} />
        <span onTouchTap={() => {
          if (this.props.position !== this.props.activePage) this.props.selectPage(this.props.position)
        }}>{this.props.title}</span>
      </div>
    )
  }
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
