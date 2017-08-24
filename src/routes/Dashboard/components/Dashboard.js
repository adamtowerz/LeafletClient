import React from 'react'
import PropTypes from 'prop-types'
import InfoPanel from './DashboardInfo/InfoPanelContainer'
import NavPanel from './DashboardNav/NavPanelContainer'
import ContentPanel from './DashboardContent/ContentPanelContainer'

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
