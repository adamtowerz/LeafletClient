import React from 'react'
import PropTypes from 'prop-types'
import './Leaf.scss'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import { fetchTemplate, fetchActions } from './fetch.js'

const styles = {
  emphasisBox: {
    width: '3%',
    height: '100%',
    float: 'left',
    display: 'inline-block'
  },
  emphasis: {
    width: '100%',
    height: '100%',
    backgroundColor: '#4CAF50'
  },
  centerCard: {
    height: '100%',
    width: '88%',
    margin: '0 2%',
    display: 'inline-block'
  },
  sideActions: {
    width: '5%',
    height: '100%',
    float: 'right',
    display: 'inline-block'
  },
  sideAction: {
    /* height: '33%', */
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
      <div style={styles.emphasisBox}>
        {this.props.leafData.isEmphasized ? <Paper style={styles.emphasis} /> : null}
      </div>
      <Paper style={styles.centerCard} children={
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
