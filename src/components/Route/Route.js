import React, { Component } from "react";
import MyExpantionPanel from "../MyExpantionPanel/MyExpantionPanel";
import {
  TextField,
  Radio,
  Checkbox,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  IconButton,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";
import { set } from "lodash/fp";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import openScraper from '../../global'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Selector from './selector.js'

class Route extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: "",
      routes: []
    };
  }

  componentDidUpdate() {
    openScraper.route = this.state.routes;
  }

  handleDeleteRoute = (e) => {
    const routeId = e.target.closest("div[route-id]").getAttribute("route-id");

    this.deleteRoute(routeId);
  }

  deleteRoute = (routeId) => {
    let routes = this.state.routes;
    this.state.routes.find((route, i) => {
      if (route.id == routeId) {
        routes.splice(i, 1);
        return true;
      }
    });

    this.setState({
      routes: [...routes]
    });
  }


  updateRoute = (id, property, value) => {
    let routes = this.state.routes;
    this.state.routes.find((route, i) => {
      if (route.id === id) {
        routes[i][property] = value;
        return true;
      }
    });
    this.setState({
      routes: routes
    });
  }

  handleDeleteMethod = (e) => {
    const routeId = e.target.closest("div[route-id]").getAttribute("route-id");
    const methodId = e.target.closest("button[method-id]").getAttribute("method-id");

    this.deleteMethod(routeId, methodId);
  }

  deleteMethod = (routeId, methodId) => {
    let routes = this.state.routes;
    this.state.routes.find((route, i) => {
      if (route.id == routeId) {

        let methods = route.methods;
        route.methods.find((method, j) => {
          if (method.id == methodId) {
            methods.splice(j, 1);
            return true;
          }
        });

        routes[i].methods = [...methods];
        return true;
      }
    });

    this.setState({
      routes: [...routes]
    });
  }

  addMethod = (routeId, method) => {
    let routes = this.state.routes;
    this.state.routes.find((route, i) => {
      if (route.id === routeId) {
        routes[i].methods.push(method);
        return true;
      }
    });

    this.setState({
      routes: [...routes]
    });
  }

  updateMethod = (routeId, methodId, property, value) => {
    let routes = this.state.routes;
    this.state.routes.find((route, i) => {
      if (route.id === routeId) {

        let methods = route.methods;
        route.methods.find((method, j) => {
          if (method.id === methodId) {
            routes[i].methods[j][property] = value;
            return true;
          }
        });

        // routes[i].methods = [...methods];
        return true;
      }
    });

    this.setState({
      routes: [...routes]
    });
  }


  addParameter = (routeId, methodId, parameter) => {
    let routes = this.state.routes;
    let methods = this.state.routes.methods;
    this.state.routes.find((route, i) => {
      if (route.id === routeId) {
        this.state.routes[i].methods.find((method, j) => {
          if (method.id === methodId) {
            routes[i].methods[j].parameters.push(parameter);
          }
        })
      }
    });

    this.setState({
      routes: [...routes]
    });
  }

  updateParameter = (routeId, methodId, parameterId, property, value) => {
    let routes = this.state.routes;

    this.state.routes.find((route, i) => {

      if (route.id === routeId) {
        let methods = route.methods;

        route.methods.find((method, j) => {

          if (method.id === methodId) {
            let parameters = method.parameters;

            method.parameters.find((parameter, h) => {

              if (parameter.id === parameterId) {
                parameters[h][property] = value;
                return true;
              }
            })
            methods[j].parameters = [...parameters]
            return true;
          }

        });
        routes[i].methods = [...methods]
        return true
      }
    });

    this.setState({
      routes: [...routes]
    });
  }

  handleDeleteParameter = (e) => {
    const routeId = e.target.closest("div[route-id]").getAttribute("route-id");
    const methodId = e.target.closest("button[method-id]").getAttribute("method-id");
    const parameterId = e.target.closest("button[parameter-id]").getAttribute("parameter-id");

    this.deleteParameter(routeId, methodId, parameterId);
  }

  deleteParameter = (routeId, methodId, parameterId) => {
    let routes = this.state.routes;
    this.state.routes.find((route, i) => {
      if (route.id == routeId) {

        let methods = route.methods;
        route.methods.find((method, j) => {
          if (method.id == methodId) {
            let parameters = method.parameters;
            method.parameters.find((parameter, h) => {
              if (parameter.id === parameterId) {
                parameters.splice(h, 1);
                return true;
              }
            })
            methods[j].parameters = [...parameters];
            return true;
          }
        });

        routes[i].methods = [...methods];
        return true;
      }
    });

    this.setState({
      routes: [...routes]
    });
  }

  addResponse = (routeId, methodId, response) => {
    let routes = this.state.routes;
    let methods = this.state.routes.methods;
    this.state.routes.find((route, i) => {
      if (route.id === routeId) {
        this.state.routes[i].methods.find((method, j) => {
          if (method.id === methodId) {
            routes[i].methods[j].responses.push(response);
          }
        })
      }
    });

    this.setState({
      routes: [...routes]
    });
  }

  updateResponse = (routeId, methodId, responseId, property, value) => {
    let routes = this.state.routes;

    this.state.routes.find((route, i) => {

      if (route.id === routeId) {
        let methods = route.methods;

        route.methods.find((method, j) => {

          if (method.id === methodId) {
            let responses = method.responses;

            method.responses.find((response, h) => {

              if (response.id === responseId) {
                responses[h][property] = value;
                return true;
              }
            })
            methods[j].responses = [...responses]
            return true;
          }

        });
        routes[i].methods = [...methods]
        return true
      }
    });

    this.setState({
      routes: [...routes]
    });
  }

  handleDeleteResponse = (e) => {
    const routeId = e.target.closest("div[route-id]").getAttribute("route-id");
    const methodId = e.target.closest("button[method-id]").getAttribute("method-id");
    const responseId = e.target.closest("button[response-id]").getAttribute("response-id");

    this.deleteResponse(routeId, methodId, responseId);
  }

  deleteResponse = (routeId, methodId, responseId) => {
    let routes = this.state.routes;
    this.state.routes.find((route, i) => {
      if (route.id == routeId) {

        let methods = route.methods;
        route.methods.find((method, j) => {
          if (method.id == methodId) {
            let responses = method.responses;
            method.responses.find((response, h) => {
              if (response.id === responseId) {
                responses.splice(h, 1);
                return true;
              }
            })
            methods[j].responses = [...responses];
            return true;
          }
        });

        routes[i].methods = [...methods];
        return true;
      }
    });

    this.setState({
      routes: [...routes]
    });
  }

  handleChange = (panel) => (event, isExpanded) => {
    this.setState({ expanded: isExpanded ? panel : false })
  };

  addSelector = (routeId, methodId, responseId, selector) => {
    let routes = this.state.routes;

    this.state.routes.find((route, i) => {

      if (route.id === routeId) {
        this.state.routes[i].methods.find((method, j) => {

          if (method.id === methodId) {
            this.state.routes[i].methods[j].responses.find((response, k) => {

              if (response.id === responseId) {
                routes[i].methods[j].responses[k].selectors.push(selector);

              }
            })

          }
        })
      }
    });

    this.setState({
      routes: [...routes]
    });
  }

  updateSelector = (routeId, methodId, responseId, selectorId, property, value) => {
    let routes = this.state.routes;

    this.state.routes.find((route, i) => {

      if (route.id === routeId) {
        let methods = route.methods;

        route.methods.find((method, j) => {

          if (method.id === methodId) {
            let responses = method.responses;

            method.responses.find((response, h) => {

              if (response.id === responseId) {
                let selectors = response.selectors;

                response.selectors.find((selector, l) => {

                  if (selector.id === selectorId) {
                    selectors[l][property] = value;
                    return true
                  }
                })
                responses[h].selectors = [...selectors];
                return true;
              }
            })
            methods[j].responses = [...responses]
            return true;
          }

        });
        routes[i].methods = [...methods]
        return true
      }
    });

    this.setState({
      routes: [...routes]
    });
  }

  handleDeleteSelector = (e) => {
    const routeId = e.target.closest("div[route-id]").getAttribute("route-id");
    const methodId = e.target.closest("button[method-id]").getAttribute("method-id");
    const responseId = e.target.closest("button[response-id]").getAttribute("response-id");
    const selectorId = e.target.closest("button[selector-id]").getAttribute("selector-id");


    this.deleteSelector(routeId, methodId, responseId, selectorId);
  }

  deleteSelector = (routeId, methodId, responseId, selectorId) => {
    let routes = this.state.routes;

    this.state.routes.find((route, i) => {

      if (route.id == routeId) {
        let methods = route.methods;

        route.methods.find((method, j) => {

          if (method.id == methodId) {
            let responses = method.responses;

            method.responses.find((response, h) => {

              if (response.id === responseId) {
                let selectors = response.selectors;

                response.selectors.find((selector, l) => {

                  if (selector.id === selectorId) {
                    selectors.splice(l, 1);
                    return true;
                  }
                })
                responses[h].selectors = [...selectors];
                return true;
              }
            })
            methods[j].responses = [...responses];
            return true;
          }
        });
        routes[i].methods = [...methods];
        return true;
      }
    });

    this.setState({
      routes: [...routes]
    });
  }


  render() {
    return (
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="main-panel-content"
            id="main-panel-header"
          >
            <Typography>Routes</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <Button
                onClick={() => {
                  console.log(this.state.routes)
                  this.setState({
                    routes: [...this.state.routes, {
                      id: (this.state.routes[this.state.routes.length - 1]?.id ?? -1) + 1,
                      name: "", summary: "", description: "", methods: [], responses: [], parameters: []
                    }]
                  });
                }}>
                Add Route
              </Button>
              {
                this.state.routes.map((route, i) => {
                  return (
                    <ExpansionPanel
                      key={i}
                      route-id={route.id}
                      // expanded={this.state.expanded === ("route-" + i)}
                      onChange={this.handleChange("route-" + i)}
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={"route-" + i + "-content"}
                        id={"route-" + i + "-header"}
                      >
                        <Typography>{route.name ? route.name : "Route"}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>
                          <TextField
                            label="Name"
                            style={{ margin: 8 }}
                            margin="normal"
                            value={route.name}
                            onChange={(e) => this.updateRoute(route.id, "name", e.target.value)}
                          />
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={this.handleDeleteRoute}
                            route-id={route.id}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <div>
                            <Button
                              onClick={() => {
                                console.log(route);
                                console.log(route.methods)
                                this.addMethod(route.id, {
                                  id: (route.methods[route.methods.length - 1]?.id ?? -1) + 1,
                                  name: "",
                                  summary: "",
                                  description: "",
                                  outputFile: "",
                                  responses: [],
                                  parameters: []
                                });
                              }}>
                              Add Method
                            </Button>
                            {
                              route.methods.map((method, j) => {
                                return (
                                  <ExpansionPanel
                                    key={j}
                                    // expanded={this.state.expanded === ("method-" + j)}
                                    onChange={this.handleChange("method-" + j)}>
                                    <ExpansionPanelSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls={"method-" + j + "-content"}
                                      id={"method-" + j + "-header"}
                                    >
                                      <Typography>{method.name ? method.name : "Method"}</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                      <Typography>
                                        <TextField
                                          label="Name"
                                          style={{ margin: 8 }}
                                          margin="normal"
                                          value={method.name}
                                          onChange={(e) => this.updateMethod(route.id, method.id, "name", e.target.value)}
                                        />
                                        <TextField
                                          label="Summary"
                                          style={{ margin: 8 }}
                                          margin="normal"
                                          value={method.summary}
                                          onChange={(e) => this.updateMethod(route.id, method.id, "summary", e.target.value)}
                                        />
                                        <TextField
                                          label="Description"
                                          style={{ margin: 8 }}
                                          margin="normal"
                                          value={method.description}
                                          onChange={(e) => this.updateMethod(route.id, method.id, "description", e.target.value)}
                                        />
                                        <TextField
                                          label="Operation id"
                                          style={{ margin: 8 }}
                                          margin="normal"
                                          value={method.operationId}
                                          onChange={(e) => this.updateMethod(route.id, method.id, "operationId", e.target.value)}
                                        />
                                        <FormControl component="fieldset">
                                          <FormLabel component="legend">Output File</FormLabel>
                                          <RadioGroup
                                            aria-label="outputFile"
                                            name="outputFile"
                                            value={method.outputFile}
                                            onChange={(e) => this.updateMethod(route.id, method.id, "outputFile", e.target.value)}
                                          >
                                            <FormControlLabel
                                              value="json"
                                              control={<Radio />}
                                              label="json"
                                            />
                                            <FormControlLabel
                                              value="xml"
                                              control={<Radio />}
                                              label="xml"
                                            />
                                          </RadioGroup>
                                        </FormControl>
                                        <IconButton
                                          edge="end"
                                          aria-label="delete"
                                          onClick={this.handleDeleteMethod}
                                          method-id={method.id}
                                        >
                                          <DeleteIcon />
                                        </IconButton>
                                        <div>
                                          <Button
                                            onClick={() => {
                                              this.addParameter(route.id, method.id, {
                                                id: (method.parameters[method.parameters.length - 1]?.id ?? -1) + 1,
                                                name: "",
                                                in: "",
                                                description: "",
                                                required: "",
                                                type: ""
                                              });
                                            }}>
                                            Add Parameter
                                        </Button>
                                          {
                                            method.parameters.map((parameter, h) => {
                                              return (
                                                <ExpansionPanel
                                                  key={h}
                                                  // expanded={this.state.expanded === ("parameter-" + h)}
                                                  onChange={this.handleChange("parameter-" + h)}>
                                                  <ExpansionPanelSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls={"parameter-" + h + "-content"}
                                                    id={"parameter-" + h + "-header"}
                                                  >
                                                    <Typography>{parameter.name ? parameter.name : "Parameter"}</Typography>
                                                  </ExpansionPanelSummary>
                                                  <ExpansionPanelDetails>
                                                    <Typography>
                                                      <TextField
                                                        label="Name"
                                                        style={{ margin: 8 }}
                                                        margin="normal"
                                                        value={parameter.name}
                                                        onChange={(e) => this.updateParameter(route.id, method.id, parameter.id, "name", e.target.value)}
                                                      />
                                                      <TextField
                                                        label="In"
                                                        style={{ margin: 8 }}
                                                        margin="normal"
                                                        value={parameter.in}
                                                        onChange={(e) => this.updateParameter(route.id, method.id, parameter.id, "in", e.target.value)}
                                                      />
                                                      <TextField
                                                        label="Description"
                                                        style={{ margin: 8 }}
                                                        margin="normal"
                                                        value={parameter.description}
                                                        onChange={(e) => this.updateParameter(route.id, method.id, parameter.id, "description", e.target.value)}
                                                      />
                                                      <div>
                                                        <TextField
                                                          label="Type"
                                                          style={{ margin: 8 }}
                                                          margin="normal"
                                                          value={parameter.type}
                                                          onChange={(e) => this.updateParameter(route.id, method.id, parameter.id, "type", e.target.value)}
                                                        />
                                                        {/* <Checkbox
                                                          color="primary"
                                                          inputProps={{ "aria-label": "secondary checkbox" }}
                                                          onChange={(e) => this.updateParameter(route.id, method.id, parameter.id, "required", e.target.checked)}
                                                        />
                                                        <label>Required</label> */}
                                                        <FormControlLabel
                                                          control={
                                                            <Checkbox

                                                              name="checkedB"
                                                              color="primary"
                                                              onChange={(e) => this.updateParameter(route.id, method.id, parameter.id, "required", e.target.checked)}
                                                            />
                                                          }
                                                          label="Required"
                                                        />
                                                        <IconButton
                                                          edge="end"
                                                          aria-label="delete"
                                                          onClick={this.handleDeleteParameter}
                                                          parameter-id={parameter.id}
                                                        >
                                                          <DeleteIcon />
                                                        </IconButton>
                                                      </div>
                                                    </Typography>
                                                  </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                              )
                                            })
                                          }
                                        </div>
                                        <div>
                                          <Button
                                            onClick={() => {
                                              this.addResponse(route.id, method.id, {
                                                id: (method.responses[method.responses.length - 1]?.id ?? -1) + 1,
                                                code: "", description: "", schema: "", selectors: []
                                              });
                                            }}>
                                            Add Response
                                        </Button>
                                          {
                                            method.responses.map((response, g) => {
                                              return (
                                                <ExpansionPanel
                                                  key={g}
                                                  // expanded={this.state.expanded === ("response-" + g)}
                                                  onChange={this.handleChange("response-" + g)}>
                                                  <ExpansionPanelSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls={"response-" + g + "-content"}
                                                    id={"response-" + g + "-header"}
                                                  >
                                                    <Typography>{response.code ? response.code : "Response"}</Typography>
                                                  </ExpansionPanelSummary>
                                                  <ExpansionPanelDetails>
                                                    <Typography>
                                                      <TextField
                                                        label="Code"
                                                        style={{ margin: 8 }}
                                                        margin="normal"
                                                        value={response.code}
                                                        onChange={(e) => this.updateResponse(route.id, method.id, response.id, "code", e.target.value)}
                                                      />
                                                      <TextField
                                                        label="Description"
                                                        style={{ margin: 8 }}
                                                        margin="normal"
                                                        value={response.description}
                                                        onChange={(e) => this.updateResponse(route.id, method.id, response.id, "description", e.target.value)}
                                                      />
                                                      <TextField
                                                        label="Schema"
                                                        style={{ margin: 8 }}
                                                        margin="normal"
                                                        value={response.schema}
                                                        onChange={(e) => this.updateResponse(route.id, method.id, response.id, "schema", e.target.value)}
                                                      />
                                                      <IconButton
                                                        edge="end"
                                                        aria-label="delete"
                                                        onClick={this.handleDeleteResponse}
                                                        response-id={response.id}
                                                      >
                                                        <DeleteIcon />
                                                      </IconButton>
                                                      <div>
                                                        <Button
                                                          onClick={() => {
                                                            this.addSelector(route.id, method.id, response.id, {
                                                              id: (response.selectors[response.selectors.length - 1]?.id ?? -1) + 1,
                                                              name: "", selectorType: "", type: "", selector: "", regexGroup: ""
                                                            });
                                                          }}>
                                                          Add Selector
                                                        </Button>
                                                        {
                                                          response.selectors.map((selector, k) => {
                                                            return (
                                                              <Selector addSelectorInsideSelector={this.addSelectorInsideSelector} updateSelector={this.updateSelector} deleteSelector={this.handleDeleteSelector} selector={selector} response={response} method={method} route={route}></Selector>
                                                            )
                                                          })
                                                        }
                                                      </div>
                                                    </Typography>
                                                  </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                              )
                                            })
                                          }
                                        </div>
                                      </Typography>
                                    </ExpansionPanelDetails>
                                  </ExpansionPanel>
                                );
                              })
                            }
                          </div>
                        </Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  )

                })
              }

            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div >
      //edit
    );
  }
}
export default Route;
