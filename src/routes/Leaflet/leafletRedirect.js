import { Route, Redirect } from 'react-router'
import React from 'React'

export default <Route exact path='/leaflet' render={() => (
  <Redirect to='/Leaflet' />
)} />

