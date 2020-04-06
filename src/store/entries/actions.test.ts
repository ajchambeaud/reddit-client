import {
  fetchEntries,
  fetchEntriesFailure,
  fetchEntriesSuccess,
  dismissEntry,
  dismissAll,
  selectEntry
} from "./actions";

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

test("fetchEntries() should return the proper action type", () => {
  const action = fetchEntries();

  expect(action.type).toBe("FETCH_ENTRIES");
});

test("fetchEntries() should return no payload if called without after parameter", () => {
  const action = fetchEntries();

  expect(action.type).toBe("FETCH_ENTRIES");
  expect(action.payload).toBeUndefined();
});

test("fetchEntries() should return after in payload if called with after parameter", () => {
  const id = "asd";
  const action = fetchEntries(id);

  expect(action.type).toBe("FETCH_ENTRIES");
  expect(action.payload).toBe(id);
});

test("fetchEntriesFailure() should return the proper action type", () => {
  const action = fetchEntriesFailure();

  expect(action.type).toBe("FETCH_ENTRIES_FAILURE");
});

test("fetchEntriesSuccess() should return the proper action type", () => {
  const action = fetchEntriesSuccess([]);

  expect(action.type).toBe("FETCH_ENTRIES_SUCCESS");
});

test("dismissEntry() should return the proper action type and payload", () => {
  const action = dismissEntry("123");

  expect(action.type).toBe("DISMISS_ENTRY");
  expect(action.payload).toBe("123");
});

test("dismissEntry() should return the proper action type", () => {
  const action = dismissAll();

  expect(action.type).toBe("DISMISS_ALL");
});

test("selectEntry() should return the proper action type and payload", () => {
  const action = selectEntry(entry);

  expect(action.type).toBe("SELECT_ENTRY");
  expect(action.payload).toBe(entry);
});
