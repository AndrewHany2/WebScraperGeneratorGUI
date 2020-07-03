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
import Login from "components/sign-in/SignIn";
import SignUp from "components/sign-up/SignUp";
import home from "layouts/home";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import { UserProfile } from "views/UserProfile/UserProfile.js";

class Main extends Component {

  constructor(props) {
      super(props)

      this.state = {
          loggedIn: (localStorage.getItem("AuthToken") !== null),
      }
  }

  loginSuccessHandler = (e) => this.setState({ loggedIn: true });

  render() {
      return (
          <Router history={history}>
          {this.state.loggedIn !== null ? (
            <Switch>
              <Route path="/admin" component={Admin} />
              <Redirect from="/admin" to="/admin/dashboard" />
            </Switch>
          ) : (
              <Switch>
                <Route path="/login" render={(props) => <Login onLoginSuccess={this.loginSuccessHandler} />} />
                <Route path="/signup" component={SignUp} />
                <Redirect to="/login" render={(props) => <Login onLoginSuccess={this.loginSuccessHandler} />} />
              </Switch>
            )}
        </Router>
      );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById("root")
);
