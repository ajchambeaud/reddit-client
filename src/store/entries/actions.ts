import {
  ID,
  Entry,
  FetchEntriesAction,
  EntriesSuccessAction,
  EntriesFailureAction
} from "./types";

export function fetchEntries(after?: ID): FetchEntriesAction {
  return {
    type: "FETCH_ENTRIES",
    payload: after
  };
}

export function fetchEntriesSuccess(entries: Entry[]): EntriesSuccessAction {
  return {
    type: "FETCH_ENTRIES_SUCCESS",
    payload: entries
  };
}

export function fetchEntriesFailure(): EntriesFailureAction {
  return {
    type: "FETCH_ENTRIES_FAILURE"
  };
}
