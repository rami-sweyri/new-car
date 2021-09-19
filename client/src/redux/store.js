import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import rootReducers from "./reducers/rootReducers";
const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);
export default store;
