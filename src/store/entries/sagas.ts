import { takeEvery, call, put } from "redux-saga/effects";
import { EntryAction } from "./types";
import { getEntries } from "../../utils/api";
import {
  fetchEntries,
  fetchEntriesSuccess,
  fetchEntriesFailure
} from "./actions";

export function* fetchEntriesWorker(action: EntryAction) {
  try {
    const data = yield call(getEntries);
    yield put(fetchEntriesSuccess(data));
  } catch (error) {
    yield put(fetchEntriesFailure());
  }
}

export function* fetchEntriesListener() {
  yield takeEvery(fetchEntries().type, fetchEntriesWorker);
}
