import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'

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
  }
}

export const LeafletCard = (props) => (
  <Paper style={{ ...styles.card, backgroundColor: props.color }} children={
    <div>
      <div style={styles.title}> {props.title} </div>
    </div>
  } />
)

LeafletCard.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
}

export default LeafletCard
