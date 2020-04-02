import { Entry, EntryAction, RequestStatus } from "./types";

export function fetchEntries(): EntryAction {
  console.log("fetchEntries called");

  return {
    type: "FETCH_ENTRIES"
  };
}

export function fetchEntriesSuccess(entries: Entry[]): EntryAction {
  return {
    type: "FETCH_ENTRIES_SUCCESS",
    payload: entries
  };
}

export function fetchEntriesFailure(): EntryAction {
  return {
    type: "FETCH_ENTRIES_FAILURE"
  };
}
