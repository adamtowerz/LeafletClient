import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import { isDoubleTouchTap } from '../../../../helpers'
const styles = {
  card: {
    height: '5em',
    width: '40%',
    margin: '0 1em 1em 0em'
  },
  title: {
    fontSize: '1.5em',
    fontWeight: '300',
    marginLeft: '0.2em'
  },
  username: {
    fontSize: '1em',
    fontWeight: '100',
    marginLeft: '0.2em'
  }
}

export const NotebookCard = (props) => (
  <Paper onTouchTap={(e) => {
    if (!isDoubleTouchTap(e)) {
      props.selectNotebook(props.username, props.title)
    } else {
      props.openNotebook(props.username, props.title)
    }
  }}
    style={{ ...styles.card, backgroundColor: props.color }} children={
      <div>
        <span style={styles.title}> {props.title} </span><span style={styles.username}> {props.username} </span>
      </div>
  } />
)

NotebookCard.propTypes = {
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  selectNotebook: PropTypes.func.isRequired,
  openNotebook: PropTypes.func.isRequired
}

export default NotebookCard
