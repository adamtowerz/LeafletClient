import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import NavigationMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz'

const styles = {
  title: {
    cursor: 'pointer'
  },
  appbar: {
    position: 'fixed'
  }
}

export const Header = (props) => (
  <div>
    <AppBar
      style={styles.appbar}
      title={<span style={styles.title}>{props.title}</span>}
      iconElementLeft={<IconButton><NavigationMenu /></IconButton>}
      iconElementRight={
        <IconMenu
          iconButtonElement={<IconButton><NavigationMoreHoriz /></IconButton>}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem>
            <IndexLink to='/' activeClassName='route--active'>
              Home
            </IndexLink>
          </MenuItem>
          <MenuItem>
            <Link to='/counter' activeClassName='route--active'>
              Counter
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to='/leaflet' activeClassName='route--active'>
              Leaflet
            </Link>
          </MenuItem>
        </IconMenu>
      }
    />
  </div>
)

Header.propTypes = {
  title : PropTypes.string.isRequired
}

export default Header
