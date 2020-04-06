import { takeEvery, call, put } from "redux-saga/effects";
import { getItem, setItem } from "../../utils/storage";
import { FetchEntriesAction, SelectEntryAction, Entry } from "./types";
import { getEntries } from "../../utils/api";
import { fetchEntriesSuccess, fetchEntriesFailure } from "./actions";

/*
 * fetchEntriesWorker:
 * - fetch entries from reddit api
 * - load visited ids interpolated these with api data before sending data to store
 */
export function* fetchEntriesWorker(action: FetchEntriesAction) {
  try {
    const data = yield call(getEntries, action.payload);
    const visited = yield call(getItem, "visited", []);

    if (visited.length === 0) {
      return yield put(fetchEntriesSuccess(data));
    }

    const dataWithVisited = data.map((entry: Entry) => {
      if (visited.find((id: string) => entry.id === id)) {
        return { ...entry, visited: true };
      }

      return entry;
    });

    yield put(fetchEntriesSuccess(dataWithVisited));
  } catch (error) {
    yield put(fetchEntriesFailure());
  }
}

/*
 * selectEntryWorker: Saves  visited entries ids to localStorage
 */
export function* selectEntryWorker(action: SelectEntryAction) {
  if (action.payload.visited) {
    return;
  }

  try {
    const visited = yield call(getItem, "visited", []);

    if (visited.length > 0) {
      const nextVisited = [...visited, action.payload.id];
      yield call(setItem, "visited", nextVisited);
    } else {
      yield call(setItem, "visited", [action.payload.id]);
    }
  } catch (error) {
    console.error("Error saving data to localStorage");
  }
}

export function* fetchEntriesListener() {
  yield takeEvery("FETCH_ENTRIES", fetchEntriesWorker);
}

export function* selectEntryListener() {
  yield takeEvery("SELECT_ENTRY", selectEntryWorker);
}
