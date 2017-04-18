import React from 'react'
import './LeafletNav.scss'
import PropTypes from 'prop-types'
import LeafletSection from './LeafletSection.js'
import TextField from 'material-ui/TextField'

/*
props: {
 sections: [
  {
   title: STRING,
   children: []
  }
 ]
}
*/

const styles = {
  search: {
    width: '80%'
  }
}

export const LeafletNav = (props) => (
  <div>
    <TextField style={styles.search}
      hintText='Search Leaflet'
    />
    {props.sections.map((section) =>
      <LeafletSection key={section.title} title={section.title} pages={section.pages} />
    )}
  </div>
)

LeafletNav.propTypes = {
  sections : PropTypes.array.isRequired
}

export default LeafletNav
