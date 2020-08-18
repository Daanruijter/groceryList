import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./store/reducers/rootReducer";
import { Provider } from "react-redux";

import "./Menu.css";

import thunk from "redux-thunk";
{
  interface IntrinsicAttributes {
    store: any;
  }
}
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const provider = (
  <Provider store={store}>
    <React.StrictMode>{/* <App store={store} /> */}</React.StrictMode>,
  </Provider>
);

ReactDOM.render(provider, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export default store;
