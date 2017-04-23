import update from 'react-addons-update'

// ------------------------------------
// Constants
// ------------------------------------
export const NEW_LEAF = 'NEW_LEAF'
export const SELECT_PAGE = 'SELECT_PAGE'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'

// ------------------------------------
// Actions
// ------------------------------------
export function newLeaf (leafType = 'title') {
  return {
    type    : NEW_LEAF,
    payload : leafType
  }
}

export function selectPage (position = false) {
  if (position) {
    return {
      type    : SELECT_PAGE,
      payload : position
    }
  } else {
    console.log('no position, impossible to selectPage')
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type    : COUNTER_DOUBLE_ASYNC,
          payload : getState().counter
        })
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  newLeaf,
  selectPage,
  doubleAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [NEW_LEAF]             : (state, action) => {
    const active = state.activePage
    if (active) {
      return update(state, {
        sections: {
          [active[0]]: {
            pages: {
              [active[1]]: {
                leaves: {
                  $push: [{
                    leafType: action.payload,
                    leafID: '123abc', // TODO: send unqiue IDs
                    leafData: {}
                  }]
                }
              }
            }
          }
        }
      })
    } else {
      console.log('no activePage, impossible to add leaf')
      return state
    }
  },
  [SELECT_PAGE]             : (state, action) => {
    if (action.payload) {
      return update(state, {
        activePage: {
          $set: action.payload
        }
      })
    } else {
      return state
    }
  },
  [COUNTER_DOUBLE_ASYNC] : (state, action) => state * 2
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  title: 'Default Title',
  sections: [
    { title: '10.3',
      pages: [
          { title: '10.3.1 Molecular Dynamics', isFavorited: false, leaves: [] },
          { title: '10.3.2 High Temperature Interactions', isFavorited: true, leaves: [] },
          { title: '10.3.3 High Pressure Systems', isFavorited: false, leaves: [] }
      ]
    },
    { title: '10.4',
      pages: [
          { title: '10.4.1 Integrating Factor Technique', isFavorited: false, leaves: [] }
      ]
    }
  ],
  activePage : false // [section#, page#] section position in sections, then page position in section's page
}

export default function leafletReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
