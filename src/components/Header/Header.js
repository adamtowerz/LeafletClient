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
  },
  authButtons: {
    marginTop: '7px'
  }
}

export const Header = (props) => {
  let leftChild = <span />
  let rightChild = <span />
  switch (props.path) {
    case '/':
      /* rightChild = <div style={styles.authButtons}>
        <RaisedButton label='Signup' style={styles.signup} />
        <FlatButton label='Login' style={styles.login} />
      </div> */
      break
    case '/Dashboard':
    case '/Leaflet':
      leftChild = <IconButton onTouchTap={(e) => {
        console.log('drawer')
        props.setDrawer(!props.openDrawer)
      }}>
        <NavigationMenu />
      </IconButton>
      rightChild = <IconMenu
        iconButtonElement={<IconButton><NavigationMoreHoriz /></IconButton>}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem>
          <IndexLink to='/home' activeClassName='route--active'>
            Home
          </IndexLink>
        </MenuItem>
        <MenuItem>
          <Link to='/counter' activeClassName='route--active'>
            Counter
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to='/Leaflet' activeClassName='route--active'>
            Leaflet
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to='/Dashboard' activeClassName='route--active'>
            Dashboard
          </Link>
        </MenuItem>
      </IconMenu>
      break
    default:
      leftChild = null
      rightChild = null
  }

  return (<div>
    <AppBar
      style={styles.appbar}
      title={<span style={styles.title}>{props.title}</span>}
      iconElementLeft={leftChild}
      iconElementRight={rightChild}
    />
  </div>)
}

Header.propTypes = {
  title : PropTypes.string.isRequired,
  path : PropTypes.string.isRequired,
  openDrawer : PropTypes.bool.isRequired,
  setDrawer : PropTypes.func.isRequired
}

export default Header
