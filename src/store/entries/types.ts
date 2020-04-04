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

export type EntryAction =
  | FetchEntriesAction
  | EntriesSuccessAction
  | EntriesFailureAction;
