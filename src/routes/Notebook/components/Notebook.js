import React from 'react'
import PropTypes from 'prop-types'
import '../../../styles/core.scss'
import './Notebook.scss'

import leavesArrayCompare from '../../../helpers/leavesArrayCompare'
import TitleLeaf from './Leaf/TitleLeaf'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import DraggableList from 'react-draggable-list'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import NotebookNav from './NotebookNav/NotebookNavContainer.js'
import Leaf from './Leaf/LeafContainer.js'
import Logo from '../../../../public/leafBlack.svg'

const styles = {
  addLeafFAB: {
    position: 'fixed',
    right: '10vw',
    bottom: '10vh'
  },
  noLeaves: {
    img: {
      color: 'black',
      fill: 'black'
    }
  }
}

export default class Notebook extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    if (!leavesArrayCompare(this.props.leaves, nextProps.leaves)) return true
    if (this.state !== nextState) return true
    if (this.props.leafletMeta !== nextProps.leafletMeta) return true
    if (this.props.activeLeaflet !== nextProps.activeLeaflet) return true
    return false
  }

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

    let leavesList = []
    if (this.props.leaves) {
      leavesList = this.props.leaves.map((e, i) => {
        e.key = i
        return e
      })
    }

    return (
      <div>
        <NotebookNav />

        <div className={'leaflet__contentCol'}>
          {this.props.activeLeaflet
            ? <TitleLeaf pageMeta={this.props.leafletMeta} />
          : null}
          <DraggableList
            itemKey='key'
            template={Leaf}
            commonProps={this.props.leafletMeta}
            list={leavesList}
            onMoveEnd={(list, item, oldIndex, newIndex) => {
              this.props.sortLeavesList(list)
            }}
            />
          {this.props.activeLeaflet && leavesList.length === 0 &&
            <div key={1} className={'leaflet__noLeaves'}>
                Add Some Leaves!
            </div>
          }

          <CSSTransitionGroup
            transitionName='noPage'
            transitionEnterTimeout={0}
            transitionLeaveTimeout={150}>
            {!this.props.activeLeaflet
                ? <div key={0} className={'notebook__noPage'}>
                  <img style={styles.noLeaves.img} className={'notebook__noPage__img'} src={Logo} />
                  Open a Leaflet!
              </div>
              : null}
          </CSSTransitionGroup>
        </div>

        {typeof this.props.activeLeaflet === 'object'
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
      </div>
    )
  }
}

Notebook.propTypes = {
  leafletMeta   : PropTypes.object.isRequired,
  leaves     : PropTypes.array.isRequired,
  newLeaf    : PropTypes.func.isRequired,
  sortLeavesList : PropTypes.func.isRequired,
  activeLeaflet : PropTypes.any // TODO: 'any' -> enum of boolean and array
}
