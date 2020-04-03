import {
  fetchEntries,
  fetchEntriesFailure,
  fetchEntriesSuccess
} from "./actions";

test("fetchEntries() should return the proper action type", () => {
  const action = fetchEntries();

  expect(action.type).toBe("FETCH_ENTRIES");
});

test("fetchEntriesFailure() should return the proper action type", () => {
  const action = fetchEntriesFailure();

  expect(action.type).toBe("FETCH_ENTRIES_FAILURE");
});

test("fetchEntriesSuccess() should return the proper action type", () => {
  const action = fetchEntriesSuccess([]);

  expect(action.type).toBe("FETCH_ENTRIES_SUCCESS");
});
