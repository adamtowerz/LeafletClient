import React from 'react'
import TextField from 'material-ui/TextField'
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
        iconName: 'more_vert',
        onClick: { showTrough: !data.showTrough }
      }
    ],
    trough: [
      {
        iconName: 'delete',
        onClick: { delete: true }
      }
    ]
  }
}

export class RawTextLeaf extends React.Component {
  styles = {
    textFieldStyles: {
      width: '100%'
    }
  }

  render () {
    return (
      <TextField
        value={this.props.data.value}
        hintText='Go Type!'
        multiLine
        rows={5}
        style={this.styles.textFieldStyles}
        onChange={(e, nv) => {
          this.props.update({ value: nv })
        }}
      />
    )
  }
}

RawTextLeaf.propTypes = {
  data       : PropTypes.object.isRequired,
  update     : PropTypes.func.isRequired
}

export default RawTextLeaf
