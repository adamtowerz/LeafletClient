import React from 'react'
import Logo from '../../../../public/leafGradient.svg'
import RaisedButton from 'material-ui/RaisedButton'

// import PropTypes from 'prop-types'
let styles = {
  core: {
    margin: '0 auto',
    padding: '1em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: '10vw',
    fontWeight: '100',
    lineHeight: '1em'
  },
  subtitle: {
    fontSize: '5vw',
    fontWeight: '400'
  },
  logo: {
    height: '100%',
    width: '100%'
  },
  left: {
    width: '30%',
    textAlign: 'center',
    display: 'inline-block'
  },
  right: {
    width: '50%',
    textAlign: 'center',
    display: 'inline-block'
  }
}

export const Splash = (props) => (
  <div style={styles.core} >
    <div style={styles.left}>
      <img style={styles.logo} src={Logo} />
    </div>
    <div style={styles.right}>
      <div style={styles.title}>
        Leaflet
      </div>
      <div style={styles.subtitle}>
        Notetaking, Better
      </div>
      <RaisedButton href='/Dashboard' primary label={'Login with Google'} />

    </div>
  </div>
)

Splash.propTypes = {

}

export default Splash
