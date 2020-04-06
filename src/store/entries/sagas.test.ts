import { takeEvery, call, put } from "redux-saga/effects";
import { getItem, setItem } from "../../utils/storage";

import { Entry } from "./types";
import {
  fetchEntriesListener,
  fetchEntriesWorker,
  selectEntryListener,
  selectEntryWorker
} from "./sagas";
import { getEntries } from "../../utils/api";

import {
  selectEntry,
  fetchEntries,
  fetchEntriesFailure,
  fetchEntriesSuccess
} from "./actions";

const entry: Entry = {
  id: "foo",
  title: "Man trying to return a dog's toy gets tricked into playing fetch",
  author: "washedupwornout",
  created: 1411975314,
  thumbnail:
    "http://b.thumbs.redditmedia.com/9N1f7UGKM5fPZydrsgbb4_SUyyLW7A27um1VOygY3LM.jpg",
  numComments: 958,
  visited: false
};

test("fetchEntriesListener() should listen to fetchEntries action and initiate the worker", () => {
  const gen = fetchEntriesListener();
  const expectedEffect = takeEvery(fetchEntries().type, fetchEntriesWorker);

  expect(gen.next().value).toEqual(expectedEffect);
});

test("selectEntryListener() should listen to selectEntry action and initiate the worker", () => {
  const gen = selectEntryListener();
  const expectedEffect = takeEvery(selectEntry(entry).type, selectEntryWorker);

  expect(gen.next().value).toEqual(expectedEffect);
});

test("fetchEntriesWorker() should dispatch fetchEntriesFailure when api request fails", () => {
  const gen = fetchEntriesWorker(fetchEntries());

  const expectedEffect = put(fetchEntriesFailure());
  gen.next();

  expect(gen.throw(new Error("Some API Error")).value).toEqual(expectedEffect);
});

test("fetchEntriesWorker() should dispatch fetchEntriesSuccess when api request success", () => {
  const gen = fetchEntriesWorker(fetchEntries());
  const localStorageResponse: string[] = [];
  const apiResponse = [entry];

  gen.next();
  gen.next(apiResponse);

  const expectedEffect = put(fetchEntriesSuccess([entry]));

  expect(gen.next(localStorageResponse).value).toEqual(expectedEffect);
});

test("fetchEntriesWorker() should mark the data as visited when is present in localStorage", () => {
  const gen = fetchEntriesWorker(fetchEntries());
  const localStorageResponse = [entry.id];
  const apiResponse = [entry];

  gen.next();
  gen.next(apiResponse);

  const expectedEffect = put(
    fetchEntriesSuccess([{ ...entry, visited: true }])
  );

  expect(gen.next(localStorageResponse).value).toEqual(expectedEffect);
});

test("fetchEntriesWorker() should call api whit after parameter taken from action payload", () => {
  const gen = fetchEntriesWorker(fetchEntries("123"));

  const expectedEffect = call(getEntries, fetchEntries("123").payload);

  expect(gen.next().value).toEqual(expectedEffect);
});

test("selectEntryWorker() should save selected items ids in localStorage when localStorage is empty", () => {
  const gen = selectEntryWorker(selectEntry(entry));

  const expectedEffect1 = call(getItem, "visited", []);
  const expectedEffect2 = call(setItem, "visited", [entry.id]);

  expect(gen.next().value).toEqual(expectedEffect1);
  expect(gen.next([]).value).toEqual(expectedEffect2);
});

test("selectEntryWorker() should save selected items ids in localStorage has data", () => {
  const gen = selectEntryWorker(selectEntry(entry));

  const expectedEffect1 = call(getItem, "visited", []);
  const expectedEffect2 = call(setItem, "visited", ["123", entry.id]);

  expect(gen.next().value).toEqual(expectedEffect1);
  expect(gen.next(["123"]).value).toEqual(expectedEffect2);
});

test("selectEntryWorker() should do nothing if the entry has already been visited", () => {
  const gen = selectEntryWorker(selectEntry({ ...entry, visited: true }));

  expect(gen.next().value).toBeUndefined();
});
