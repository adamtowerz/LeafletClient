import React from 'react'
import PropTypes from 'prop-types'
import './LeafletNav.scss'
import LeafletPage from './LeafletPage.js'
import IconButton from 'material-ui/IconButton'
import IconChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import IconChevronDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'

const styles = {
  sectionTitle: {
    fontWeight: '100',
    fontSize: '1.3em',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '65%',
    display: 'inline-block'
  },
  ul: {
    listStyle: 'none',
    width: '100%'
  }
  /*
  chevron: {
    paddingLeft: 0,
    maxWidth: '25%'
  }
  */
}
/*
props: {
  title: STRING,
  pages: [
    {
      title: STRING,
      isFavorite: BOOLEAN,
      isSelected: BOOLEAN
    }
  ]
}
*/

export class LeafletSection extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
    this.state = { isOpen: false }
  }

  toggleOpen = () => {
    this.setState((prevState, props) => {
      return { isOpen: !prevState.isOpen }
    })
  }

  render () {
    return <div>
      <IconButton onClick={this.toggleOpen} style={styles.chevron}>
        {this.state.isOpen ? <IconChevronDown /> : <IconChevronRight />}
      </IconButton>
      <span style={styles.sectionTitle}>
        {this.props.title}
      </span>
      {this.state.isOpen ? <ul style={styles.ul}>
        {
         this.props.pages.map((p) => {
           return <li key={p.title}>
             <LeafletPage title={p.title} isFavorited={p.isFavorited} isSelected={p.isSelected} />
           </li>
         })
        }
      </ul> : null}
    </div>
  }
}

LeafletSection.propTypes = {
  title     : PropTypes.string.isRequired,
  pages     : PropTypes.array.isRequired
}

export default LeafletSection
