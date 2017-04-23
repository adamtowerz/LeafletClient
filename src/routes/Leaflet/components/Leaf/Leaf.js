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
    console.log('Leaf with props: ' + props)
  }

  fetchContent = (type, data) => {
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

  fetchActions = (type, data) => {
    switch (type) {
      case 'title':
        return [
          {
            iconName: 'bookmark',
            onClick: function () {},
            style: {
              color: '#4CAF50'
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
    return <div id={this.props.leafID} style={{ width: '100%', height: '10em' }}>
      <div style={styles.emphasisBox}>
        {this.props.leafData.isEmphasized ? <Paper style={styles.emphasis} /> : null}
      </div>
      <Paper style={styles.titleCard} children={
          this.fetchContent(this.props.leafType, this.props.leafData)
        } />
      <Paper style={styles.titleActions} children={
        <div style={styles.iconCol}>
          {this.fetchActions(this.props.leafType, this.props.leafData).map((action) =>
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

Leaf.propTypes = {
  leafID : PropTypes.string.isRequired,
  leafType : PropTypes.string.isRequired,
  leafData : PropTypes.object.isRequired
}

export default Leaf
