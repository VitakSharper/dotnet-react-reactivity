import {takeEvery, put, call} from 'redux-saga/effects'
import ActivityActionTypes from "./activity.types";
import {dataNormalizeToObject} from "../backend.utils";
import httpActivities from "./activity.http";

import {fetchActivitiesSuccess, addActivitySuccess, editExistingActivitySuccess, failure} from "./activity.actions";

export function* fetchActivitiesAsync() {
    try {
        const response = yield httpActivities.list();
        const normalizedData = yield  call(dataNormalizeToObject, response);
        yield put(fetchActivitiesSuccess(normalizedData));
    } catch (e) {
        yield put(failure(e))
    }
}

export function* addNewActivityAsync({payload}) {
    try {
        yield httpActivities.create(payload);
        yield put(addActivitySuccess(payload));
    } catch (e) {
        yield put(failure(e))
    }
}

export function* editExistingActivityAsync({payload}) {
    try {
        yield httpActivities.update(payload);
        yield put(editExistingActivitySuccess(payload))
    } catch (e) {
        yield put(failure(e))
    }
}

export function* fetchActivitiesStart() {
    yield takeEvery(ActivityActionTypes.FETCH_ACTIVITIES_START, fetchActivitiesAsync)
}

export function* addNewActivity() {
    yield takeEvery(ActivityActionTypes.ADD_ACTIVITY_START, addNewActivityAsync)
}

export function* editExistingActivity() {
    yield takeEvery(ActivityActionTypes.EDIT_EXISTING_ACTIVITY_START, editExistingActivityAsync)
}
