import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { entriesReducer } from "./entries/reducers";
import { fetchEntriesWorker, fetchEntriesListener } from "./entries/sagas";

const rootReducer = combineReducers({
  entries: entriesReducer
});

function* rootSaga() {
  yield all([fetchEntriesListener()]);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
