export type RequestStatus = "NotAsked" | "Pending" | "Success" | "Failure";

export type ID = string;

export interface Entry {
  id: ID;
  title: string;
  author: string;
  created: number;
  thumbnail: string;
  numComments: number;
  visited: boolean;
}

export interface EntriesState {
  list: Entry[];
  status: RequestStatus;
  selected?: Entry;
}

export interface FetchEntriesAction {
  type: "FETCH_ENTRIES";
  payload?: ID;
}

export interface EntriesSuccessAction {
  type: "FETCH_ENTRIES_SUCCESS";
  payload: Entry[];
}

export interface EntriesFailureAction {
  type: "FETCH_ENTRIES_FAILURE";
}

export interface DismissEntryAction {
  type: "DISMISS_ENTRY";
  payload: ID;
}

export interface DismissAllAction {
  type: "DISMISS_ALL";
}

export interface SelectEntryAction {
  type: "SELECT_ENTRY";
  payload: Entry;
}

export type EntryAction =
  | FetchEntriesAction
  | EntriesSuccessAction
  | EntriesFailureAction
  | DismissEntryAction
  | DismissAllAction
  | SelectEntryAction;
