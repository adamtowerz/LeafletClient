import React from 'react'
import PropTypes from 'prop-types'
import '../../../styles/core.scss'
import _greedy from '../../../styles/greedy.js'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Drawer from 'material-ui/Drawer'

import DraggableList from 'react-draggable-list'

import LeafletNav from '../containers/LeafletNavContainer.js'
import Leaf from '../containers/LeafContainer.js'
import Logo from '../../../../public/logoPath.svg'

const styles = {
  navCol: {
    width: '20%',
    height: '100%',
    display: 'inline-block',
    float: 'left'
  },
  contentCol: {
    paddingTop: '0.5em',
    width: '60%',
    display: 'inline-block'
  },
  dockCol: {
    width: '20%',
    height: '100%',
    display: 'inline-block',
    float: 'right'
  },
  addLeafFAB: {
    position: 'fixed',
    right: '10vw',
    bottom: '10vh'
  },
  noLeaves: {
    opacity: '0.36',
    textAlign: 'center',
    width: '60%',
    marginLeft: '20%',
    fontSize: '2em',
    color: 'black',
    fill: 'black'
  },
  noLeavesImg: {
    display: 'block',
    width: '30%',
    marginLeft: '35%',
    paddingBottom: '1em'
  }
}

export default class Leaflet extends React.Component {
  state = {
    openNewLeafDialog: false
  }

  handleOpenNewLeafDialog = () => {
    this.setState({ openNewLeafDialog: true })
  }

  handleCloseNewLeafDialog = () => {
    this.setState({ openNewLeafDialog: false })
  }

  render () {
    const actions = [
      <FlatButton
        label='Cancel'
        primary
        onTouchTap={this.handleCloseNewLeafDialog}
      />,
      <FlatButton
        label='rawText'
        primary
        onTouchTap={() => this.props.newLeaf('rawText')}
      />,
      <FlatButton
        label='code'
        primary
        onTouchTap={() => this.props.newLeaf('code')}
      />
    ]

    let titleLeaf
    let leavesList = []
    if (this.props.leaves) {
      titleLeaf = this.props.leaves[0]
      leavesList = this.props.leaves.slice(1)
    }

    return (
      <div style={_greedy}>
        <div style={styles.navCol}>
          <LeafletNav />
        </div>
        <div style={styles.contentCol}>
          {titleLeaf
            ? <Leaf item={titleLeaf} commonProps={this.props.pageMeta} />
          : null}
          <DraggableList
            itemKey='leafID'
            template={Leaf}
            commonProps={this.props.pageMeta}
            list={leavesList}
            onMoveEnd={(list, item, oldIndex, newIndex) => {
              list.unshift(titleLeaf)
              this.props.sortLeavesList(list)
            }}
            />
        </div>
        {this.props.activePage && this.props.leaves.length <= 1
           ? <div style={styles.noLeaves}>
             <img src={Logo} />
             Add Some Leaves!
           </div> : null}
        <div style={styles.dockCol} />
        {typeof this.props.activePage === 'object'
          ? <FloatingActionButton style={styles.addLeafFAB} onTouchTap={this.handleOpenNewLeafDialog}>
            <i className='material-icons titleActionIcon'>add</i>
          </FloatingActionButton> : null}
        <Dialog
          title='New Leaf'
          actions={actions}
          modal={false}
          open={this.state.openNewLeafDialog}
          onRequestClose={this.handleCloseNewLeafDialog}
          >
            Create new Leaves Dialog
        </Dialog>
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}>
          <div>Side Drawer</div>
        </Drawer>
      </div>
    )
  }
}

Leaflet.propTypes = {
  pageMeta   : PropTypes.object.isRequired,
  leaves     : PropTypes.array.isRequired,
  newLeaf    : PropTypes.func.isRequired,
  sortLeavesList : PropTypes.func.isRequired,
  activePage : PropTypes.any.isRequired // TODO: 'any' -> enum of boolean and array
}
