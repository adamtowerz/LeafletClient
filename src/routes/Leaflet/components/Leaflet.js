import React from 'react'
import PropTypes from 'prop-types'
import '../../../styles/core.scss'
import './Leaflet.scss'

import leavesArrayCompare from '../../../helpers/leavesArrayCompare'
import TitleLeaf from './Leaf/TitleLeaf'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import DraggableList from 'react-draggable-list'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import LeafletNav from '../containers/LeafletNavContainer.js'
import Leaf from '../containers/LeafContainer.js'
import Logo from '../../../../public/logoPath.svg'

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

export default class Leaflet extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    if (!leavesArrayCompare(this.props.leaves, nextProps.leaves)) return true
    if (this.state !== nextState) return true
    if (this.props.pageMeta !== nextProps.pageMeta) return true
    if (this.props.activePage !== nextProps.activePage) return true
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
        <LeafletNav />

        <div className={'leaflet__contentCol'}>
          {this.props.activePage
            ? <TitleLeaf pageMeta={this.props.pageMeta} />
          : null}
          <DraggableList
            itemKey='key'
            template={Leaf}
            commonProps={this.props.pageMeta}
            list={leavesList}
            onMoveEnd={(list, item, oldIndex, newIndex) => {
              this.props.sortLeavesList(list)
            }}
            />
          {this.props.activePage && leavesList.length === 0 &&
            <div key={1} className={'leaflet__noLeaves'}>
                Add Some Leaves!
            </div>
          }

          <CSSTransitionGroup
            transitionName='noPage'
            transitionEnterTimeout={0}
            transitionLeaveTimeout={150}>
            {!this.props.activePage
                ? <div key={0} className={'leaflet__noPage'}>
                  <img style={styles.noLeaves.img} className={'leaflet__noPage__img'} src={Logo} />
                  Open a Page!
              </div>
              : null}
          </CSSTransitionGroup>
        </div>

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
