import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import fire from "./../../firebase";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { card } from "assets/jss/material-dashboard-react";
import MainInfo from "./../../components/MainInfo/MainInfo";
import MyExpantionPanel from "./../../components/MyExpantionPanel/MyExpantionPanel";
import Route from "../../components/Route/Route";
import Program from "./../../components/Program/Program";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import openScraper from '../../global'
import Definition from "components/Definition/Definition";
import { withStyles } from '@material-ui/styles';
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


class Schema extends Component {
  state = {
    finalValue: [],
    body: '',
    title: 'schema',
    username: '',
  };

  checkIfDuplicated = (values) => {
    var arr = this.state.finalValue;
    for (let i in arr) {
      var firstObj = values;
      var secondObj = arr[i];
      if (JSON.stringify(firstObj) === JSON.stringify(secondObj)) return true;
    }
  };

  checkIfDuplicated = (values) => {
    var arr = this.state.finalValue;
    for (let i in arr) {
      var firstObj = values;
      var secondObj = arr[i];
      if (JSON.stringify(firstObj) === JSON.stringify(secondObj)) return true;
    }
  };

  handleSent = (values) => {
    if (!this.checkIfDuplicated(values) && values.length != 0) {
      var temp = [...this.state.finalValue, values];
      this.setState({ finalValue: temp });
    }
  };

  handleSubmit = () => {
    
  };

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Schema</h4>
              <p className={classes.cardCategoryWhite}>
                Complete your Schema
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <ThemeProvider>
                    <form noValidate autoComplete="off">
                      <div>
                        <MainInfo></MainInfo>
                        <Route></Route>
                        <Program></Program>
                        <Definition></Definition>
                      </div>
                      <Button
                        onClick={() => {
                          console.log(this.state.finalValue);
                          console.log("Open Scraper:");
                          console.log(openScraper);
                          const authToken = localStorage.getItem("AuthToken")
                          axios.defaults.headers.common = { Authorization: `${authToken}` };
                          const schema = {
                            // title: this.state.title,
                            body: openScraper
                          };
                          axios
                            .post("/todo", schema)
                            .then((response) => {
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
                        }}
                        color="primary"
                      >
                        Submit
                      </Button>
                    </form>
                  </ThemeProvider>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(Schema);
