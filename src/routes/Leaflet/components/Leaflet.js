import React from 'react'
import PropTypes from 'prop-types'
import '../../../styles/core.scss'
import './Leaflet.scss'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Avatar from 'material-ui/Avatar'

import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import IconArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down'

import DraggableList from 'react-draggable-list'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

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
    marginLeft: '20%',
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
  },
  noPage: {
    core: {
      position: 'absolute',
      opacity: '0.3',
      width: '50%',
      marginLeft: '25%',
      marginTop: '5vh',
      backgroundColor: '#757575',
      borderRadius: '24px',
      height: '60vh',
      fontSize: '2em',
      fontWeight: '500',
      textAlign: 'center',
      zIndex: '0'
    },
    img: {
      display: 'block',
      width: '15vw',
      margin: 'auto',
      paddingTop: '10vh',
      paddingBottom: '5vh'
    }
  },
  drawer: {
    profile: {
      backgroundColor: '#616161',
      height: '15vh'
    },
    leaflets: {

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
      <div>
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
        {this.props.activePage && leavesList.length === 0 && <div key={1} style={styles.noLeaves}>
          <img src={Logo} />
          Add Some Leaves!
        </div>}

        <CSSTransitionGroup
          transitionName='noPage'
          transitionEnterTimeout={0}
          transitionLeaveTimeout={150}>
          {!this.props.activePage
            ? <div key={0} style={styles.noPage.core}>
              <img style={styles.noPage.img} src={Logo} />
            Open a Page!
          </div>
          : null}
        </CSSTransitionGroup>

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
          open={this.props.openDrawer}
          onRequestChange={(open) => this.props.setDrawer(open)}>
          <div style={styles.drawer.profile} >
            <Avatar
              src='http://atowers.info/graphics/selfie.png'
              size={60}
              style={{ margin: 10 }}
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
