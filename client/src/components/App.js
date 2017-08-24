import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import { connect } from "react-redux";
import * as actions from "../actions/index";

import Landing from "./Landing";

const survey = () => {
  return (
    <div>
      {" "}<h1> Dashboard</h1>
    </div>
  );
};
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact={true} path="/" component={Landing} />
          <Route exact path="/surveys" component={survey} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
