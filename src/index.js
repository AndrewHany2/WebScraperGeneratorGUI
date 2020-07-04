/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./history";
// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import login from "components/sign-in/SignIn";
import SignUp from "components/sign-up/SignUp";
import home from "layouts/home";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import { UserProfile } from "views/UserProfile/UserProfile.js";

const authToken = localStorage.getItem("AuthToken");
ReactDOM.render(
  <Router history={history}>
    {authToken != null ? (
      <Switch>
        <Route path="/admin" component={Admin} />
        <Redirect from="/admin" to="/admin/dashboard" />
      </Switch>
    ) : (
        <Switch>
          <Route path="/login" component={login} />
          <Route path="/signup" component={SignUp} />
          <Redirect to="/login" component={login} />
        </Switch>
      )}
  </Router>,
  document.getElementById("root")
);
