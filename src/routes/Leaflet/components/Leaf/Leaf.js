import React from 'react'
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
  /*
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
  */
  sideAction: {
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

class Leaf extends React.Component {
  constructor (props) {
    super(props)
    console.log('Leaf with props: ' + props)
  }

  fetchTemplate = (type, data) => {
    const leafStyles = this.fetchStyles(type, data)
    switch (type) {
      case 'title':
        return <div style={leafStyles.titleCardBox}>
          <span style={leafStyles.title}>{data.title}</span>
        </div>
      default:
        return <div>this is a leaf</div>
    }
  }
  // TODO: move to api
  fetchStyles = (type, data) => {
    switch (type) {
      case 'title':
        return { titleCardBox: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
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
          } }
      default:
        return false
    }
  }
  // TODO: move to api
  fetchActions = (type, data) => {
    switch (type) {
      case 'title':
        return [
          {
            iconName: 'bookmark',
            onClick: { isEmphasized: !data.isEmphasized },
            style: (data) => {
              console.log('style funciton')
              if (data.isEmphasized) return { color: '#4CAF50' }
              return
            }
          },
          {
            iconName: 'share',
            onClick: function () {}
          },
          {
            iconName: 'delete',
            onClick: function () {}
          }
        ]
      default:
        return []
    }
  }

  render () {
    // fetch template from ID, apply data
    return <div id={this.props.leafID} style={{ width: '100%', height: '10em', marginBottom: '2em' }}>
      <div style={styles.emphasisBox}>
        {this.props.leafData.isEmphasized ? <Paper style={styles.emphasis} /> : null}
      </div>
      <Paper style={styles.centerCard} children={
          this.fetchTemplate(this.props.leafType, this.props.leafData)
        } />
      <Paper style={styles.sideActions} children={
        <div style={styles.iconCol}>
          {this.fetchActions(this.props.leafType, this.props.leafData).map((action, i) =>
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
