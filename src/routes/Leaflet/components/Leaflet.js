import React from 'react'
import PropTypes from 'prop-types'
import '../../../styles/core.scss'
import _greedy from '../../../styles/greedy.js'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import LeafletNav from '../containers/LeafletNavContainer.js'
import Leaf from '../containers/LeafContainer.js'

const styles = {
  navCol: {
    width: '20%',
    height: '100%',
    display: 'inline-block',
    float: 'left'
  },
  contentCol: {
    width: '60%',
    height: '100%',
    display: 'inline-block'
  },
  dockCol: {
    width: '20%',
    height: '100%',
    display: 'inline-block',
    float: 'right'
  },
  addLeafFAB: {
    position: 'absolute',
    right: '10vw',
    bottom: '10vh'
  }
}

export default class Leaflet extends React.Component {
  state = {
    open: false
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render () {
    const actions = [
      <FlatButton
        label='Cancel'
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label='Title'
        primary
        onTouchTap={() => this.props.newLeaf()}
      />,
      <FlatButton
        label='Imgur'
        primary
        onTouchTap={() => this.props.newLeaf('imgur')}
      />
    ]

    return (
      <div style={_greedy}>
        <span style={styles.navCol}>
          <LeafletNav />
        </span>
        <span style={styles.contentCol}>
          {(this.props.leaves.length > 0) ? this.props.leaves.map((leaf, i) => (
            <Leaf key={i} leafID={leaf.leafID} />
          )) : null}
        </span>
        <span style={styles.dockCol} />
        {typeof this.props.activePage === 'object'
          ? <FloatingActionButton style={styles.addLeafFAB} onTouchTap={this.handleOpen}>
            <i className='material-icons titleActionIcon'>add</i>
          </FloatingActionButton> : null}
        <Dialog
          title='New Leaf'
          actions={actions}
          modal
          open={this.state.open}
          >
            Create new Leaves Dialog
          </Dialog>
      </div>
    )
  }
}

Leaflet.propTypes = {
  leaves     : PropTypes.array.isRequired,
  newLeaf    : PropTypes.func.isRequired,
  activePage : PropTypes.any.isRequired // TODO: 'any' -> enum of boolean and array
}
