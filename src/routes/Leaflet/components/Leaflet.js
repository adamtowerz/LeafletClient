import React from 'react'
import PropTypes from 'prop-types'
import '../../../styles/core.scss'
import './Leaflet.scss'

import leavesArrayCompare from '../../../helpers/leavesArrayCompare'
import TitleLeaf from './Leaf/TitleLeaf'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Avatar from 'material-ui/Avatar'
import Subheader from 'material-ui/Subheader'

import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import IconArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down'

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
  },
  drawer: {
    profile: {
      backgroundColor: '#616161',
      height: '15vh'
    },
    activeLeaflet: {
      color: '#4CAF50'
    },
    user: {
      core: {
        color: 'white',
        marginLeft: '5%',
        width: '95%',
        fontSize: '13px',
        height: '30%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      avatar: {
        width: 'auto',
        height: '7vh',
        margin: '1vh 1vw'
      },
      chevron: {
        float: 'right'
      },
      text: {
        float: 'left'
      }
    }
  }
}

export default class Leaflet extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    if (!leavesArrayCompare(this.props.leaves, nextProps.leaves)) return true
    if (this.state !== nextState) return true
    if (this.props.pageMeta !== nextProps.pageMeta) return true
    if (this.props.activePage !== nextProps.activePage) return true
    if (this.props.openDrawer !== nextProps.openDrawer) return true
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
    console.log('render functon')
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
        <Drawer
          docked={false}
          width={200}
          open={this.props.openDrawer}
          onRequestChange={(open) => this.props.setDrawer(open)}>
          <div style={styles.drawer.profile} >
            <Avatar
              src='http://atowers.info/graphics/selfie.png'
              style={styles.drawer.user.avatar}
            />
            <div style={styles.drawer.user.core}>
              <span style={styles.drawer.user.text}>ajtowers@uw.edu</span>
              <IconMenu
                iconButtonElement={<IconButton><IconArrowDropDown color={'white'} /></IconButton>}
                anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                style={styles.drawer.user.chevron}
                >
                <MenuItem primaryText='Settings' />
                <MenuItem primaryText='Help' />
                <MenuItem primaryText='Sign out' />
              </IconMenu>
            </div>
          </div>
          <div style={styles.drawer.leaflets}>
            <Subheader>My Leaflets</Subheader>
            <MenuItem style={styles.drawer.activeLeaflet}
              onTouchTap={() => this.props.setDrawer(false)}>Chemistry 102</MenuItem>
            <MenuItem onTouchTap={() => this.props.setDrawer(false)}>Biology 101</MenuItem>
          </div>
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
  activePage : PropTypes.any.isRequired, // TODO: 'any' -> enum of boolean and array
  openDrawer : PropTypes.bool.isRequired,
  setDrawer  : PropTypes.func.isRequired
}
