import React from 'react'
// import { CSSTransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types'
// import FirstChild from '../../../../components/FirstChild'
import './Leaf.scss'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import { fetchActions, fetchComponent } from './fetch.js'

const styles = {
  container: {
    width: '100%',
    minHeight: '4vh',
    paddingTop: '1vh',
    marginBottom: '1vh',
    transitionProperty: 'margin-bottom',
    transitionDuration: '.5s',
    transitionTimingFunction: 'cubic-bezier(0, 1, 0.5, 1)',
    lineHeight: '0'
  },
  containerWithTrough: {
    marginBottom: '5vh'
  },
  centerArea: {
    height: '100%',
    width: '91%',
    display: 'inline-block',
    margin: '0 2%',
    lineHeight: '1.42857'
  },
  centerCard: {
    width: '100%',
    display: 'block',
    zIndex: '2',
    position: 'relative',
    borderLeft: ''
  },
  trough: {
    position: 'absolute',
    width: '91%',
    height: '4vh',
    display: 'block',
    visibility: 'visible',
    zIndex: '1',
    backgroundColor: '#424242',
    bottom: '-4vh',
    borderRadius: '0px',
    borderBottomRightRadius: '2px',
    borderBottomLeftRadius: '2px',
    transitionProperty: 'bottom',
    transitionDuration: '.5s',
    transitionTimingFunction: 'cubic-bezier(0, 1, 0.5, 1)'
  },
  troughHidden: {
    bottom: '5px'
  },
  centerCardEmphasized: {
    borderLeft:'6px solid #4caf50'
  },
  sideActions: {
    width: '5%',
    float: 'right',
    display: 'inline-block'
  },
  sideAction: {
    width: '1.5rem',
    height: '1.5rem',
    marginBottom: '0.4rem',
    marginTop: '0.4rem',
    padding: 0
  },
  iconCol: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center'
  },
  bottomAction: {
    padding: '0',
    width: 'auto',
    height: 'auto'
  },
  troughLeft: {
    position: 'relative',
    height: '100%',
    width: '80%',
    marginLeft: '0.5em',
    display: 'flex',
    flexDirection: 'row',
    float: 'left',
    color: '#9E9E9E'
  },
  troughRight: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row-reverse',
    height: '100%',
    color: '#9E9E9E',
    marginRight: '0.5em'
  },
  dragHandleTrough: {
    float: 'right',
    padding: '0',
    width: 'auto',
    height: 'auto'
  }
}

class Leaf extends React.Component {
  constructor (props) {
    super(props)
    this.update = (data) => this.props.updateLeafData(this.props.leafID, data)
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.state !== nextState) return true
    if (this.props.leafID !== nextProps.leafID) return true
    if (this.props.leafData !== nextProps.leafData) return true
    if (this.props.dragHandle !== nextProps.dragHandle) return true

    return false
  }

  render () {
    var actions = fetchActions(this.props.leafType, this.props.leafData)
    const dragHandle = this.props.dragHandle
    // fetch template from ID, apply data
    return <div id={this.props.leafID} style={this.props.leafData.showTrough
      ? { ...styles.container, ...styles.containerWithTrough } : styles.container}>
      <div style={styles.centerArea}>
        <Paper style={!this.props.leafData.isEmphasized ? styles.centerCard
          : { ...styles.centerCard, ...styles.centerCardEmphasized }}
          children={fetchComponent(this.props.leafType, this.props.leafData,
            this.update, this.props.commonProps)}
        />
        {actions.trough ? <Paper style={!this.props.leafData.showTrough
          ? { ...styles.trough, ...styles.troughHidden } : styles.trough}
          key='trough' children={[
            <div key='left' style={styles.troughLeft}>
              {actions.trough.map((action, i) =>
                <IconButton key={i} style={action.style
                  ? { ...styles.bottomAction, ...action.style(this.props.leafData) } : styles.bottomAction}
                  onClick={() => this.props.updateLeafData(this.props.leafID, action.onClick)}>
                  <i className='material-icons leaf__action__trough'>
                    {action.iconName}
                  </i>
                </IconButton>
              )}
            </div>,
            <div key='right' style={styles.troughRight}>
              {this.props.dragHandle ? dragHandle(<IconButton style={styles.dragHandleTrough}>
                <i className='material-icons leaf__action__trough'>
                  transform
                </i>
              </IconButton>)
              : null}
            </div>
          ]} /> : null}
      </div>
      <Paper style={styles.sideActions} children={
        <div style={styles.iconCol}>
          {actions.bar.map((action, i) =>
            <IconButton key={i} style={action.style
              ? { ...styles.sideAction, ...action.style(this.props.leafData) } : styles.sideAction}
              onClick={() => this.props.updateLeafData(this.props.leafID, action.onClick)}>
              <i style={styles.sideActionIcon} className='material-icons leaf__action__side'>
                {action.iconName}
              </i>
            </IconButton>
          )}
          {actions.dragHandleBar ? dragHandle(<IconButton style={styles.sideAction}>
            <i style={styles.sideActionIcon} className='material-icons leaf__action__side'>
              transform
            </i>
          </IconButton>) : null}
        </div>
        } />
    </div>
  }
}

Leaf.propTypes = {
  commonProps : PropTypes.object,
  leafID : PropTypes.string.isRequired,
  leafType : PropTypes.string.isRequired,
  leafData : PropTypes.object.isRequired,
  updateLeafData : PropTypes.func,
  dragHandle : PropTypes.func
}

export default Leaf
