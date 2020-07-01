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
    const id = e.target.closest("button[route-id]").getAttribute("route-id");

    this.state.routes.find(route => route.id == route.id);

    var routes = [...this.state.routes];
    routes.splice(id, 1);

    this.setState({
      route: {
        // name: this.state.route.name,
        // parameters:[...this.state.route.parameters],
        // responses:[...this.state.route.responses],
        routes: [...routes]
      }
    }, () => console.log(this.state.routes));
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
      route: {
        // name: this.state.route.name,
        // parameters:[...this.state.route.parameters],
        // responses:[...this.state.route.responses],
        routes: routes
      }
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
            methods[j][property] = value;
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

  handleDeleteParameter = (e) => {
    const id = e.target.closest("button[parameter-id]").getAttribute("parameter-id");

    this.state.route.parameters.find(parameter => parameter.id == parameter.id);

    var parameters = [...this.state.route.parameters];
    parameters.splice(id, 1);

    this.setState({
      route: {
        name: this.state.route.name,
        methods: [...this.state.route.methods],
        responses: [...this.state.route.responses],
        parameters: [...parameters]
      }
    }, () => console.log(this.state.route.parameters));
  }


  updateParameter = (id, property, value) => {
    let parameters = this.state.route.parameters;
    this.state.route.parameters.find((parameter, i) => {
      if (parameter.id === id) {
        parameters[i][property] = value;
        return true;
      }
    });
    this.setState({
      route: {
        name: this.state.route.name,
        methods: [...this.state.route.methods],
        responses: [...this.state.route.responses],
        parameters: parameters
      }
    });
  }

  updateResponse = (id, property, value) => {
    let responses = this.state.route.responses;
    this.state.route.responses.find((response, i) => {
      if (response.id === id) {
        responses[i][property] = value;
        return true;
      }
    });
    this.setState({
      route: {
        name: this.state.route.name,
        methods: [...this.state.route.methods],
        parameters: [...this.state.route.parameters],
        responses: responses
      }
    });
  }

  handleDeleteResponse = (e) => {
    const id = e.target.closest("button[response-id]").getAttribute("response-id");

    this.state.route.responses.find(response => response.id == response.id);

    var responses = [...this.state.route.responses];
    responses.splice(id, 1);

    this.setState({
      route: {
        name: this.state.route.name,
        methods: [...this.state.route.methods],
        parameters: [...this.state.route.parameters],
        responses: [...responses]
      }
    }, () => console.log(this.state.route.parameters));
  }

  handleChange = (panel) => (event, isExpanded) => {
    this.setState({ expanded: isExpanded ? panel : false })
  };

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
                        <Typography>{route.name}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>
                          <TextField
                            label="Name"
                            style={{ margin: 8 }}
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={route.name}
                            onChange={(e) => this.updateRoute(route.id, "name", e.target.value)}
                          />
                          <div>
                            <Button
                              onClick={() => {
                                this.addMethod(route.id, {
                                  id: (route.methods[route.methods.length -1]?.id ?? -1) + 1,
                                  name: "",
                                  summary: "",
                                  description: "",
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
                                    expanded={this.state.expanded === ("method-" + j)}
                                    onChange={this.handleChange("method-" + j)}>
                                    <ExpansionPanelSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls={"method-" + j + "-content"}
                                      id={"method-" + j + "-header"}
                                    >
                                      <Typography>{method.name}</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                      <TextField
                                        label="name"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        value={method.name}
                                        onChange={(e) => this.updateMethod(route.id, method.id, "name", e.target.value)}
                                      />
                                      <TextField
                                        label="summary"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        value={method.summary}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        onChange={(e) => this.updateMethod(route.id, method.id, "summary", e.target.value)}
                                      />
                                      <TextField
                                        label="description"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        value={method.description}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        onChange={(e) => this.updateMethod(route.id, method.id, "description", e.target.value)}
                                      />
                                      <TextField
                                        label="operationId"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        value={method.operationId}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        onChange={(e) => this.updateMethod(route.id, method.id, "operationId", e.target.value)}
                                      />
                                      {/* <FormControl component="fieldset">
                                      <FormLabel component="legend">Output File</FormLabel>
                                      <RadioGroup
                                        aria-label="outputFile"
                                        name="outputFile"
                                        value={method.outputFile}
                                        onChange={(e) => this.updateMethod(method.id, "outputFile", e.target.value)}
                                      >
                                        <FormControlLabel
                                          value="Json"
                                          control={<Radio />}
                                          label="Json"
                                        />
                                        <FormControlLabel
                                          value="XML"
                                          control={<Radio />}
                                          label="XML"
                                        />
                                      </RadioGroup>
                                    </FormControl> */}
                                      <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={this.handleDeleteMethod}
                                        method-id={method.id}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </ExpansionPanelDetails>
                                  </ExpansionPanel>
                                );
                              })
                            }
                          </div>
                        </Typography>

                        {/* <div>
                        <div>
                          <Button
                            onClick={() => {
                              this.setState({
                                route:
                                {
                                  name: this.state.route.name,
                                  methods: [...this.state.route.methods],
                                  responses: [...this.state.route.responses],
                                  parameters: [...this.state.route.parameters, {
                                    id: (this.state.route.parameters[this.state.route.parameters.length - 1]?.id ?? -1) + 1,
                                    name: "Parameter", in: "", description: "", type: "",
                                    required: "",
                                  }]
                                }
                              });
                            }}>
                            Add Parameter
                      </Button>
                          {
                            this.state.route.parameters.map((parameter, i) => {
                              return (

                                <ExpansionPanel
                                  key={i}
                                  expanded={this.state.expanded === ("panel-" + i)}
                                  onChange={this.handleChange("panel-" + i)}>
                                  <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={"panel-" + i + "-content"}
                                    id={"panel-" + i + "-header"}
                                  >
                                    <Typography>{parameter.name}</Typography>
                                  </ExpansionPanelSummary>
                                  <ExpansionPanelDetails>
                                    <TextField
                                      label="Parameter Name"
                                      style={{ margin: 8 }}
                                      margin="normal"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      value={parameter.name}
                                      onChange={(e) => this.updateParameter(parameter.id, "name", e.target.value)}
                                    />
                                    <TextField
                                      label="Parameter In"
                                      style={{ margin: 8 }}
                                      margin="normal"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      value={parameter.in}
                                      onChange={(e) => this.updateParameter(parameter.id, "in", e.target.value)}
                                    />
                                    <TextField
                                      label="Description"
                                      style={{ margin: 8 }}
                                      margin="normal"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      value={parameter.description}
                                      onChange={(e) => this.updateParameter(parameter.id, "description", e.target.value)}
                                    />
                                    <TextField
                                      label="Type"
                                      style={{ margin: 8 }}
                                      margin="normal"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      value={parameter.type}
                                      onChange={(e) => this.updateParameter(parameter.id, "type", e.target.value)}
                                    />
                                    <Checkbox
                                      color="primary"
                                      inputProps={{ "aria-label": "secondary checkbox" }}
                                      onChange={(e) => this.updateParameter(parameter.id, "default", e.target.checked)}
                                    />
                                    <label>Required</label>
                                    <IconButton
                                      edge="end"
                                      aria-label="delete"
                                      onClick={this.handleDeleteParameter}
                                      parameter-id={parameter.id}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>

                              );
                            })
                          }
                        </div>
                        <div>
                          <Button
                            onClick={() => {
                              this.setState({
                                addResponse: true,
                                route:
                                {
                                  name: this.state.route.name,
                                  methods: [...this.state.route.methods],
                                  parameters: [...this.state.route.parameters],
                                  responses: [...this.state.route.responses, {
                                    id: (this.state.route.responses[this.state.route.responses.length - 1]?.id ?? -1) + 1,
                                    code: "Resposne", description: "", schema: ""
                                  }]
                                }
                              });
                            }}>
                            Add Response
                      </Button>
                          {
                            this.state.route.responses.map((response, i) => {
                              return (

                                <ExpansionPanel
                                  key={i}
                                  expanded={this.state.expanded === ("panel-" + i)}
                                  onChange={this.handleChange("panel-" + i)}>
                                  <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={"panel-" + i + "-content"}
                                    id={"panel-" + i + "-header"}
                                  >
                                    <Typography>{response.code}</Typography>
                                  </ExpansionPanelSummary>
                                  <ExpansionPanelDetails>
                                    <TextField
                                      label="Response Code"
                                      style={{ margin: 8 }}
                                      margin="normal"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      value={response.code}
                                      onChange={(e) => this.updateResponse(response.id, "code", e.target.value)}
                                    />
                                    <TextField
                                      label="description"
                                      style={{ margin: 8 }}
                                      margin="normal"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      value={response.description}
                                      onChange={(e) => this.updateResponse(response.id, "description", e.target.value)}
                                    />
                                    <TextField
                                      label="schema"
                                      style={{ margin: 8 }}
                                      margin="normal"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      value={response.schema}
                                      onChange={(e) => this.updateResponse(response.id, "schema", e.target.value)}
                                    />
                                    <IconButton
                                      edge="end"
                                      aria-label="delete"
                                      onClick={this.handleDeleteResponse}
                                      response-id={response.id}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>
                              );
                            })
                          }
                        </div>
                      </div> */}
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  )

                })
              }

            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}
export default Route;
