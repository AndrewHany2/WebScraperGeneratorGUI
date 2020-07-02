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

  addSelector = (routeId, methodId, responseId, selector) => {
    let routes = this.state.routes;

    this.state.routes.find((route, i) => {

      if (route.id === routeId) {
        this.state.routes[i].methods.find((method, j) => {

          if (method.id === methodId) {
            this.state.routes[i].methods[j].responses.find((response, k) => {

              if (response.id === responseId) {
                routes[i].methods[j].responses[k].push(selector);

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
                        <Typography>{route.name ? route.name : "Route"}</Typography>
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
                                console.log(route);
                                console.log(route.methods)
                                this.addMethod(route.id, {
                                  id: (route.methods[route.methods.length - 1]?.id ?? -1) + 1,
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
                                      <Typography>{method.name ? method.name : "method"}</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                      <Typography>
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
                                            shrink: false,
                                          }}
                                          onChange={(e) => this.updateMethod(route.id, method.id, "operationId", e.target.value)}
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
                                                        label="name"
                                                        style={{ margin: 8 }}
                                                        margin="normal"
                                                        InputLabelProps={{
                                                          shrink: false,
                                                        }}
                                                        value={parameter.name}
                                                        onChange={(e) => this.updateParameter(route.id, method.id, parameter.id, "name", e.target.value)}
                                                      />
                                                      <TextField
                                                        label="in"
                                                        style={{ margin: 8 }}
                                                        margin="normal"
                                                        InputLabelProps={{
                                                          shrink: false,
                                                        }}
                                                        value={parameter.in}
                                                        onChange={(e) => this.updateParameter(route.id, method.id, parameter.id, "in", e.target.value)}
                                                      />
                                                      <TextField
                                                        label="description"
                                                        style={{ margin: 8 }}
                                                        margin="normal"
                                                        InputLabelProps={{
                                                          shrink: false,
                                                        }}
                                                        value={parameter.description}
                                                        onChange={(e) => this.updateParameter(route.id, method.id, parameter.id, "description", e.target.value)}
                                                      />
                                                      <TextField
                                                        label="type"
                                                        style={{ margin: 8 }}
                                                        margin="normal"
                                                        InputLabelProps={{
                                                          shrink: false,
                                                        }}
                                                        value={parameter.type}
                                                        onChange={(e) => this.updateParameter(route.id, method.id, parameter.id, "type", e.target.value)}
                                                      />
                                                      <Checkbox
                                                        color="primary"
                                                        inputProps={{ "aria-label": "secondary checkbox" }}
                                                        onChange={(e) => this.updateParameter(route.id, method.id, parameter.id, "required", e.target.checked)}
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
                                                        label="code"
                                                        style={{ margin: 8 }}
                                                        margin="normal"
                                                        InputLabelProps={{
                                                          shrink: false,
                                                        }}
                                                        value={response.code}
                                                        onChange={(e) => this.updateResponse(route.id, method.id, response.id, "code", e.target.value)}
                                                      />
                                                      <TextField
                                                        label="description"
                                                        style={{ margin: 8 }}
                                                        margin="normal"
                                                        InputLabelProps={{
                                                          shrink: false,
                                                        }}
                                                        value={response.description}
                                                        onChange={(e) => this.updateResponse(route.id, method.id, response.id, "description", e.target.value)}
                                                      />
                                                      <TextField
                                                        label="schema"
                                                        style={{ margin: 8 }}
                                                        margin="normal"
                                                        InputLabelProps={{
                                                          shrink: false,
                                                        }}
                                                        value={response.schema}
                                                        onChange={(e) => this.updateResponse(route.id, method.id, response.id, "schema", e.target.value)}
                                                      />
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
                                                              <ExpansionPanel
                                                                key={k}
                                                                // expanded={this.state.expanded === ("selector-" + g)}
                                                                onChange={this.handleChange("selector-" + k)}>
                                                                <ExpansionPanelSummary
                                                                  expandIcon={<ExpandMoreIcon />}
                                                                  aria-controls={"selector-" + k + "-content"}
                                                                  id={"selector-" + k + "-header"}
                                                                >
                                                                  <Typography>{selector.name ? selector.name : "Selector"}</Typography>
                                                                </ExpansionPanelSummary>
                                                                <ExpansionPanelDetails>
                                                                  <Typography>
                                                                    <TextField
                                                                      label="name"
                                                                      style={{ margin: 8 }}
                                                                      margin="normal"
                                                                      InputLabelProps={{
                                                                        shrink: false,
                                                                      }}
                                                                      value={selector.name}
                                                                      onChange={(e) => this.updateSelector(route.id, method.id, selector.id, "name", e.target.value)}
                                                                    />
                                                                    <FormControl>
                                                                      <InputLabel id="demo-simple-select-label">Selector Type</InputLabel>
                                                                      <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={selector.selectorType}
                                                                        onChange={(e) => { this.updateSelector(route.id, method.id, selector.id, "selectorType", e.target.value) }}
                                                                      >
                                                                        <MenuItem value={parameter}>Parameter</MenuItem>
                                                                        <MenuItem value={querySelector}>Query Selector</MenuItem>
                                                                        <MenuItem value={regex}>Regex</MenuItem>
                                                                        <MenuItem value={object}>Object</MenuItem>
                                                                      </Select>
                                                                    </FormControl>
                                                                    {
                                                                      selector.selectorType === "parameter" ?
                                                                        <ReactFragment>
                                                                          <TextField
                                                                            label="selector"
                                                                            style={{ margin: 8 }}
                                                                            margin="normal"
                                                                            InputLabelProps={{
                                                                              shrink: false,
                                                                            }}
                                                                            value={selector.selector}
                                                                            onChange={(e) => this.updateSelector(route.id, method.id, selector.id, "selector", e.target.value)}
                                                                          />
                                                                          {
                                                                            selector.type === "object" ?
                                                                              <div>hazem</div> : null
                                                                          }
                                                                        </ReactFragment> : null
                                                                    }
                                                                    {
                                                                      selector.selectorType === "querySelector" ?
                                                                        <ReactFragment>
                                                                          <TextField
                                                                            label="selector"
                                                                            style={{ margin: 8 }}
                                                                            margin="normal"
                                                                            InputLabelProps={{
                                                                              shrink: false,
                                                                            }}
                                                                            value={selector.selector}
                                                                            onChange={(e) => this.updateSelector(route.id, method.id, selector.id, "selector", e.target.value)}
                                                                          />
                                                                          <TextField
                                                                            label="type"
                                                                            style={{ margin: 8 }}
                                                                            margin="normal"
                                                                            InputLabelProps={{
                                                                              shrink: false,
                                                                            }}
                                                                            value={selector.type}
                                                                            onChange={(e) => this.updateSelector(route.id, method.id, type.id, "type", e.target.value)}
                                                                          />
                                                                          {
                                                                            selector.type === "object" ?
                                                                              <div>hazem</div>
                                                                              : null
                                                                          }
                                                                        </ReactFragment> : null

                                                                    }
                                                                    {
                                                                      selector.selectorType === "regex" ?
                                                                        <ReactFragment>
                                                                          <TextField
                                                                            label="selector"
                                                                            style={{ margin: 8 }}
                                                                            margin="normal"
                                                                            InputLabelProps={{
                                                                              shrink: false,
                                                                            }}
                                                                            value={selector.selector}
                                                                            onChange={(e) => this.updateSelector(route.id, method.id, selector.id, "selector", e.target.value)}
                                                                          />
                                                                          <TextField
                                                                            label="type"
                                                                            style={{ margin: 8 }}
                                                                            margin="normal"
                                                                            InputLabelProps={{
                                                                              shrink: false,
                                                                            }}
                                                                            value={selector.type}
                                                                            onChange={(e) => this.updateSelector(route.id, method.id, type.id, "type", e.target.value)}
                                                                          />
                                                                          <TextField
                                                                            label="regexGroup"
                                                                            style={{ margin: 8 }}
                                                                            margin="normal"
                                                                            InputLabelProps={{
                                                                              shrink: false,
                                                                            }}
                                                                            value={selector.regexGroup}
                                                                            onChange={(e) => this.updateSelector(route.id, method.id, regexGroup.id, "type", e.target.value)}
                                                                          />
                                                                          {
                                                                            selector.type === "object" ?
                                                                              <div>hazem</div> : null
                                                                          }
                                                                        </ReactFragment> : null
                                                                    }
                                                                    {
                                                                      selector.selectorType === "regex" ?
                                                                        <ReactFragment>
                                                                          <TextField
                                                                            label="selector"
                                                                            style={{ margin: 8 }}
                                                                            margin="normal"
                                                                            InputLabelProps={{
                                                                              shrink: false,
                                                                            }}
                                                                            value={selector.selector}
                                                                            onChange={(e) => this.updateSelector(route.id, method.id, selector.id, "selector", e.target.value)}
                                                                          />
                                                                          <TextField
                                                                            label="type"
                                                                            style={{ margin: 8 }}
                                                                            margin="normal"
                                                                            InputLabelProps={{
                                                                              shrink: false,
                                                                            }}
                                                                            value={selector.type}
                                                                            onChange={(e) => this.updateSelector(route.id, method.id, type.id, "type", e.target.value)}
                                                                          />
                                                                          <TextField
                                                                            label="regexGroup"
                                                                            style={{ margin: 8 }}
                                                                            margin="normal"
                                                                            InputLabelProps={{
                                                                              shrink: false,
                                                                            }}
                                                                            value={selector.regexGroup}
                                                                            onChange={(e) => this.updateSelector(route.id, method.id, regexGroup.id, "type", e.target.value)}
                                                                          />
                                                                          {
                                                                            selector.type === "object" ?
                                                                              <div>hazem</div> : null
                                                                          }
                                                                        </ReactFragment> : null
                                                                    }
                                                                    <IconButton
                                                                      edge="end"
                                                                      aria-label="delete"
                                                                      onClick={this.handleDeleteSelector}
                                                                      selector-id={selector.id}
                                                                    >
                                                                      <DeleteIcon />
                                                                    </IconButton>
                                                                  </Typography>
                                                                </ExpansionPanelDetails>
                                                              </ExpansionPanel>
                                                            )
                                                          })
                                                        }
                                                      </div>
                                                      <IconButton
                                                        edge="end"
                                                        aria-label="delete"
                                                        onClick={this.handleDeleteResponse}
                                                        response-id={response.id}
                                                      >
                                                        <DeleteIcon />
                                                      </IconButton>
                                                    </Typography>
                                                  </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                              )
                                            })
                                          }
                                        </div>
                                        <IconButton
                                          edge="end"
                                          aria-label="delete"
                                          onClick={this.handleDeleteMethod}
                                          method-id={method.id}
                                        >
                                          <DeleteIcon />
                                        </IconButton>
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
    );
  }
}
export default Route;
