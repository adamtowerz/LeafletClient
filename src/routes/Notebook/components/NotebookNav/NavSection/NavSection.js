import React from 'react'
import PropTypes from 'prop-types'
import '../NotebookNav.scss'
import NavLeaflet from '../NavLeaflet/NavLeafletContainer'
import NewLeaflet from './NewLeaflet'

import IconButton from 'material-ui/IconButton'
import IconChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import IconChevronDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import IconAdd from 'material-ui/svg-icons/content/add'

const styles = {
  sectionTitle: {
    fontWeight: '100',
    fontSize: '1.5em',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '85%',
    display: 'inline-block'
  },
  ul: {
    listStyle: 'none',
    width: '100%',
    paddingLeft: '1.5em',
    marginBottom: '0'
  },
  chevron: {
    padding: 0,
    width: '36px',
    height: '36px'
  },
  newLeafletIcon: {
    padding: 0,
    float: 'right',
    width: '36px',
    height: '36px'
  }
}

export class NavSection extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
    this.state = { isOpen: false, newLeaflet: false }
  }

  toggleOpen = () => {
    this.setState((prevState, props) => {
      return { isOpen: !prevState.isOpen }
    })
  }

  newLeafletOpen = () => {
    this.setState((prevState, props) => {
      return {
        isOpen: true,
        newPage: !prevState.newPage
      }
    })
  }

  cancelNewLeaflet = () => {
    this.setState((prevState, props) => {
      return {
        newPage: false,
        isOpen: prevState.isOpen
      }
    })
  }

  createNewLeaflet = (title) => {
    this.props.newLeaflet(title, this.props.position)
    this.setState((prevState, props) => {
      return {
        newLeaflet: false,
        isOpen: prevState.isOpen
      }
    })
  }

  render () {
    return <div>
      <div>
        <IconButton onClick={this.toggleOpen} style={styles.chevron}>
          {this.state.isOpen ? <IconChevronDown /> : <IconChevronRight />}
        </IconButton>
        <span style={styles.sectionTitle}>
          {this.props.title}
        </span>
        <IconButton onClick={this.newLeafletOpen} style={styles.newLeafletIcon} className='navSection__newLeaflet'>
          <IconAdd />
        </IconButton>
      </div>
      <div>
        {this.state.isOpen ? <ul style={styles.ul}>
          {
           this.props.leaflets.map((p, index) => {
             return <li key={index}>
               <NavLeaflet title={p.title} position={[this.props.position, index]}
                 isFavorited={p.isFavorited} />
             </li>
           })
          }
        </ul> : null}
        {this.state.newLeaflet
          ? <NewLeaflet newLeaflet={(title) => this.createNewLeaflet(title)}
            cancel={this.cancelNewLeaflet} />
        : null }
      </div>
    </div>
  }
}

NavSection.propTypes = {
  title     : PropTypes.string.isRequired,
  leaflets     : PropTypes.array.isRequired,
  position  : PropTypes.number.isRequired,
  newLeaflet   : PropTypes.func.isRequired
}

export default NavSection
