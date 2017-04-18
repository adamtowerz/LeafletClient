import React from 'react'
import PropTypes from 'prop-types'
import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div className='greedy'>
    <Header />
    <div className='core-layout__viewport greedy'>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : PropTypes.element.isRequired
}

export default CoreLayout
