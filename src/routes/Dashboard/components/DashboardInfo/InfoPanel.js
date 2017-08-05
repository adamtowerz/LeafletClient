import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  container: {
    display: 'inline-block',
    backgroundColor: '#9b9b9b',
    width: '25%',
    height: '100%'
  },
  title: {
    textAlign: 'center',
    fontWeight: '300',
    fontSize: '2em',
    marginTop: '1em'
  },
  meta: {
    color: '#424242',
    margin: '0 1em',
    padding: '1em 0',
    borderTop: '1px solid #424242',
    borderBottom: '1px solid #424242'
  },
  metaIcon: {
    verticalAlign: 'middle'
  },
  firstMeta: {
    marginBottom: '0.4em'
  }
}

export const InfoPanel = (props) => (
  <div style={styles.container}>
    <div style={styles.title}>Biology 161</div>

    <div style={styles.meta}>
      <div style={styles.firstMeta}>
        <i className='material-icons' style={styles.metaIcon}>person</i> <b>Adam Towers</b>
      </div>
      <div>
        <i className='material-icons' style={styles.metaIcon}>access_time</i> Last night by <b>Isaac</b>
      </div>
    </div>
  </div>
)

InfoPanel.propTypes = {
  dank: PropTypes.bool
}

export default InfoPanel
