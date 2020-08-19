import React, { Component } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/styles';

import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from '@material-ui/core/TextField';
import { Alert, AlertTitle } from '@material-ui/lab';
import avatar from "assets/img/faces/marc.jpg";
import axios from "axios";
import history from "../../history"



const styles = (theme) => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
});


class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      country: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: [],
      loading: false,
      alert: "",
      submitButtonAppear: true,
    };
  }

  componentWillMount = () => {
    const authToken = localStorage.getItem("AuthToken");
    if (authToken == null) {
      history.push("/login")
    }

    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .get("/user")
      .then((response) => {
        console.log(response.data);
        this.setState({
          firstName: response.data.userCredentials.firstName,
          lastName: response.data.userCredentials.lastName,
          email: response.data.userCredentials.email,
          phoneNumber: response.data.userCredentials.phoneNumber,
          country: response.data.userCredentials.country,
          username: response.data.userCredentials.username,
          uiLoading: false,
          submitButtonAppear: true
        });
      })
      .catch((error) => {
        if (error.response.status === 403) {
          this.props.history.push("/login");
        }
        console.log(error);
        this.setState({
          errors: error.response.data,
          alert: <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error.response.data.error}
          </Alert>
        });
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const newUserData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      country: this.state.country,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
    };
    const authToken = localStorage.getItem("AuthToken")
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .put("/user", newUserData)
      .then((response) => {
        this.setState({
          submitButtonAppear: false,
          alert: <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Submited successfully
          </Alert>
        });
      })
      .catch((error) => {
        this.setState({
          errors: error.response.data,
          alert: <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error.response.data.error}
          </Alert>
        });
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                <p className={classes.cardCategoryWhite}>Complete your profile</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      disabled
                      fullWidth
                      label="Username"
                      name="username"
                      value={this.state.username}
                      onChange={e => this.setState({ username: e.target.value })}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="Email Address"
                      value={this.state.email}
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      fullWidth
                      label="First name"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={e => this.setState({ firstName: e.target.value })}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      fullWidth
                      label="Last name"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={e => this.setState({ lastName: e.target.value })}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={this.state.phoneNumber}
                      onChange={e => this.setState({ phoneNumber: e.target.value })}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      fullWidth
                      label="Country"
                      name="country"
                      value={this.state.country}
                      onChange={e => this.setState({ country: e.target.value })}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                {
                  this.state.submitButtonAppear ?
                    (<Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      className={classes.submitButton}
                      onClick={this.handleSubmit}
                    >
                      Update Profile
                    </Button>) : null
                }
                {this.state.alert}
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(UserProfile);
