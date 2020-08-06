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


import avatar from "assets/img/faces/marc.jpg";
import axios from "axios";


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
    };
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
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
      phoneNumber: this.state.phoneNumber
      // username: this.state.username,ٍ
    };
    axios
      .post("/user", newUserData)
      .then((response) => {
        localStorage.setItem("AuthToken", `Bearer ${response.data.token}`);
        this.setState({
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          errors: error.response.data,
          loading: false,
        });
      });
    console.log(newUserData)
  };

  render(){
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
                  {/* <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Username"
                      id="username"
                      onChange={this.handleChange}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem> */}
                  
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
											fullWidth
											label="Phone Number"
											name="phone"
											value={this.state.phoneNumber}
											onChange={this.handleChange}
										/>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
									  	fullWidth
									  	label="First name"
									  	name="firstName"
									  	value={this.state.firstName}
									  	onChange={this.handleChange}
									  	/>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
									  	fullWidth
									  	label="Last name"
									  	name="lastName"
									  	value={this.state.lastName}
									  	onChange={this.handleChange}
									  />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
											fullWidth
											label="Country"
											name="country"
											value={this.state.country}
											onChange={this.handleChange}
										/>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button 
                color="primary"
                variant="contained"
                type="submit"
                className={classes.submitButton}
                onClick={this.handleSubmit}
                >
                  Update Profile
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(UserProfile);
