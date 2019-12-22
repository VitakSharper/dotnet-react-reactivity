import {all, call} from 'redux-saga/effects'
import {fetchActivitiesStart} from "./activities/activity.sagas";

export default function* rootSaga() {
    yield all([
        call(fetchActivitiesStart)
    ])
}
