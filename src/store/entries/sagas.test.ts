import { Entry } from "./types";
import { fetchEntriesListener, fetchEntriesWorker } from "./sagas";
import { takeEvery, call, put } from "redux-saga/effects";
import {
  fetchEntries,
  fetchEntriesFailure,
  fetchEntriesSuccess
} from "./actions";

const entry: Entry = {
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

test("fetchEntriesWorker() should dispatch fetchEntriesFailure when api request fails", () => {
  const gen = fetchEntriesWorker(fetchEntries());

  const expectedEffect = put(fetchEntriesFailure());
  gen.next();

  expect(gen.throw(new Error("Some API Error")).value).toEqual(expectedEffect);
});

test("fetchEntriesWorker() should dispatch fetchEntriesSuccess when api request success", () => {
  const gen = fetchEntriesWorker(fetchEntries());

  const expectedEffect = put(fetchEntriesSuccess([entry]));
  gen.next();

  expect(gen.next([entry]).value).toEqual(expectedEffect);
});
