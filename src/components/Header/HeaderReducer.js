import update from 'react-addons-update'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_DRAWER = 'SET_DRAWER'

// ------------------------------------
// Actions
// ------------------------------------
export function setDrawer (value) {
  return {
    type: SET_DRAWER,
    payload: value
  }
}

export const actions = {
  setDrawer
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
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
let initialState = {
  'openDrawer': false
}

export default function headerReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
