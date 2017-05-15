import React from 'react'
import './LeafletNav.scss'
import PropTypes from 'prop-types'
import LeafletSection from '../../containers/LeafletSectionContainer'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

const styles = {
  search: {
    width: '80%'
  },
  div: {
    paddingLeft: '0.5em',
    position: 'fixed',
    display: 'block',
    width: '20%'
  }
}

export class LeafletNav extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      sectionTitle: ''
    }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  attemptCreateSection = () => {
    if (this.state.sectionTitle !== undefined && this.state.sectionTitle !== '') {
      if (this.state.sectionTitle.length <= 32) {
        this.props.newSection(this.state.sectionTitle)
        this.handleClose()
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
    return <div style={styles.div}>
      <TextField style={styles.search}
        hintText='Search Leaflet'
      />
      {this.props.sections.map((section, index) =>
        <LeafletSection key={index} title={section.title}
          pages={section.pages} position={index} />
      )}
      <FlatButton onClick={() => this.handleOpen()} label='New Section' fullWidth primary />
      <Dialog
        actions={[
          <FlatButton
            label='Cancel'
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            label='Create Section'
            primary
            onTouchTap={this.attemptCreateSection}
          />
        ]}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        <div>
          Name the new Section
          <br />
          <TextField style={styles.newSectionName}
            hintText={this.state.pageTitle ? '' : 'Section Name'}
            ref={(input) => { this.newPageInput = input }}
            errorText={this.state.errorText}
            onChange={(e, nv) => {
              this.setState({ sectionTitle: nv })
            }}
          />
        </div>
      </Dialog>
    </div>
  }
}

LeafletNav.propTypes = {
  sections   : PropTypes.array.isRequired,
  newSection : PropTypes.func.isRequired
}

export default LeafletNav
