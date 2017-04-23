import React from 'react'
import PropTypes from 'prop-types'
import '../../../styles/core.scss'
import _greedy from '../../../styles/greedy.js'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import LeafletNav from '../containers/LeafletNavContainer.js'
import Leaf from '../containers/LeafContainer.js'

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
  },
  addLeafFAB: {
    position: 'absolute',
    right: '10vw',
    bottom: '10vh'
  }
}

export const Leaflet = (props) => {
  return (
    <div style={_greedy}>
      <span style={styles.navCol}>
        <LeafletNav />
      </span>
      <span style={styles.contentCol}>
        {(props.leaves.length > 0) ? props.leaves.map((leaf, i) => (
          <Leaf key={i} leafID={leaf.leafID} />
        )) : null}
      </span>
      <span style={styles.dockCol} />
      {typeof props.activePage === 'object'
        ? <FloatingActionButton style={styles.addLeafFAB} onTouchTap={props.newLeaf}>
          <i className='material-icons titleActionIcon'>add</i>
        </FloatingActionButton> : null}
    </div>
  )
}

Leaflet.propTypes = {
  leaves     : PropTypes.array.isRequired,
  newLeaf    : PropTypes.func.isRequired,
  activePage : PropTypes.any.isRequired // TODO: 'any' -> enum of boolean and array
}

export default Leaflet
