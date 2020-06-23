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
import SignIn from "components/sign-in/SignIn";
import SignUp from "components/sign-up/SignUp";


import "assets/css/material-dashboard-react.css?v=1.9.0";
import { UserProfile } from "views/UserProfile/UserProfile.js";

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/rtl" component={RTL} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      {/* <Route path="/user" component={UserProfile} /> */}
      <Redirect from="/" to="/signin" />
      {/* <Redirect from="/signin" to="/admin/dashboard" /> */}
    </Switch>
  </Router>,
  document.getElementById("root")
);
