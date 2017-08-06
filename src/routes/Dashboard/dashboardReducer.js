import update from 'react-addons-update'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_FILTER_TYPE = 'SET_FILTER_TYPE'

// ------------------------------------
// Actions
// ------------------------------------
export function setFilterType (value = 'All Leaflets') {
  return {
    type    : SET_FILTER_TYPE,
    payload : value
  }
}

export const actions = {
  SET_FILTER_TYPE
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_FILTER_TYPE]    : (state, action) => {
    return update(state, {
      filterType: {
        $set: action.payload
      }
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  filterType: 'All Leaflets'
}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
