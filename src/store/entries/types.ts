export type RequestStatus = "NotAsked" | "Pending" | "Success" | "Failure";

export interface Entry {
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

interface FetchEntriesAction {
  type: "FETCH_ENTRIES";
}

interface EntriesSuccessAction {
  type: "FETCH_ENTRIES_SUCCESS";
  payload: Entry[];
}

interface EntriesFailureAction {
  type: "FETCH_ENTRIES_FAILURE";
}

export type EntryAction =
  | FetchEntriesAction
  | EntriesSuccessAction
  | EntriesFailureAction;
