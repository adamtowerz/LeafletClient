import React from 'react'
// import { CSSTransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types'
// import FirstChild from '../../../../components/FirstChild'
import './Leaf.scss'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import { fetchTemplate, fetchActions } from './fetch.js'

const styles = {
  centerArea: {
    height: '100%',
    width: '91%',
    margin: '0 2%',
    display: 'inline-block'
  },
  centerCard: {
    height: '100%',
    width: '100%',
    display: 'block',
    zIndex: '2',
    position: 'relative',
    borderLeft: ''
  },
  trough: {
    position: 'relative',
    height: '50px',
    width: '100%',
    display: 'block',
    zIndex: '1',
    backgroundColor: '#424242',
    top: '0px',
    borderRadius: '0px',
    borderBottomRightRadius: '2px',
    borderBottomLeftRadius: '2px',
    transitionProperty: 'top',
    transitionDuration: '.5s',
    transitionTimingFunction: 'cubic-bezier(0, 1, 0.5, 1)'
  },
  troughHidden: {
    top: '-50px'
  },
  centerCardEmphasized: {
    borderLeft:'6px solid #4caf50'
  },
  sideActions: {
    width: '5%',
    height: '100%',
    float: 'right',
    display: 'inline-block'
  },
  sideAction: {
    width: 'auto',
    padding: 0
  },
  iconCol: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column'
  },
  bottomAction: {

  },
  troughLeft: {
    position: 'relative',
    height: '100%',
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    float: 'left'
  },
  troughRight: {
    position: 'relative'
  },
  dragHandle: {
    float: 'right'
  }
}

class Leaf extends React.Component {
  constructor (props) {
    super(props)
    this.update = (data) => this.props.updateLeafData(this.props.leafID, data)
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.props.leafID !== nextProps.leafID) return true
    if (this.props.leafData !== nextProps.leafData) return true
    if (this.props.dragHandle !== nextProps.dragHandle) return true

    return false
  }

  render () {
    console.log('render leaf')
    var actions = fetchActions(this.props.leafType, this.props.leafData)
    const dragHandle = this.props.dragHandle
    // fetch template from ID, apply data
    return <div id={this.props.leafID} style={{ width: '100%', minHeight: '5em', marginBottom: '1em' }}>
      <div style={styles.centerArea}>
        <Paper style={!this.props.leafData.isEmphasized ? styles.centerCard
          : { ...styles.centerCard, ...styles.centerCardEmphasized }}
          children={fetchTemplate(this.props.leafType, this.props.leafData, this.update)}
        />
        <Paper style={!this.props.leafData.showTrough
          ? { ...styles.trough, ...styles.troughHidden } : styles.trough}
          key='trough' children={[
            <div key='left' style={styles.troughLeft}>
              {actions.trough.map((action, i) =>
                <IconButton key={i} style={action.style
                  ? { ...styles.bottomAction, ...action.style(this.props.leafData) } : styles.bottomAction}
                  onClick={() => this.props.updateLeafData(this.props.leafID, action.onClick)}>
                  <i className='material-icons leaf__action'>
                    {action.iconName}
                  </i>
                </IconButton>
              )}
            </div>,
            <div key='right' style={styles.troughRight}>
              {dragHandle(<IconButton style={styles.dragHandle}>
                <i className='material-icons leaf__action'>
                  transform
                </i>
              </IconButton>)}
            </div>
          ]} />
      </div>
      <Paper style={styles.sideActions} children={
        <div style={styles.iconCol}>
          {actions.bar.map((action, i) =>
            <IconButton key={i} style={action.style
              ? { ...styles.sideAction, ...action.style(this.props.leafData) } : styles.sideAction}
              onClick={() => this.props.updateLeafData(this.props.leafID, action.onClick)}>
              <i className='material-icons leaf__action'>
                {action.iconName}
              </i>
            </IconButton>
          )}
        </div>
        } />
    </div>
  }
}

Leaf.propTypes = {
  leafID : PropTypes.string.isRequired,
  leafType : PropTypes.string.isRequired,
  leafData : PropTypes.object.isRequired,
  updateLeafData : PropTypes.func.isRequired,
  dragHandle : PropTypes.func
}

export default Leaf
