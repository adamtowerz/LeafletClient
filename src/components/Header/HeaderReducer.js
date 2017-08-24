import update from 'react-addons-update'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_DRAWER = 'SET_DRAWER'
export const SET_TITLE = 'SET_TITLE'

// ------------------------------------
// Actions
// ------------------------------------
export function setDrawer (value) {
  return {
    type: SET_DRAWER,
    payload: value
  }
}

export function setTitle (value) {
  return {
    type: SET_TITLE,
    payload: value
  }
}

export const actions = {
  setDrawer,
  setTitle
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_DRAWER]       : (state, action) => {
    return update(state, {
      openDrawer: {
        $set: action.payload
      }
    })
  },
  [SET_TITLE]       : (state, action) => {
    return update(state, {
      title: {
        $set: action.payload
      }
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
let initialState = {
  'title': 'Notebook',
  'openDrawer': false
}

export default function headerReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
