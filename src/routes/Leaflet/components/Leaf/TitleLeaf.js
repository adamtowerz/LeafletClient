import React from 'react'
// import { CSSTransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types'
// import FirstChild from '../../../../components/FirstChild'
import './Leaf.scss'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'

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
  titleCardBox: {
    height: '8vh',
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
  }
}
const actions = {
  bar: [
    /* {
      iconName: 'bookmark',
      onClick: { isEmphasized: !data.isEmphasized },
      style: (data) => {
        if (data.isEmphasized) return { color: '#4CAF50' }
        return
      }
    }, */
    {
      iconName: 'settings',
      onClick: { }
    }
  ],
  trough: false
}

class Leaf extends React.Component {
  render () {
    // fetch template from ID, apply data
    return <div style={styles.container}>
      <div style={styles.centerArea}>
        <Paper style={styles.centerCard} children={
          <div style={styles.titleCardBox}>
            <span style={styles.title}>{this.props.pageMeta.title}</span>
          </div>
        }
        />
      </div>
      <Paper style={styles.sideActions} children={
        <div style={styles.iconCol}>
          {actions.bar.map((action, i) =>
            <IconButton key={i} style={styles.sideAction}
              onClick={() => {}}>
              <i style={styles.sideActionIcon} className='material-icons leaf__action__side'>
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
  pageMeta : PropTypes.object
}

export default Leaf
