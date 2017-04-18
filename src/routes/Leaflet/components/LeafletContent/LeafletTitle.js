import React from 'react'
import PropTypes from 'prop-types'
import './LeafletContent.scss'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import IconFavorite from 'material-ui/svg-icons/action/favorite'
import IconShare from 'material-ui/svg-icons/social/share'
import IconDelete from 'material-ui/svg-icons/action/delete'

const styles = {
  emphasis: {
    width: '3%',
    height: '100%',
    backgroundColor: '#4CAF50',
    float: 'left',
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
    padding: '1.3em 0.2em',
    textAlign: 'center'
  },
  titleCard: {
    height: '100%',
    width: '88%',
    margin: '0 2%',
    display: 'inline-block'
  },
  titleActions: {
    width: '5%',
    height: '100%',
    float: 'right',
    display: 'inline-block'
  },
  titleAction: {
    height: '33%',
    width: 'auto',
    padding: 0
  },
  titleActionIcon: {
    width: 'auto',
    padding: 0,
    margin: 0
  },
  iconCol: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
}
/*
props: {
  title: STRING,
  isFavorite: BOOLEAN,
  isSelected: BOOLEAN
}
*/

export const LeafletTitle = (props) => (
  <div style={{ width: '100%', height: '12%' }}>
    <Paper style={styles.emphasis} />
    <Paper style={styles.titleCard} children={
      <span style={styles.title}>{props.title}</span>
    } />
    <Paper style={styles.titleActions} children={
      <div style={styles.iconCol}>
        <IconButton style={styles.titleAction} iconStyle={styles.titleActionIcon}>
          <IconFavorite className={'titleActionIcon'} color={props.isFavorited ? '#4CAF50' : null} />
        </IconButton>
        <IconButton style={styles.titleAction} iconStyle={styles.titleActionIcon}>
          <IconShare className={'titleActionIcon'} />
        </IconButton>
        <IconButton style={styles.titleAction} iconStyle={styles.titleActionIcon}>
          <IconDelete className={'titleActionIcon'} />
        </IconButton>
      </div>
    } />
  </div>
)

LeafletTitle.propTypes = {
  title       : PropTypes.string.isRequired,
  isFavorited : PropTypes.bool
}

export default LeafletTitle
