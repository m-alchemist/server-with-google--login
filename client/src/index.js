import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";
import "materialize-css/dist/css/materialize.min.css";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//two different ways of stating exact=true
ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
console.log("stripe key is", process.env.REACT_APP_STRIPEPUBLISHABLEKEY);
console.log("environment is ", process.env.NODE_ENV);
