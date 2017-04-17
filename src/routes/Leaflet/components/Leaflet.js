import React from 'react'
import PropTypes from 'prop-types'
import {Grid, Row, Col} from 'react-bootstrap'
import '../../../styles/core.scss'
import LeafletNav from './LeafletNav'

export const Leaflet = (props) => (
  <Grid>
    <Row>
      <Col xs={3}>
        <LeafletNav/>
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
  //nav contents
  //leaf contents
  //dock contents
}

export default Leaflet
