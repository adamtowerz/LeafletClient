import React from 'react'
import PropTypes from 'prop-types'

export let actions = (data) => {
  return {
    bar: [
      {
        iconName: 'bookmark',
        onClick: { isEmphasized: !data.isEmphasized },
        style: (data) => {
          if (data.isEmphasized) return { color: '#4CAF50' }
          return
        }
      },
      {
        iconName: 'share',
        onClick: function () {}
      },
      {
        iconName: 'more_vert',
        onClick: { showTrough: !data.showTrough }
      }
    ],
    trough: [
      {
        iconName: 'delete',
        onClick: { delete: true }
      },
      {
        iconName: 'settings',
        onClick: { }
      }
    ]
  }
}

export class TitleLeaf extends React.Component {
  styles = {
    titleCardBox: {
      height: '10em',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    title: {
      fontWeight: '100',
      fontSize: '1.7em',
      color: '#4CAF50',
      display: 'inline-block',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '100%',
      textAlign: 'center'
    } }

  render () {
    return (
      <div style={this.styles.titleCardBox}>
        <span style={this.styles.title}>{this.props.meta.title}</span>
      </div>
    )
  }
}

TitleLeaf.propTypes = {
  meta       : PropTypes.object.isRequired
}

export default TitleLeaf