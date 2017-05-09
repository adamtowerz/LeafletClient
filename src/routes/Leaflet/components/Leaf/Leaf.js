import React from 'react'
import PropTypes from 'prop-types'
import './Leaf.scss'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import { fetchTemplate, fetchActions } from './fetch.js'

const styles = {
  centerCard: {
    height: '100%',
    width: '91%',
    margin: '0 2%',
    display: 'inline-block'
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
  }
}

class Leaf extends React.Component {
  constructor (props) {
    super(props)
    console.log('Leaf with props: ' + props)
  }

  render () {
    // fetch template from ID, apply data
    return <div id={this.props.leafID} style={{ width: '100%', minHeight: '5em', marginBottom: '1em' }}>
      <Paper style={!this.props.leafData.isEmphasized ? styles.centerCard
        : { ...styles.centerCard, ...styles.centerCardEmphasized }}
        children={
          fetchTemplate(this.props.leafType, this.props.leafData)
        } />
      <Paper style={styles.sideActions} children={
        <div style={styles.iconCol}>
          {fetchActions(this.props.leafType, this.props.leafData).map((action, i) =>
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
