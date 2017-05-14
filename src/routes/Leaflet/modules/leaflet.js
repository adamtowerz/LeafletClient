import update from 'react-addons-update'

// ------------------------------------
// Constants
// ------------------------------------
export const NEW_LEAF = 'NEW_LEAF'
export const SORT_LEAVES_LIST = 'SORT_LEAVES_LIST'
export const DELETE_LEAF = 'DELETE_LEAF'
export const UPDATE_LEAF_DATA = 'UPDATE_LEAF_DATA'

export const NEW_PAGE = 'NEW_PAGE'
export const SELECT_PAGE = 'SELECT_PAGE'
export const TOGGLE_PAGE_FAV = 'TOGGLE_PAGE_FAV'

export const NEW_SECTION = 'NEW_SECTION'

// ------------------------------------
// Actions
// ------------------------------------
export function newLeaf (leafType = 'title') {
  return {
    type    : NEW_LEAF,
    payload : leafType
  }
}

export function sortLeavesList (list) {
  return {
    type    : SORT_LEAVES_LIST,
    payload : {
      list: list
    }
  }
}

export function updateLeafData (leafID, data = false) {
  if (leafID && data) {
    if (data.delete) { // if data has a true delete flag, delete the leaf
      return {
        type    : DELETE_LEAF,
        id      : leafID
      }
    } else { // otherwise update data as normal
      return {
        type    : UPDATE_LEAF_DATA,
        id      : leafID,
        payload : data
      }
    }
  } else {
    console.log('no data, update would change nothing')
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

export function togglePageFavorite (position = false) {
  if (position) {
    return {
      type    : TOGGLE_PAGE_FAV,
      payload : position
    }
  } else {
    console.log('no position, impossible to selectPage')
  }
}

export function newPage (title, sectionPosition = false) {
  console.log('title: ' + title)
  console.log(sectionPosition)
  return {
    type : NEW_PAGE,
    payload : {
      title: title,
      sectionPosition: sectionPosition
    }
  }
}

export function newSection (title) {
  return {
    type: NEW_SECTION,
    payload: title
  }
}

export const actions = {
  newLeaf,
  sortLeavesList,
  selectPage,
  updateLeafData,
  newPage,
  newSection
}

function idGenerator () {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [NEW_LEAF]         : (state, action) => {
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
                    leafID: idGenerator(), // TODO: send unqiue IDs
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
  [SORT_LEAVES_LIST] : (state, action) => {
    console.log(action)
    const active = state.activePage
    if (active) {
      return update(state, {
        sections: {
          [active[0]]: {
            pages: {
              [active[1]]: {
                leaves: {
                  $set: action.payload.list
                }
              }
            }
          }
        }
      })
    } else {
      console.log('no activePage, impossible to sort leaves')
      return state
    }
  },
  [DELETE_LEAF]      : (state, action) => {
    const active = state.activePage
    let leafIndex
    state.sections[active[0]].pages[active[1]].leaves.map((leaf, i) => {
      if (leaf.leafID === action.id) {
        leafIndex = i
      }
    })
    if (active) {
      return update(state, {
        sections: {
          [active[0]]: {
            pages: {
              [active[1]]: {
                leaves: {
                  $splice: [[leafIndex, 1]]
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
  [SELECT_PAGE]      : (state, action) => {
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
  [NEW_PAGE]         : (state, action) => {
    const position = !(action.payload.sectionPosition === false) ? action.payload.sectionPosition : state.activePage[0]
    // the conditionals are messy as (0) is false
    if (!(position === false)) {
      return update(state, {
        sections: {
          [position]: {
            pages: {
              $push: [{
                title: action.payload.title,
                isFavorited: false,
                leaves: []
              }]
            }
          }
        }
      })
    } else {
      console.log('no position, impossible to add page')
      return state
    }
  },
  [TOGGLE_PAGE_FAV]  : (state, action) => {
    const position = action.payload
    if (action.payload) {
      return update(state, {
        sections: {
          [position[0]]: {
            pages: {
              [position[1]]: {
                isFavorited: {
                  $set: !state.sections[position[0]].pages[position[1]].isFavorited
                }
              }
            }
          }
        }
      })
    } else {
      return state
    }
  },
  [UPDATE_LEAF_DATA] : (state, action) => {
    const active = state.activePage
    let leafLoc = -1
    let prevData = {}
    state.sections[active[0]].pages[active[1]].leaves.map((leaf, i) => {
      if (leaf.leafID === action.id) {
        leafLoc = i
        prevData = leaf.leafData
      }
    })
    if (leafLoc === -1) {
      console.log('could not locate leaf in UPDATE_LEAF_DATA, erroring gracefully')
      return state
    }
    return update(state, {
      sections: {
        [active[0]]: {
          pages: {
            [active[1]]: {
              leaves: {
                [leafLoc] : {
                  leafData: {
                    $set: { ...prevData, ...action.payload }
                  }
                }
              }
            }
          }
        }
      }
    })
  },
  [NEW_SECTION]      : (state, action) => {
    return update(state, {
      sections: {
        $push: [{
          title: action.payload,
          pages: []
        }]
      }
    })
  }
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
