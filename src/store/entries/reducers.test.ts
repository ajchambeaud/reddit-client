import { EntriesState, Entry } from "./types";
import { entriesReducer } from "./reducers";
import {
  fetchEntries,
  fetchEntriesFailure,
  fetchEntriesSuccess,
  dismissEntry,
  dismissAll,
  selectEntry
} from "./actions";

const initialState: EntriesState = {
  status: "NotAsked",
  list: []
};

const entry: Entry = {
  id: "t3_2hqlxp",
  title: "Man trying to return a dog's toy gets tricked into playing fetch",
  author: "washedupwornout",
  created: 1411975314,
  thumbnail:
    "http://b.thumbs.redditmedia.com/9N1f7UGKM5fPZydrsgbb4_SUyyLW7A27um1VOygY3LM.jpg",
  numComments: 958,
  visited: false
};

test("entriesReducer() should set status to Pending when fetchEntries is dispatched", () => {
  const state = entriesReducer(initialState, fetchEntries());

  expect(state.status).toBe("Pending");
});

test("entriesReducer() should set status to Success when fetchEntriesSuccess is dispatched", () => {
  const state = entriesReducer(initialState, fetchEntriesSuccess([]));

  expect(state.status).toBe("Success");
});

test("entriesReducer() should set status to Failure when fetchEntriesFailure is dispatched", () => {
  const state = entriesReducer(initialState, fetchEntriesFailure());

  expect(state.status).toBe("Failure");
});

test("entriesReducer() should set the entries list when fetchEntriesSuccess is dispatched", () => {
  const state = entriesReducer(initialState, fetchEntriesSuccess([entry]));

  expect(state.list).toContain(entry);
});

test("entriesReducer() should not reset the entries list when fetchEntriesFailure is dispatched", () => {
  const state1 = entriesReducer(initialState, fetchEntriesSuccess([entry]));
  const state2 = entriesReducer(state1, fetchEntriesFailure());

  expect(state2.list.length).toBe(1);
});

test("entriesReducer() should remove item from list when dismissEntry is dispatched", () => {
  const entry1 = { ...entry };
  const entry2 = { ...entry, id: "123" };
  const state1 = { ...initialState, list: [entry1, entry2] };

  const action = dismissEntry(entry1.id);
  const state2 = entriesReducer(state1, action);

  expect(state2.list.length).toBe(1);
  expect(state2.list[0].id).toBe(entry2.id);
});

test("entriesReducer() should remove all item from list when dismissAll is dispatched", () => {
  const entry1 = { ...entry };
  const entry2 = { ...entry, id: "123" };
  const state1 = { ...initialState, list: [entry1, entry2] };

  const action = dismissAll();
  const state2 = entriesReducer(state1, action);

  expect(state2.list.length).toBe(0);
});

test("entriesReducer() should select the right item when selectEntry is dispatched", () => {
  const entry1 = { ...entry };
  const entry2 = { ...entry, id: "123" };
  const state1 = { ...initialState, list: [entry1, entry2] };

  const action = selectEntry(entry1);
  const state2 = entriesReducer(state1, action);

  expect(state2.selected).toBe(entry1);
  expect(
    state2.list.find((entry: Entry) => entry.id === entry1.id)?.visited
  ).toBe(true);
});
