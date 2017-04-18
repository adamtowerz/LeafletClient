import React from 'react'
import './LeafletContent.scss'
import PropTypes from 'prop-types'
import LeafletTitle from './LeafletTitle.js'

/*
props: {
  title: STRING,
  isFavorited BOOLEAN,
  leaves: []
}
*/

/*
const styles = {
  search: {
    maxWidth: '100%'
  }
}
*/

export const LeafletContent = (props) => (
  <LeafletTitle title={props.title} isFavorited={props.isFavorited} />
)

LeafletContent.propTypes = {
  title : PropTypes.string.isRequired,
  isFavorited : PropTypes.bool.isRequired
  // leaves : PropTypes.array.isRequired
}

export default LeafletContent
