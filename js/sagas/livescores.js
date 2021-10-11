import { takeLatest, delay, call, put } from 'redux-saga/effects'

import { LIVESCORES_FETCH_REQUEST } from '../actions/constants'
import { fetchLiveScoresSuccess, fetchLiveScoresError } from '../actions/livescores'
import { JsonApi } from '../utils/api'

const getLiveScoresFileBasedOnEnv = () => {
  const queryString = window.location.search;
  const parameters = new URLSearchParams(queryString);
  const url = parameters.get('livescores');
  if (url) return `/${url}`;

  if(process.env.NODE_ENV === 'development') return '/livescores.json'

  return '/livescores.json'
}

/*
function* liveScoresWatcher() {
  let lastUpdate

  while(true) {
    try {
      const liveScores = yield call(
        [gameDataApi, gameDataApi.get],
        `${getLiveScoresFileBasedOnEnv()}?_=${Date.now()}`
      )

      lastUpdate = Date.now()

      if(liveScores) {
        yield put(setLiveScores(liveScores))
      }
    } catch(ignore) {
      //ignore
    }

    // if the difference is bigger than 15s it means that the page was in background,
    // for example if safari was closed on mobile
    if(lastUpdate - Date.now() < 15000) {
      yield delay(15000)
    }
  }
}
*/

function* fetchLiveScores() {
  while(true) {
    try {
      const liveScores = yield call([JsonApi, JsonApi.get], getLiveScoresFileBasedOnEnv())

      yield put(fetchLiveScoresSuccess(liveScores))
    } catch(e) {
      yield put(fetchLiveScoresError(e))
    } finally {
      yield delay(30000)
    }
  }
}

export function* liveScoresSaga() {
  yield takeLatest(LIVESCORES_FETCH_REQUEST, fetchLiveScores)
}
