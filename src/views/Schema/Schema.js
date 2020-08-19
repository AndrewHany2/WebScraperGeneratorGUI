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

                                    let responses = [];
                                    for (let k = 0; k < method.responses.length; k++) {
                                      let response = method.responses[k];
                                      response.selectors = this.test(response.selectors);
                                      responses.push(response);
                                    }

                                    method.responses = this.test(responses);

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

                                let testschema = {
                                  "name": "Subscene",
                                  "servers": [
                                    {
                                      "name": "subscene",
                                      "url": "https://subscene.com",
                                      "default": true
                                    }
                                  ],
                                  "defaultHeaders": {
                                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36"
                                  },
                                  "routes": {
                                    "/subtitles/{filmId}": {
                                      "get": {
                                        "summary": "Find film by Id",
                                        "description": "Returns a single film",
                                        "operationId": "getFilmById",
                                        "produces": [
                                          "application/json",
                                          "application/xml"
                                        ],
                                        "parameters": [
                                          {
                                            "name": "filmId",
                                            "in": "path",
                                            "description": "Id of film to return",
                                            "required": true,
                                            "type": "string"
                                          }
                                        ],
                                        "responses": {
                                          "200": {
                                            "description": "successful operation",
                                            "schema": {
                                              "$ref": "#/definitions/Film"
                                            },
                                            "selectors": {
                                              "id": {
                                                "selector": "filmId",
                                                "selectorType": "parameter"
                                              },
                                              "title": {
                                                "selector": "#content > div.subtitles.byFilm > div.content.clearfix > table > tbody > tr:nth-child(2) > td.a1 > a > span:nth-child(2)",
                                                "selectorType": "querySelector",
                                                "type": "text"
                                              },
                                              "year": {
                                                "selector": "<strong>\\s*Year:\\s*</strong>\\s*(?<year>\\d+)\\s*</li>",
                                                "selectorType": "regex",
                                                "type": "text",
                                                "regexGroup": "year"
                                              },
                                              "imageUrl": {
                                                "selector": "#content > div.subtitles.byFilm > div.box.clearfix > div.top.left > a > div > img",
                                                "selectorType": "querySelector",
                                                "type": "image"
                                              },
                                              "subtitles": {
                                                "selector": "#content > div.subtitles.byFilm > div.content.clearfix > table > tbody > tr",
                                                "selectorType": "querySelector",
                                                "type": "object",
                                                "selectors": {
                                                  "id": {
                                                    "selector": "/subtitles/(?<filmId>.*?)/(?<language>.*?)/(?<subtitleId>\\d+?)\"",
                                                    "selectorType": "regex",
                                                    "regexGroup": "subtitleId"
                                                  },
                                                  "language": {
                                                    "selector": "td.a1 > a > span:nth-child(1)",
                                                    "selectorType": "querySelector",
                                                    "type": "text"
                                                  },
                                                  "vote-value": {
                                                    "selector": "td.a1 > a > span.l.r",
                                                    "selectorType": "querySelector",
                                                    "type": "attribute",
                                                    "attribute": "class"
                                                  },
                                                  "link": {
                                                    "selector": "td.a1 > a",
                                                    "selectorType": "querySelector",
                                                    "type": "link"
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "/subtitles/{filmId}/{language}/{subtitleId}": {
                                      "get": {
                                        "summary": "Find subtitle",
                                        "description": "Returns a single subtitle",
                                        "operationId": "getSubtitle",
                                        "produces": [
                                          "application/json",
                                          "application/xml"
                                        ],
                                        "parameters": [
                                          {
                                            "name": "filmId",
                                            "in": "path",
                                            "description": "Id of film to return",
                                            "required": true,
                                            "type": "string"
                                          },
                                          {
                                            "name": "language",
                                            "in": "path",
                                            "description": "Language of subtitle to return",
                                            "required": true,
                                            "type": "string"
                                          },
                                          {
                                            "name": "subtitleId",
                                            "in": "path",
                                            "description": "Id of subtitle to return",
                                            "required": true,
                                            "type": "string"
                                          }
                                        ],
                                        "responses": {
                                          "200": {
                                            "description": "successful operation",
                                            "schema": {
                                              "$ref": "#/definitions/Subtitle"
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "/user/{username}": {
                                      "get": {
                                        "summary": "Get user by user name",
                                        "description": "",
                                        "operationId": "getUserByName",
                                        "produces": [
                                          "application/json",
                                          "application/xml"
                                        ],
                                        "parameters": [
                                          {
                                            "name": "username",
                                            "in": "path",
                                            "description": "The name that needs to be fetched.",
                                            "required": true,
                                            "type": "string"
                                          }
                                        ],
                                        "responses": {
                                          "200": {
                                            "description": "successful operation",
                                            "schema": {
                                              "$ref": "#/definitions/User"
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "definitions": {
                                    "Film": {
                                      "type": "object",
                                      "required": [
                                        "id"
                                      ],
                                      "properties": {
                                        "id": {
                                          "type": "string"
                                        },
                                        "title": {
                                          "type": "string"
                                        },
                                        "year": {
                                          "type": "integer",
                                          "format": "int32"
                                        },
                                        "imageUrl": {
                                          "type": "string",
                                          "format": "uri"
                                        },
                                        "subtitles": {
                                          "type": "array",
                                          "items": {
                                            "ref": "#/definitions/Subtitle"
                                          }
                                        }
                                      }
                                    },
                                    "Subtitle": {
                                      "type": "object",
                                      "required": [
                                        "id"
                                      ],
                                      "properties": {
                                        "id": {
                                          "type": "integer",
                                          "format": "int64"
                                        },
                                        "link": {
                                          "type": "string",
                                          "format": "uri"
                                        },
                                        "language": {
                                          "type": "string"
                                        },
                                        "film": {
                                          "ref": "#/definitions/Film"
                                        },
                                        "releases": {
                                          "type": "array",
                                          "items": {
                                            "type": "string"
                                          }
                                        },
                                        "author": {
                                          "ref": "#/definitions/User"
                                        },
                                        "comment": {
                                          "type": "string"
                                        },
                                        "Date": {
                                          "type": "string",
                                          "format": "date-time"
                                        },
                                        "hearingImpaired": {
                                          "type": "boolean"
                                        },
                                        "foreignParts": {
                                          "type": "boolean"
                                        },
                                        "releaseType": {
                                          "type": "string"
                                        },
                                        "rate": {
                                          "type": "integer",
                                          "format": "int64"
                                        },
                                        "goodVotes": {
                                          "type": "integer",
                                          "format": "int64"
                                        },
                                        "badVotes": {
                                          "type": "integer",
                                          "format": "int64"
                                        }
                                      }
                                    },
                                    "User": {
                                      "type": "object",
                                      "required": [
                                        "id"
                                      ],
                                      "properties": {
                                        "id": {
                                          "type": "integer",
                                          "format": "int64"
                                        },
                                        "name": {
                                          "type": "string"
                                        }
                                      }
                                    }
                                  },
                                  "program": {
                                    "inputs": {
                                      "filmId": {
                                        "required": true,
                                        "default": true
                                      }
                                    },
                                    "operations": {
                                      "film": {
                                        "method": "getFilmById",
                                        "parameters": {
                                          "filmId": {
                                            "type": "input",
                                            "value": "filmId"
                                          }
                                        },
                                        "parent": "_start"
                                      },
                                      "subtitles": {
                                        "method": "getSubtitle",
                                        "parameters": {
                                          "filmId": {
                                            "type": "input",
                                            "value": "filmId"
                                          },
                                          "subtitleId": {
                                            "type": "lamda",
                                            "value": "$source.Id"
                                          },
                                          "language": {
                                            "type": "lamda",
                                            "value": "$source.Language"
                                          }
                                        },
                                        "parent": "film",
                                        "multiple": true,
                                        "source": {
                                          "type": "variable",
                                          "value": "film.Subtitles"
                                        }
                                      }
                                    },
                                    "result": {
                                      "type": "variable",
                                      "value": "subtitles"
                                    }
                                  }
                                }

                                const schema = {
                                  body: spec
                                  // body: testschema
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
                                    console.log(error);
                                    this.setState({
                                      errors: error.response.data,
                                      alert: <Alert severity="error">
                                        <AlertTitle>Error</AlertTitle>
                                        {error.response.data.error}
                                      </Alert>
                                    });
                                  });
                                history.push("/WebScraperGenerator/generate");

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
