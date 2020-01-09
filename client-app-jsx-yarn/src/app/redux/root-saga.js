import {all, call} from 'redux-saga/effects'
import {
    fetchActivitiesStart,
    addNewActivity,
    editExistingActivity,
    removeExistingActivity
} from "./activities/activity.sagas";

export default function* rootSaga() {
    yield all([
        call(fetchActivitiesStart),
        call(addNewActivity),
        call(editExistingActivity),
        call(removeExistingActivity)
    ])
}
