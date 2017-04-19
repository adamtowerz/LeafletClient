import React from 'react'
import PropTypes from 'prop-types'
import './LeafletContent.scss'
import Leaf from '../Leaf'

const styles = {
  titleCardBox: {
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
  }
}

const titleActions = [
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

// TODO: rewrite emphasis code for default false, existince means true
const t = true

export const LeafletTitle = (props) => (
  <Leaf leafID={'title'} leafData={{ title: props.title, styles: styles }} isEmphasized={t} actions={titleActions} />
)

LeafletTitle.propTypes = {
  title : PropTypes.string.isRequired
}

export default LeafletTitle
