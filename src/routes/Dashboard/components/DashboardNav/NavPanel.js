import React from 'react'
import PropTypes from 'prop-types'
import './NavPanel.scss'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'

const styles = {
  container: {
    display: 'inline-block',
    width: '25%',
    height: '100%',
    padding: '1em',
    color: '#424242'
  },
  search: {
    container: {
      padding: '0 0.2em'
    },
    textField: {
      display: 'inline-block',
      width: '100%'
    }
  },
  filter: {
    icon: {
      verticalAlign: 'middle'
    }
  }
}

export const NavPanel = (props) => (
  <div style={styles.container}>
    <Paper style={styles.search.container} children={
      <div>
        <TextField style={styles.search.textField} hintText='Search' />
      </div>
    } />
    <div className='filter__item'>
      <i style={styles.filter.icon} className='material-icons'>access_time</i> Recent
    </div>
    <div className='filter__item'>
      <i style={styles.filter.icon} className='material-icons'>favorite</i> Favorites
    </div>
    <div className='filter__item'>
      <i style={styles.filter.icon} className='material-icons'>share</i> Shared With Me
    </div>
  </div>
)

NavPanel.propTypes = {
  dank: PropTypes.bool
}

export default NavPanel
