import {takeEvery, put} from 'redux-saga/effects'
import ActivityActionTypes from "./activity.types";
import axios from "axios";

import {fetchActivitiesSuccess, fetchActivitiesError} from "./activity.actions";

export function* fetchActivitiesAsync() {
    try {
        const response = yield axios.get('http://localhost:5000/api/activities');
        yield put(fetchActivitiesSuccess(response.data));
    } catch (e) {
        yield put(fetchActivitiesError(e))
    }
}

export function* fetchActivitiesStart() {
    yield takeEvery(ActivityActionTypes.FETCH_ACTIVITIES_START, fetchActivitiesAsync)
}
