import React from 'react'
import update from 'react-addons-update'
import PropTypes from 'prop-types'
import './Leaf.scss'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'

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
  titleCard: {
    height: '100%',
    width: '88%',
    margin: '0 2%',
    display: 'inline-block'
  },
  titleCardBox: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  titleActions: {
    width: '5%',
    height: '100%',
    float: 'right',
    display: 'inline-block'
  },
  title: {
    fontWeight: '100',
    fontSize: '1.7em',
    color: '#4CAF50',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
    textAlign: 'center'
  },
  titleAction: {
    height: '33%',
    width: 'auto',
    padding: 0
  },
  iconCol: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
}

export class Leaf extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
    this.state = {
      leafID: props.leafID,
      leafData: props.leafData,
      isEmphasized: props.isEmphasized,
      actions: props.actions
    }
  }

  toggleEmphasis = () => {
    this.setState((prevState, props) => {
      return update(this.state.items, { isEmphasized: !prevState.isEmphasized })
    })
  }

  fetchContent = (id, data) => {
    switch (id) {
      case 'title':
        return <div style={data.styles.titleCardBox}>
          <span style={data.styles.title}>{data.title}</span>
        </div>
      default:
        return <div>this is a leaf</div>

    }
  }

  render () {
    // fetch template from ID, apply data
    return <div style={{ width: '100%', height: '12%' }}>
      <div style={styles.emphasisBox}>
        {this.state.isEmphasized ? <Paper style={styles.emphasis} /> : null}
      </div>
      <Paper style={styles.titleCard} children={
          this.fetchContent(this.state.leafID, this.state.leafData)
        } />
      <Paper style={styles.titleActions} children={
        <div style={styles.iconCol}>
          {this.state.actions.map((action) =>
            <IconButton key={action.iconName}
              style={action.style ? Object.assign(action.style, styles.titleAction) : styles.titleAction}>
              <i className='material-icons titleActionIcon'>
                {action.iconName}
              </i>
            </IconButton>
          )}
        </div>
        } />
    </div>
  }
}

/*
child : REACT object that takes a data object and an ID object

actions : [
  {
    class: 'muidocs-icon-action-home',
    onClick: function()
    color: '#d8d8d8',
    toggle: true/false,
    colorOnToggle: ''
  },...
]
*/

Leaf.propTypes = {
  leafID : PropTypes.string.isRequired,
  leafData : PropTypes.object.isRequired,
  actions : PropTypes.array.isRequired,
  isEmphasized: PropTypes.bool.isRequired
}

export default Leaf
