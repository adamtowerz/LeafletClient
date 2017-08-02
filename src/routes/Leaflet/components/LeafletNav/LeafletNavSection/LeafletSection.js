import React from 'react'
import PropTypes from 'prop-types'
import '../LeafletNav.scss'
import LeafletPage from '../LeafletNavPage/LeafletPageContainer'
import NewLeafletPage from './NewLeafletPage'

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
  newPageIcon: {
    padding: 0,
    float: 'right',
    width: '36px',
    height: '36px'
  }
}

export class LeafletSection extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
    this.state = { isOpen: false, newPage: false }
  }

  toggleOpen = () => {
    this.setState((prevState, props) => {
      return { isOpen: !prevState.isOpen }
    })
  }

  newPageOpen = () => {
    this.setState((prevState, props) => {
      return {
        isOpen: true,
        newPage: !prevState.newPage
      }
    })
  }

  cancelNewPage = () => {
    this.setState((prevState, props) => {
      return {
        newPage: false,
        isOpen: prevState.isOpen
      }
    })
  }

  createNewPage = (title) => {
    this.props.newPage(title, this.props.position)
    this.setState((prevState, props) => {
      return {
        newPage: false,
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
        <IconButton onClick={this.newPageOpen} style={styles.newPageIcon} className='leafletSection__newPage'>
          <IconAdd />
        </IconButton>
      </div>
      <div>
        {this.state.isOpen ? <ul style={styles.ul}>
          {
           this.props.pages.map((p, index) => {
             return <li key={index}>
               <LeafletPage title={p.title} position={[this.props.position, index]}
                 isFavorited={p.isFavorited} />
             </li>
           })
          }
        </ul> : null}
        {this.state.newPage
          ? <NewLeafletPage newPage={(title) => this.createNewPage(title)}
            cancel={this.cancelNewPage} />
        : null }
      </div>
    </div>
  }
}

LeafletSection.propTypes = {
  title     : PropTypes.string.isRequired,
  pages     : PropTypes.array.isRequired,
  position  : PropTypes.number.isRequired,
  newPage   : PropTypes.func.isRequired
}

export default LeafletSection
