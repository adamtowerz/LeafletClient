import React from 'react'
import 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/theme/solarized_dark'

export default {
  template: (data, styles, update, meta) => (<AceEditor
    value={data.value}
    mode='javascript'
    theme='solarized_dark'
    onChange={(nv) => {
      update({ value: nv })
    }}
    name='xd'
    fontSize={16}
    showGutter={false}
    width='100%'
    height='10em'
    minLines={5}
    style={{
      overflowX: 'visible'
    }}
    editorProps={{
      $blockScrolling: true
    }}
  />),
  styles: (data) => ({}),
  actions: (data) => ({
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
        iconName: 'games',
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
        iconName: 'place',
        onClick: { }
      }
    ]
  })
}
