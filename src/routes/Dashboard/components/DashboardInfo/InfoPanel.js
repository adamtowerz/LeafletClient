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
    verticalAlign: 'middle',
    marginRight: '0.2em'
  },
  firstMeta: {
    marginBottom: '0.4em'
  }
}

export default class InfoPanel extends React.Component {

  render () {
    if (Object.keys(this.props.selectedNotebook).length > 0) {
      return <div style={styles.container}>
        <div style={styles.title}>{this.props.selectedNotebook.title}</div>

        <div style={styles.meta}>
          <div style={styles.firstMeta}>
            <i className='material-icons' style={styles.metaIcon}>person</i>
            <b>{this.props.selectedNotebook.author.username}</b>
          </div>
          <div>
            <i className='material-icons' style={styles.metaIcon}>access_time</i>
            {this.props.selectedNotebook.lastEdit.when + ' by '}<b>{this.props.selectedNotebook.lastEdit.who}</b>
          </div>
        </div>
      </div>
    } else {
      return <div style={styles.container}>
        Click on a <b>Notebook</b> to get started
      </div>
    }
  }
}

InfoPanel.propTypes = {
  selectedNotebook: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.shape({
      username: PropTypes.string
    }),
    lastEdit: PropTypes.shape({
      who: PropTypes.string,
      when: PropTypes.string
    })
  })
}
