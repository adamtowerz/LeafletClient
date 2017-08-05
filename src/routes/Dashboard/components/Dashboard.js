import React from 'react'
import PropTypes from 'prop-types'
import InfoPanel from './DashboardInfo/InfoPanel'
import NavPanel from './DashboardNav/NavPanel'
import ContentPanel from './DashboardContent/ContentPanel'

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex'
  }
}

export const Dashboard = (props) => (
  <div style={styles.container}>
    <NavPanel />
    <ContentPanel />
    <InfoPanel />
  </div>
)

Dashboard.propTypes = {
  dank: PropTypes.bool
}

export default Dashboard
