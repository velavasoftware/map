import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import WebLayout from "./layout/web";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/web" render={props => <WebLayout {...props} />} />
      <Redirect from="/" to="/web/index" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
