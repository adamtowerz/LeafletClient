import React from 'react'
import { IndexLink, Link } from 'react-router'
import './LeafletNav.scss'
import LeafletSection from './LeafletSection.js'
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton'
import IconSearch from 'material-ui/svg-icons/action/search'

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
const tempProps = {
  sections: [
    {title: '10.3', pages: [
      {title: '10.3.1 Molecular Dynamics', isFavorited: false, isSelected: false},
      {title: '10.3.2 High Temperature Interactions', isFavorited: true, isSelected: true},
      {title: '10.3.3 High Pressure Systems', isFavorited: false, isSelected: false}
    ]},
    {title: '10.4', pages: [
      {title: 'pepe', isFavorited: false, isSelected: false}
    ]}
  ]
}

const styles = {
  search: {
    maxWidth: '100%'
  }
}

export const LeafletNav = (props) => (
  <div>
    <TextField
      hintText="Search Leaflet"
    />
    {tempProps.sections.map((section) =>
      <LeafletSection key={section.title} title={section.title} pages={section.pages}/>
    )}
  </div>
)

export default LeafletNav
