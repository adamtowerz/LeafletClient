import React from 'react'
// import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap'
import '../../../styles/core.scss'
import LeafletNav from './LeafletNav'

const tempProps = {
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

export const Leaflet = (props) => (
  <Grid>
    <Row>
      <Col xs={3}>
        <LeafletNav sections={tempProps.sections} />
      </Col>
      <Col xs={7}>
        2
      </Col>
      <Col xs={2}>
        3
      </Col>
    </Row>
  </Grid>
)

Leaflet.propTypes = {
  // nav contents
  // leaf contents
  // dock contents
}

export default Leaflet
