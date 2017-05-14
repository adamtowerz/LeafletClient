import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import IconClose from 'material-ui/svg-icons/navigation/close'
import IconCheck from 'material-ui/svg-icons/navigation/check'

const styles = {
  newPage: {
    paddingLeft: 'calc(1.5em - 10px)',
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '1em'
  },
  newPageTextField: {
    width: '60%'
  },
  newPageActionIcons: {
    padding: '0',
    height: '24px',
    width: '24px',
    marginTop: '10px'
  }
}

export class NewLeafletPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errorText: ''
    }
  }

  componentDidMount () {
    this.newPageInput.focus()
  }

  createPage () {
    if (this.state.pageTitle !== undefined && this.state.pageTitle !== '') {
      if (this.state.pageTitle.length <= 32) {
        this.props.newPage(this.state.pageTitle)
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
      <IconButton onClick={() => this.props.cancel()} style={styles.newPageActionIcons} >
        <IconClose className='leafletSection__newPage__iconClose' />
      </IconButton>
      <TextField
        ref={(input) => { this.newPageInput = input }}
        onChange={(e, nv) => {
          this.setState({ pageTitle: nv })
        }}
        value={this.pageTitle}
        hintText={this.state.pageTitle ? '' : 'New Page Name'}
        // hintText not disappearing when content exists, so hardcoding for now
        errorText={this.state.errorText}
        style={styles.newPageTextField}
        />
      <IconButton onClick={() => this.createPage()} style={styles.newPageActionIcons} >
        <IconCheck className='leafletSection__newPage__iconCheck' />
      </IconButton>
    </div>
  }
}

NewLeafletPage.propTypes = {
  newPage : PropTypes.func.isRequired,
  cancel  : PropTypes.func.isRequired
}

export default NewLeafletPage
