/*
// ------------------------------------
// Constants
// ------------------------------------
export const PROFILE_DATA = 'USERDATA_FETCH_SUCCEEDED'

// ------------------------------------
// Actions
// ------------------------------------
export function getProfileData (data) {
  return {
    type    : PROFILE_DATA,
    payload : data
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function profileDataReducer (state = false, action) {
  return action.type === PROFILE_DATA
    ? action.payload
    : state
}
*/
