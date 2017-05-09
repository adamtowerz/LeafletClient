import React from 'react'
import PropTypes from 'prop-types'
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
    display: 'block'
  },
  trough: {
    height: '100%',
    width: '100%',
    display: 'block',
    zIndex: '-1',
    backgroundColor: '#424242',
    top: '-3px',
    borderRadius: '0px',
    borderBottomRightRadius: '2px',
    borderBottomLeftRadius: '2px'
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
  iconRow: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  }
}

class Leaf extends React.Component {
  /* constructor (props) {
    super(props)
  } */

  render () {
    var actions = fetchActions(this.props.leafType, this.props.leafData)

    // fetch template from ID, apply data
    return <div id={this.props.leafID} style={{ width: '100%', minHeight: '5em', marginBottom: '1em' }}>
      <div style={styles.centerArea}>
        <Paper style={!this.props.leafData.isEmphasized ? styles.centerCard
          : { ...styles.centerCard, ...styles.centerCardEmphasized }}
          children={fetchTemplate(this.props.leafType, this.props.leafData)}
        />
        <Paper style={styles.trough} children={
          <div style={styles.iconRow}>
            {actions.trough.map((action, i) =>
              <IconButton key={i} style={action.style
                ? { ...styles.sideAction, ...action.style(this.props.leafData) } : styles.bottomAction}
                onClick={() => this.props.updateLeafData(this.props.leafID, action.onClick)}>
                <i className='material-icons leaf__sideAction'>
                  {action.iconName}
                </i>
              </IconButton>
            )}
          </div>
        } />
      </div>
      <Paper style={styles.sideActions} children={
        <div style={styles.iconCol}>
          {actions.bar.map((action, i) =>
            <IconButton key={i} style={action.style
              ? { ...styles.sideAction, ...action.style(this.props.leafData) } : styles.sideAction}
              onClick={() => this.props.updateLeafData(this.props.leafID, action.onClick)}>
              <i className='material-icons leaf__sideAction'>
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
  updateLeafData : PropTypes.func.isRequired
}

export default Leaf
