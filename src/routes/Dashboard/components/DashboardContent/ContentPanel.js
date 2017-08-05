import React from 'react'
import PropTypes from 'prop-types'
import LeafletCard from './LeafletCard'

const styles = {
  content: {
    display: 'inline-block',
    width: '50%',
    height: '100%',
    marginTop: '1em',
    padding: '0 1em'
  },
  filterLabel: {
    fontSize: '1em',
    fontWeight: '400',
    color: '#424242'
  },
  leafletsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    height: 'auto'
  }
}

const leaflets = [{
  title: 'Biology 161',
  color: '#F19393'
}, {
  title: 'Physics 160',
  color: '#7ED2FA'
},
{
  title: 'CSE 142',
  color: '#D692FC'
}]

export const ContentPanel = (props) => (
  <div style={styles.content}>
    <div style={styles.filterLabel}>Recent Leaflets</div>
    <div style={styles.leafletsContainer}>
      {leaflets.map((card, i) => <LeafletCard title={card.title} color={card.color} />)}
    </div>
  </div>
)

ContentPanel.propTypes = {

}

export default ContentPanel
