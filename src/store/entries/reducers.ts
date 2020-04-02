import { EntryAction, EntriesState, RequestStatus } from "./types";

const initialState: EntriesState = {
  status: "NotAsked",
  list: []
};

export function entriesReducer(
  state = initialState,
  action: EntryAction
): EntriesState {
  switch (action.type) {
    case "FETCH_ENTRIES":
      return { ...state, status: "Pending" };

    case "FETCH_ENTRIES_SUCCESS":
      return { list: action.payload, status: "Success" };

    case "FETCH_ENTRIES_FAILURE":
      return { list: [], status: "Failure" };

    default:
      return state;
  }
}
