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
      addMethod: false,
      addParameter: false,
      addResponse: false,
      route:
      {
        name: "",
        routes: [],
        methods: [],
        parameters: [],
        responses: []
      }
    };
  }

  componentDidUpdate() {
    openScraper.route = this.state.route;
  }

  handleDeleteRoute = (e) => {
    const id = e.target.closest("button[route-id]").getAttribute("route-id");

    this.state.route.routes.find(route => route.id == route.id);

    var routes = [...this.state.route.routes];
    routes.splice(id, 1);

    this.setState({
      route: {
        // name: this.state.route.name,
        // parameters:[...this.state.route.parameters],
        // responses:[...this.state.route.responses],
        routes: [...routes]
      }
    }, () => console.log(this.state.route.routes));
  }


  updateRoute = (id, property, value) => {
    let routes = this.state.route.routes;
    this.state.route.routes.find((route, i) => {
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
    const id = e.target.closest("button[method-id]").getAttribute("method-id");

    this.state.route.methods.find(method => method.id == method.id);

    var methods = [...this.state.route.methods];
    methods.splice(id, 1);

    this.setState({
      route: {
        name: this.state.route.name,
        parameters: [...this.state.route.parameters],
        responses: [...this.state.route.responses],
        methods: [...methods]
      }
    }, () => console.log(this.state.route.methods));
  }


  updateMethod = (id, property, value) => {
    let methods = this.state.route.methods;
    this.state.route.methods.find((method, i) => {
      if (method.id === id) {
        methods[i][property] = value;
        return true;
      }
    });
    this.setState({
      route: {
        name: this.state.route.name,
        parameters: [...this.state.route.parameters],
        responses: [...this.state.route.responses],
        methods: methods
      }
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
    let methodComp;
    let parameterComp;
    let responseComp;
    if (this.state.addMethod) {
      methodComp =
        this.state.route.methods.map((method, i) => {
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
                <Typography>{method.name}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <TextField
                  label="method"
                  style={{ margin: 8 }}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={method.name}
                  onChange={(e) => this.updateMethod(method.id, "name", e.target.value)}
                />
                <TextField
                  label="summary"
                  style={{ margin: 8 }}
                  margin="normal"
                  value={method.summary}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => this.updateMethod(method.id, "summary", e.target.value)}
                />
                <TextField
                  label="description"
                  style={{ margin: 8 }}
                  margin="normal"
                  value={method.description}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => this.updateMethod(method.id, "description", e.target.value)}
                />
                <TextField
                  label="operationId"
                  style={{ margin: 8 }}
                  margin="normal"
                  value={method.operationId}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => this.updateMethod(method.id, "operationId", e.target.value)}
                />
                <FormControl component="fieldset">
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
                </FormControl>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={this.handleDelete}
                  method-id={method.id}
                >
                  <DeleteIcon />
                </IconButton>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })
    }
    if (this.state.addParameter) {
      parameterComp =
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
    if (this.state.addResponse) {
      responseComp =
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
    return (
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="main-panel-content"
            id="main-panel-header"
          >
            <Typography>Route</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <Button
                onClick={() => {
                  this.setState({
                    route:
                    {
                      routes: [...this.state.route.routes, {
                        id: (this.state.route.routes[this.state.route.routes.length - 1]?.id ?? -1) + 1,
                        name: "", methods: [], responses: [], parameters: []
                      }]
                    }
                  });
                }}>
                Add Route
        </Button>
              {
                this.state.route.routes.map((a, i) => {
                  return (
                    <div>
                      <div>
                        <Button
                          onClick={() => {
                            this.setState({
                              addMethod: true,
                              route:
                              {
                                routes: [...this.state.route.routes, {
                                  methods: [...this.state.route.routes.methods,
                                  {
                                    id: (this.state.route.routes.methods[this.state.route.routes.methods.length - 1]?.id ?? -1) + 1,
                                    name: "Method", summary: "", description: "", operationId: "", description: "",
                                    outputFile: ""
                                  }
                                  ]
                                }]
                                // name: this.state.route.name,
                                // parameters:[...this.state.route.parameters],
                                // responses:[...this.state.route.responses],
                                // methods: [...this.state.route.methods, {
                                //   id: (this.state.route.methods[this.state.route.methods.length - 1]?.id ?? -1) + 1,
                                //   name:"Method", summary: "", description: "", operationId: "", description: "",
                                //   outputFile: "",
                                // }]
                              }
                            });
                          }}>
                          Add Method
                    </Button>
                        {
                          methodComp
                        }
                      </div>
                      <div>
                        <Button
                          onClick={() => {
                            this.setState({
                              addParameter: true,
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
                          parameterComp
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
                          responseComp
                        }
                      </div>
                    </div>)

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
