import { EntryAction, EntriesState } from "./types";

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
      return {
        ...state,
        list: [...state.list, ...action.payload],
        status: "Success"
      };

    case "FETCH_ENTRIES_FAILURE":
      return { ...state, status: "Failure" };

    case "DISMISS_ENTRY":
      return {
        ...state,
        list: state.list.filter(entry => entry.id !== action.payload)
      };

    case "DISMISS_ALL":
      return {
        ...state,
        list: []
      };

    case "SELECT_ENTRY":
      return {
        ...state,
        selected: state.list.find(entry => entry.id === action.payload.id),
        list: action.payload.visited
          ? state.list
          : state.list.map(entry =>
              entry.id === action.payload.id
                ? { ...entry, visited: true }
                : entry
            )
      };

    default:
      return state;
  }
}
