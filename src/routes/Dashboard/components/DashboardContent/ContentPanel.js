import React from 'react'
import PropTypes from 'prop-types'
import NotebookCard from './NotebookCardContainer'

const styles = {
  content: {
    display: 'inline-block',
    width: '50%',
    height: '100%',
    marginTop: '1em',
    padding: '0 1em'
  },
  filterLabel: {
    fontSize: '1em',
    fontWeight: '400',
    color: '#424242'
  },
  leafletsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    height: 'auto'
  }
}

export const ContentPanel = (props) => (
  <div style={styles.content}>
    <div style={styles.filterLabel}>{props.filterType}</div>
    <div style={styles.leafletsContainer}>
      {props.notebooks.map((card, i) => <NotebookCard key={i}
        username={card.author.username} title={card.title} color={card.color} />)}
    </div>
  </div>
)

ContentPanel.propTypes = {
  filterType: PropTypes.string.isRequired,
  notebooks: PropTypes.array.isRequired
}

export default ContentPanel
