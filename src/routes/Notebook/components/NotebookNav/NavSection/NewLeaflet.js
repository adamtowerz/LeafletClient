import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import IconClose from 'material-ui/svg-icons/navigation/close'
import IconCheck from 'material-ui/svg-icons/navigation/check'

const styles = {
  newLeaflet: {
    paddingLeft: 'calc(1.5em - 10px)',
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '1em'
  },
  newLeafletTextField: {
    width: '60%',
    fontSize: '1rem'
  },
  newLeafletActionIcons: {
    padding: '0',
    height: '24px',
    width: '24px',
    marginTop: '10px'
  }
}

export class NewLeaflet extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errorText: ''
    }
  }

  componentDidMount () {
    this.newLeafletInput.focus()
  }

  createPage () {
    if (this.state.leafletTitle !== undefined && this.state.leafletTitle !== '') {
      if (this.state.leafletTitle.length <= 32) {
        this.props.newLeaflet(this.state.leafletTitle)
      } else {
        this.setState((prevState) => ({
          errorText: 'Cannot exceed 32 characters!'
        }))
      }
    } else {
      this.setState((prevState) => ({
        errorText: 'Cannot be empty!'
      }))
    }
  }

  render () {
    return <div style={styles.newPage}>
      <IconButton onClick={() => this.props.cancel()} style={styles.newLeafletActionIcons} >
        <IconClose className='leafletSection__newPage__iconClose' />
      </IconButton>
      <TextField
        ref={(input) => { this.newLeafletInput = input }}
        onChange={(e, nv) => {
          this.setState({ leafletTitle: nv })
        }}
        value={this.leafletTitle}
        hintText={this.state.leafletTitle ? '' : 'New Leaflet'}
        // hintText not disappearing when content exists, so hardcoding for now
        errorText={this.state.errorText}
        style={styles.newLeafletTextField}
        />
      <IconButton onClick={() => this.createPage()} style={styles.newLeafletActionIcons} >
        <IconCheck className='leafletSection__newLeaflet__iconCheck' />
      </IconButton>
    </div>
  }
}

NewLeaflet.propTypes = {
  newLeaflet : PropTypes.func.isRequired,
  cancel  : PropTypes.func.isRequired
}

export default NewLeaflet
