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

import Drawer from 'material-ui/Drawer'
import Avatar from 'material-ui/Avatar'
import Subheader from 'material-ui/Subheader'

import IconArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down'

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
    <Drawer
      docked={false}
      width={200}
      open={props.openDrawer}
      onRequestChange={(open) => {
        props.setDrawer(open)
      }}>
      <div style={styles.drawer.profile} >
        <Avatar
          src='http://atowers.info/graphics/selfie.png'
          style={styles.drawer.user.avatar}
        />
        <div style={styles.drawer.user.core}>
          <span style={styles.drawer.user.text}>ajtowers@uw.edu</span>
          <IconMenu
            iconButtonElement={<IconButton><IconArrowDropDown color={'white'} /></IconButton>}
            anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            style={styles.drawer.user.chevron}
          >
            <MenuItem primaryText='Settings' />
            <MenuItem primaryText='Help' />
            <MenuItem primaryText='Sign out' />
          </IconMenu>
        </div>
      </div>
      <div style={styles.drawer.leaflets}>
        <Subheader>My Leaflets</Subheader>
        <MenuItem style={styles.drawer.activeLeaflet}
          onTouchTap={() => props.setDrawer(false)}>Chemistry 102</MenuItem>
        <MenuItem onTouchTap={() => props.setDrawer(false)}>Biology 101</MenuItem>
      </div>
    </Drawer>
  </div>)
}

Header.propTypes = {
  title : PropTypes.string.isRequired,
  path : PropTypes.string.isRequired,
  openDrawer : PropTypes.bool.isRequired,
  setDrawer : PropTypes.func.isRequired
}

export default Header
