import { createStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware } from "redux";
import sagas from "./sagas";
import rootReducers from "./reducers";

const sagaMiddleware = createSagaMiddleware();

function configureAppStore(preloadedState) {
  const middlewares = [sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducers, preloadedState, composedEnhancers);

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./reducers.js", () =>
      store.replaceReducer(rootReducers)
    );
  }

  return store;
}

const store = configureAppStore({});

export default store;

sagaMiddleware.run(sagas);
