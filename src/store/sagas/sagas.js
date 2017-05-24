/*
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser (action) {
  try {
    const user = yield call(fetchUserData)
    yield put({ type: 'USERDATA_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    yield put({ type: 'USERDATA_FETCH_FAILED', message: e.message })
  }
}

let fetchUserData = () => {
  axios.get('/api/user_data')
  .then(function (response) {
    console.log('axios response')
    console.log(response)
  })
  .catch(function (error) {
    console.log('axios error')
    console.log(error)
  })
}

  // Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  // Allows concurrent fetches of user.

function* userDataSaga () {
  yield takeEvery('USER_FETCH_REQUESTED', fetchUser)
}

export default userDataSaga
*/
