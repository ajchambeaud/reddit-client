import {
  ID,
  Entry,
  FetchEntriesAction,
  EntriesSuccessAction,
  EntriesFailureAction,
  DismissEntryAction,
  DismissAllAction,
  SelectEntryAction
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

export function dismissEntry(id: ID): DismissEntryAction {
  return {
    type: "DISMISS_ENTRY",
    payload: id
  };
}

export function dismissAll(): DismissAllAction {
  return {
    type: "DISMISS_ALL"
  };
}

export function selectEntry(entry: Entry): SelectEntryAction {
  return {
    type: "SELECT_ENTRY",
    payload: entry
  };
}
