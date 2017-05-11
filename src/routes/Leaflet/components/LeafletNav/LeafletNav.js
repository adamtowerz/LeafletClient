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
  },
  div: {
    paddingLeft: '0.5em',
    position: 'fixed'
  }
}

export const LeafletNav = (props) => (
  <div style={styles.div}>
    <TextField style={styles.search}
      hintText='Search Leaflet'
    />
    {props.sections.map((section, index) =>
      <LeafletSection key={index} title={section.title}
        pages={section.pages} position={index} />
    )}
  </div>
)

LeafletNav.propTypes = {
  sections : PropTypes.array.isRequired
}

export default LeafletNav
