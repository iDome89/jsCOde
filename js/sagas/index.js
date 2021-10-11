import { fork } from 'redux-saga/effects'

import { pbpSaga } from './pbp'
import { liveScoresSaga } from './livescores'

function* mainSaga() {
  yield fork(pbpSaga)
  yield fork(liveScoresSaga)
}

export default mainSaga