import React from 'react'
import PropTypes from 'prop-types'
import '../NotebookNav.scss'
import { arrayCompare } from '../../../../../helpers'
import IconFavorite from 'material-ui/svg-icons/action/favorite'

export class NavLeaflet extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    if (this.props.title !== nextProps.title) return true
    if (this.props.isFavorited !== nextProps.isFavorited) return true
    if (this.props.activeLeaflet !== nextProps.activeLeaflet) return true
    return false
  }

  render () {
    let className = this.props.activeLeaflet && arrayCompare(this.props.position, this.props.activeLeaflet)
      ? 'leafletTitleSelected' : 'leafletTitle'
    return (
      <div className={className}>
        <IconFavorite className={this.props.isFavorited ? 'leafletFav' : 'leafletFavFiller'}
          onTouchTap={() => this.props.toggleLeafletFavorite(this.props.position)} />
        <span onTouchTap={() => {
          if (this.props.position !== this.props.activeLeaflet) this.props.selectLeaflet(this.props.position)
        }}>{this.props.title}</span>
      </div>
    )
  }
}

NavLeaflet.propTypes = {
  title       : PropTypes.string.isRequired,
  isFavorited : PropTypes.bool,
  selectLeaflet  : PropTypes.func.isRequired,
  position    : PropTypes.array.isRequired,
  activeLeaflet  : PropTypes.any,
  toggleLeafletFavorite : PropTypes.func.isRequired
}

export default NavLeaflet
