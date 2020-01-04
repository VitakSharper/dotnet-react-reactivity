import {takeEvery, put, call} from 'redux-saga/effects'
import ActivityActionTypes from "./activity.types";
import {dataNormalizeToObject} from "../backend.utils";
import axios from "axios";

import {fetchActivitiesSuccess, fetchActivitiesError} from "./activity.actions";

export function* fetchActivitiesAsync() {
    try {
        const response = yield axios.get('http://localhost:5000/api/activities');
        const normalizedData = yield  call(dataNormalizeToObject, response.data);
        yield put(fetchActivitiesSuccess(normalizedData));
    } catch (e) {
        yield put(fetchActivitiesError(e))
    }
}

export function* fetchActivitiesStart() {
    yield takeEvery(ActivityActionTypes.FETCH_ACTIVITIES_START, fetchActivitiesAsync)
}
