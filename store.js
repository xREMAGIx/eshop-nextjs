import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";

const loggerMiddleware = createLogger();

// CREATING INITIAL STORE
export default (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunkMiddleware))
  );

  // IF REDUCERS WERE CHANGED, RELOAD WITH INITIAL STATE
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const createNextReducer = require("./reducers").default;

      store.replaceReducer(createNextReducer(initialState));
    });
  }

  return store;
};
