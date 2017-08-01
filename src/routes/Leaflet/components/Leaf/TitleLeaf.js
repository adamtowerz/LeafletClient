import React from 'react'
// import { CSSTransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types'
// import FirstChild from '../../../../components/FirstChild'
import './Leaf.scss'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

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
    overflow: 'hidden',
    height: '100%',
    width: '91%',
    display: 'inline-block',
    margin: '0 2%',
    lineHeight: '1.42857'
  },
  centerCard: {
    height: '8vh',
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
    position: 'absolute',
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
  },
  settings: {
    container: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      transform: 'translateX(110%)'
    },
    containerShow: {
      transform: 'translateX(0%)'
    },
    textField: {
      height: '8vh',
      marginLeft: '1vw',
      width: '50%'
    },
    sharingButton: {
      float: 'right',
      marginTop: 'calc(4vh - 18px)',
      marginRight: '1vw'
    }
  }

}

class Leaf extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showSettings: false
    }
  }

  componentWillReceiveProps (nextProps) { // closes settings when title changes
    if (nextProps.pageMeta.title !== this.props.pageMeta.title) {
      this.setState({
        showSettings: false
      })
    }
  }

  render () {
    // fetch template from ID, apply data
    return <div style={styles.container}>
      <div style={styles.centerArea}>
        <Paper style={styles.centerCard} children={
          <div>
            <div style={styles.titleCardBox}>
              <span style={styles.title}>{this.props.pageMeta.title}</span>
            </div>
            <Paper style={this.state.showSettings
              ? { ...styles.settings.container, ...styles.settings.containerShow } : styles.settings.container}
              id='settings' children={
                <div>
                  <TextField style={styles.settings.textField} id='settingsField'
                    value={this.props.pageMeta.title}
                  />
                  <RaisedButton label='Sharing' id='sharingButton' primary style={styles.settings.sharingButton} />
                </div>
            } />
          </div>
        }
        />
      </div>
      <Paper style={styles.sideActions} children={
        <div style={styles.iconCol}>
          <IconButton style={styles.sideAction}
            onClick={() => { this.setState({ showSettings: !this.state.showSettings }) }}>
            <i style={styles.sideActionIcon} className='material-icons leaf__action__side'>
              settings
            </i>
          </IconButton>
        </div>
        } />
    </div>
  }
}

Leaf.propTypes = {
  pageMeta : PropTypes.object
}

export default Leaf
