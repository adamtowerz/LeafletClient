import React from 'react'
// import PropTypes from 'prop-types'
// import { Row, Col } from 'react-bootstrap'
import '../../../styles/core.scss'
import _greedy from '../../../styles/greedy.js'

import LeafletNav from './LeafletNav'
import LeafletContent from './LeafletContent'

const tempPropsNav = {
  sections: [
    { title: '10.3',
      pages: [
        { title: '10.3.1 Molecular Dynamics', isFavorited: false, isSelected: false },
        { title: '10.3.2 High Temperature Interactions', isFavorited: true, isSelected: true },
        { title: '10.3.3 High Pressure Systems', isFavorited: false, isSelected: false }
      ]
    },
    { title: '10.4',
      pages: [
        { title: 'pepe', isFavorited: false, isSelected: false }
      ]
    }
  ]
}

const tempPropsContent = {
  title: '10.3.2 High Temperature Interactions',
  isFavorited: true,
  leaves: []
}

const styles = {
  navCol: {
    width: '20%',
    height: '100%',
    display: 'inline-block',
    float: 'left'
  },
  contentCol: {
    width: '60%',
    height: '100%',
    display: 'inline-block'
  },
  dockCol: {
    width: '20%',
    height: '100%',
    display: 'inline-block',
    float: 'right'
  }
}

export const Leaflet = (props) => (
  <div style={_greedy}>
    <span style={styles.navCol}>
      <LeafletNav sections={tempPropsNav.sections} />
    </span>
    <span style={styles.contentCol}>
      <LeafletContent title={tempPropsContent.title} isFavorited={tempPropsContent.isFavorited} />
    </span>
    <span style={styles.dockCol} />
  </div>
)

Leaflet.propTypes = {
  // nav contents
  // leaf contents
  // dock contents
}

export default Leaflet
