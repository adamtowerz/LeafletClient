import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import FilterButton from './FilterButtonContainer'

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
  }
}

class NavPanel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return <div style={styles.container}>
      <Paper style={styles.search.container} children={
        <div>
          <TextField style={styles.search.textField} hintText='Search' />
        </div>
      } />
      <FilterButton type='Recent' icon='access_time' />
      <FilterButton type='Favorites' icon='favorite' />
      <FilterButton type='Shared With Me' icon='share' />
    </div>
  }
}

NavPanel.propTypes = {

}

export default NavPanel
