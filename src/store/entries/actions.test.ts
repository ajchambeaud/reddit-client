import {
  fetchEntries,
  fetchEntriesFailure,
  fetchEntriesSuccess,
  dismissEntry,
  dismissAll
} from "./actions";

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
