import { EntriesState, Entry } from "./types";
import { entriesReducer } from "./reducers";
import {
  fetchEntries,
  fetchEntriesFailure,
  fetchEntriesSuccess
} from "./actions";

const initialState: EntriesState = {
  status: "NotAsked",
  list: []
};

const entry: Entry = {
  title: "Man trying to return a dog's toy gets tricked into playing fetch",
  author: "washedupwornout",
  created: 1411975314,
  thumbnail:
    "http://b.thumbs.redditmedia.com/9N1f7UGKM5fPZydrsgbb4_SUyyLW7A27um1VOygY3LM.jpg",
  numComments: 958,
  visited: false
};

test("entriesReducer() should set status to Pending when FETCH_ENTRIES is dispatched", () => {
  const state = entriesReducer(initialState, fetchEntries());

  expect(state.status).toBe("Pending");
});

test("entriesReducer() should set status to Success when FETCH_ENTRIES_SUCCESS is dispatched", () => {
  const state = entriesReducer(initialState, fetchEntriesSuccess([]));

  expect(state.status).toBe("Success");
});

test("entriesReducer() should set status to Failure when FETCH_ENTRIES_FAILURE is dispatched", () => {
  const state = entriesReducer(initialState, fetchEntriesFailure());

  expect(state.status).toBe("Failure");
});

test("entriesReducer() should set the entries list when fetchEntriesSuccess is dispatched", () => {
  const state = entriesReducer(initialState, fetchEntriesSuccess([entry]));

  expect(state.list).toContain(entry);
});

test("entriesReducer() should reset the entries list when fetchEntriesFailure is dispatched", () => {
  const state1 = entriesReducer(initialState, fetchEntriesSuccess([entry]));
  const state2 = entriesReducer(state1, fetchEntriesFailure());

  expect(state2.list.length).toBe(0);
});