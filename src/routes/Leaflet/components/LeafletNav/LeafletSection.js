import React from 'react'
import PropTypes from 'prop-types'
import './LeafletNav.scss'
import LeafletPage from '../../containers/LeafletPageContainer.js'
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
    maxWidth: '85%',
    display: 'inline-block'
  },
  ul: {
    listStyle: 'none',
    width: '100%',
    paddingLeft: '1.5em'
  },
  chevron: {
    padding: 0,
    width: '36px',
    height: '36px'
  }
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
         this.props.pages.map((p, index) => {
           return <li key={index}>
             <LeafletPage title={p.title} position={[this.props.position, index]}
               isFavorited={p.isFavorited} />
           </li>
         })
        }
      </ul> : null}
    </div>
  }
}

LeafletSection.propTypes = {
  title     : PropTypes.string.isRequired,
  pages     : PropTypes.array.isRequired,
  position: PropTypes.number.isRequired
}

export default LeafletSection
