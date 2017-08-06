import React from 'react'
import PropTypes from 'prop-types'
import './NavPanel.scss'
import classNames from 'classnames'

const styles = {
  icon: {
    verticalAlign: 'middle'
  }
}

function selectFilter (props) {
  if (props.type === props.filterType) {
    props.setFilterType('All Leaflets')
  } else {
    props.setFilterType(props.type)
  }
}

export const FilterButton = (props) => {
  let btnClass = classNames({
    filter__item: true,
    active: props.filterType === props.type
  })

  return (
    <div onTouchTap={() => selectFilter(props)} className={btnClass}>
      <i style={styles.icon} className='material-icons'>{props.icon}</i> {props.type}
    </div>
  )
}

FilterButton.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  setFilterType: PropTypes.func.isRequired,
  filterType: PropTypes.string.isRequired
}

export default FilterButton
