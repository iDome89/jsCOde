import { takeLatest, call, put, delay, select, fork } from 'redux-saga/effects'

import { gameDataApi } from '../app'
import {
  PBP_START_DATA_FETCH,
  PBP_FETCH_LATEST_ERROR,
  PBP_FETCH_LATEST_SUCCESS,
} from '../actions/constants'
import { receiveLatestPBP, setPlayData } from '../actions/pbp'
import { getPbp } from '../selectors/pbp'
import { getCurrentGame } from '../selectors/game'

function* fetchLatestPlayNumber(action) {
  while (true) {
    const { currentPlay } = yield select(getPbp)

    try {
      const latest = yield call(
        [gameDataApi, gameDataApi.get],
        `/${action.payload.gameId}/latest.json?_=${Date.now()}`
      )

      if (!currentPlay || currentPlay.lastplayloaded < latest) {
        yield put(receiveLatestPBP(latest))
      }
    } catch(error) {
      yield put({ type: PBP_FETCH_LATEST_ERROR, payload: { data: error } })
    }

    yield delay(30000)
  }
}

function* fetchLatestPlayNumberSaga() {
  yield takeLatest(PBP_START_DATA_FETCH, fetchLatestPlayNumber)
}

function* fetchLatestPlayData(action) {
  const { gameData } = yield select(getCurrentGame)

  try {
    const data = yield call(
      [gameDataApi, gameDataApi.get],
      `/${gameData.id}/play${action.payload}.json?_=${Date.now()}`
    )

    yield put(setPlayData(data))
  } catch(ignore) {
    // play doesn't exist yet, ignore
  }
}

function* fetchLatestPlayDataSaga() {
  yield takeLatest(PBP_FETCH_LATEST_SUCCESS, fetchLatestPlayData)
}

export function* pbpSaga() {
  yield fork(fetchLatestPlayNumberSaga)
  yield fork(fetchLatestPlayDataSaga)
}
