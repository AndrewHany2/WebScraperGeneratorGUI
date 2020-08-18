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
import { Alert, AlertTitle } from '@material-ui/lab';
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
    submitButtonAppear: true,
    alert: "",
    errors: []
  };

  componentDidMount() {
    this.setState({ submitButtonAppear: true })
  }

  removeId = (source) => {
    let output = [];
    for (var i = 0; i < source.length; i++) {
      var object = source[i];
      delete object.id;
      output.push(object);
    }
    return output;
  }

  convertToObject = (source) => {
    let object = {};
    source.map(def => {
      let name = def.name;
      delete def.name;
      object[name] = def;
      return def;
    });
    return object;
  }

  test = (source) => {

    let array = this.removeId(source);

    let object = this.convertToObject(array);

    return object;
  }

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
                      <MainInfo></MainInfo>
                      <Route></Route>
                      <Program></Program>
                      <Definition></Definition>
                      <CardFooter>
                        {
                          this.state.submitButtonAppear ? (
                            <Button
                              onClick={() => {
                                console.log(this.state.finalValue);
                                console.log("Open Scraper:");
                                console.log(openScraper);
                                const authToken = localStorage.getItem("AuthToken")
                                axios.defaults.headers.common = { Authorization: `${authToken}` };

                                let definitions = [];
                                for (let i = 0; i < openScraper.definition.length; i++) {
                                  let definition = { ...openScraper.definition[i] };
                                  definition.properties = this.test(definition.properties);
                                  definitions.push(definition);
                                }

                                definitions = this.test(definitions);

                                let routes = [];
                                for (let i = 0; i < openScraper.route.length; i++) {
                                  let route = { ...openScraper.route[i] };

                                  let methods = [];
                                  for (let j = 0; j < route.methods.length; j++) {
                                    let method = route.methods[j];

                                    method.parameters = this.test(method.parameters);
                                    method.responses = this.test(method.responses);

                                    methods.push(method);
                                  }

                                  route.methods = this.test(methods);
                                  routes.push(route);
                                }

                                routes = this.test(routes);

                                let programOperations = [];
                                for (let i = 0; i < openScraper.program.operations.length; i++) {
                                  let operation = { ...openScraper.program.operations[i] };
                                  operation.parameters = this.test(operation.parameters);
                                  programOperations.push(operation);
                                }

                                programOperations = this.test(programOperations);

                                let defaultHeaders = this.test([...openScraper.mainInfo.defaultHeaders]);
                                Object.keys(defaultHeaders).map(k => defaultHeaders[k] = defaultHeaders[k].value);

                                var spec = {
                                  name: openScraper.mainInfo?.name,
                                  defaultHeaders: defaultHeaders,
                                  servers: openScraper.mainInfo.hosts?.map(({ id, ...item }) => item),
                                  definitions: definitions,
                                  routes: routes,
                                  program: {
                                    inputs: this.test([...openScraper.program.inputs]),
                                    operations: programOperations,
                                    result: {
                                      type: openScraper.program.resultType,
                                      value: openScraper.program.resultValue
                                    }
                                  }
                                }

                                console.log(spec);
                                console.log(JSON.stringify(spec));

                                const schema = {
                                  body: spec
                                };

                                axios
                                  .post("/todo", schema)
                                  .then((response) => {
                                    this.setState({
                                      submitButtonAppear: false,
                                      alert: <Alert severity="success">
                                        <AlertTitle>Success</AlertTitle>
                                    Submited successfully
                                  </Alert>
                                    })
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

                              }}
                              color="primary"
                            >
                              Submit
                            </Button>) : null
                        }
                        {this.state.alert}
                      </CardFooter>
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
