import React, { Component } from "react";
import {
  ExpansionPanel,
  Typography,
  TextField,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button,
  FormControlLabel
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MyExpantionPanel from "../MyExpantionPanel/MyExpantionPanel";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { set } from "lodash/fp";
import DoneIcon from "@material-ui/icons/Done";
import openScraper from '../../global'
import { withStyles } from '@material-ui/styles';


const styles = theme => ({
  details: {
    display: "block"
  }
});

class Program extends Component {
  state = {
    program: {
      inputs: [],
      operations: [],
      results: []
    }
  }

  componentDidUpdate() {
    openScraper.program = this.state.program;
  }


  handleDeletInput = (e) => {
    const inputId = e.target.closest("div[input-id]").getAttribute("input-id");

    this.deleteInput(inputId);
  }

  deleteInput = (inputId) => {
    let inputs = this.state.program.inputs;
    this.state.program.inputs.find((input, i) => {
      if (input.id == inputId) {
        inputs.splice(i, 1);
        return true;
      }
    });

    this.setState({
      program: {
        inputs: [...inputs],
        operations: [...this.state.program.operations],
        results: [...this.state.program.results]
      }
    });
  }


  updateInput = (id, property, value) => {
    let inputs = this.state.program.inputs;
    this.state.program.inputs.find((input, i) => {
      if (input.id === id) {
        inputs[i][property] = value;
        return true;
      }
    });
    this.setState({
      program: {
        inputs: [...inputs],
        operations: [...this.state.program.operations],
        results: [...this.state.program.results]
      }
    });
  }
  handleDeleteResult = (e) => {
    const resultId = e.target.closest("div[result-id]").getAttribute("result-id");

    this.deleteResult(resultId);
  }

  deleteResult = (resultId) => {
    let results = this.state.program.results;
    this.state.program.results.find((result, i) => {
      if (result.id == resultId) {
        results.splice(i, 1);
        return true;
      }
    });

    this.setState({
      program: {
        results: [...results],
        operations: [...this.state.program.operations],
        inputs: [...this.state.program.inputs]
      }
    });
  }


  updateResult = (id, property, value) => {
    let results = this.state.program.results;
    this.state.program.results.find((result, i) => {
      if (result.id === id) {
        results[i][property] = value;
        return true;
      }
    });
    this.setState({
      program: {
        results: [...results],
        operations: [...this.state.program.operations],
        inputs: [...this.state.program.inputs]
      }
    });
  }

  handleDeletOperation = (e) => {
    const operationId = e.target.closest("div[operation-id]").getAttribute("operation-id");

    this.deleteOperation(operationId);
  }

  deleteOperation = (operationId) => {
    let operations = this.state.program.operations;
    this.state.program.operations.find((operation, i) => {
      if (operation.id == operationId) {
        operations.splice(i, 1);
        return true;
      }
    });

    this.setState({
      program: {
        operations: [...operations],
        inputs: [...this.state.program.inputs],
        results: [...this.state.program.results]
      }
    });
  }


  updateOperation = (id, property, value) => {
    let operations = this.state.program.operations;
    this.state.program.operations.find((operation, i) => {
      if (operation.id === id) {
        operations[i][property] = value;
        return true;
      }
    });
    this.setState({
      program: {
        operations: [...operations],
        inputs: [...this.state.program.inputs],
        results: [...this.state.program.results]
      }
    });
  }

  handleDeleteParameter = (e) => {
    const operationId = e.target.closest("div[operation-id]").getAttribute("operation-id");
    const parameterId = e.target.closest("button[parameter-id]").getAttribute("parameter-id");

    this.deleteParameter(operationId, parameterId);
  }

  deleteParameter = (operationId, parameterId) => {
    let operations = this.state.program.operations;
    this.state.program.operations.find((operation, i) => {
      if (operation.id == operationId) {

        let parameters = operation.parameters;
        operation.parameters.find((parameter, j) => {
          if (parameter.id == parameterId) {
            parameters.splice(j, 1);
            return true;
          }
        });

        operations[i].parameters = [...parameters];

        return true;
      }
    });

    this.setState({
      program:
      {
        operations: [...operations],
        results: [...this.state.program.results],
        inputs: [...this.state.program.inputs]
      }
    });
  }

  addParameter = (operationId, parameter) => {
    let operations = this.state.program.operations;
    this.state.program.operations.find((operation, i) => {
      if (operation.id === operationId) {
        operations[i].parameters.push(parameter);
        return true;
      }
    });

    this.setState({
      program:
      {
        operations: [...operations],
        results: [...this.state.program.results],
        inputs: [...this.state.program.inputs]
      }
    });
  }

  updateParameter = (operationId, parameterId, property, value) => {
    let operations = this.state.program.operations;
    this.state.program.operations.find((operation, i) => {
      if (operation.id === operationId) {

        let parameters = operation.parameters;
        operation.parameters.find((parameter, j) => {
          if (parameter.id === parameterId) {
            operations[i].parameters[j][property] = value;
            return true;
          }
        });

        // operations[i].parameters = [...parameters];
        return true;
      }
    });
    this.setState({
      program:
      {
        operations: [...operations],
        results: [...this.state.program.results],
        inputs: [...this.state.program.inputs]
      }
    });
  }


  handleChange = (panel) => (event, isExpanded) => {
    isExpanded
      ? this.setState({ expanded: panel })
      : this.setState({ expanded: false }); //new state manager//
  };


  render() {
    const { classes } = this.props;

    return (
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="main-panel-content"
            id="main-panel-header"
          >
            <Typography>Program</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <Button
                onClick={() => {
                  this.setState({
                    program:
                    {
                      operations: [...this.state.program.operations],
                      results: [...this.state.program.results],
                      inputs: [...this.state.program.inputs, {
                        id: (this.state.program.inputs[this.state.program.inputs.length - 1]?.id ?? -1) + 1,
                        name: "", method: "", default: ""
                      }]
                    }
                  });
                }}>
                Add input
            </Button>
              {
                this.state.program.inputs.map((input, i) => {
                  return (
                    <ExpansionPanel
                      key={i}
                      input-id={input.id}
                      expanded={this.state.expanded === ("panel-" + i)}
                      onChange={this.handleChange("panel-" + i)}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={"panel-" + i + "-content"}
                        id={"panel-" + i + "-header"}
                      >
                        <Typography>{input.name ? input.name : "Input"}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <TextField
                          label="Input"
                          style={{ margin: 8 }}
                          margin="normal"
                          value={input.name}
                          onChange={(e) => this.updateInput(input.id, "name", e.target.value)}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="checkedB"
                              color="primary"
                              onChange={(e) => this.updateInput(input.id, "required", e.target.value)}
                            />
                          }
                          label="Required"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="checkedB"
                              color="primary"
                              onChange={(e) => this.updateInput(input.id, "default", e.target.value)}
                            />
                          }
                          label="Default"
                        />
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={this.handleDeletInput}
                          input-id={input.id}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  )
                })
              }
              <div>
                <Button
                  onClick={() => {
                    this.setState({
                      program:
                      {
                        inputs: [...this.state.program.inputs],
                        results: [...this.state.program.results],
                        operations: [...this.state.program.operations, {
                          id: (this.state.program.operations[this.state.program.operations.length - 1]?.id ?? -1) + 1,
                          name: "", method: "", parent: "", multiple: "", parameters: []
                        }]
                      }
                    });
                  }}>
                  Add operation
            </Button>
                {
                  this.state.program.operations.map((operation, i) => {
                    return (
                      <div>
                        <ExpansionPanel
                          key={i}
                          operation-id={operation.id}
                          expanded={this.state.expanded === ("panel-" + i)}
                          onChange={this.handleChange("panel-" + i)}>
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={"panel-" + i + "-content"}
                            id={"panel-" + i + "-header"}
                          >
                            <Typography>{operation.name ? operation.name : "Operation"}</Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails className={classes.details}>
                            <TextField
                              label="Operation"
                              style={{ margin: 8 }}
                              margin="normal"
                              value={operation.name}
                              onChange={(e) => this.updateOperation(operation.id, "name", e.target.value)}
                            />
                            <TextField
                              label="Method"
                              style={{ margin: 8 }}
                              margin="normal"
                              value={operation.method}
                              onChange={(e) => this.updateOperation(operation.id, "method", e.target.value)}
                            />
                            <TextField
                              label="Parent"
                              style={{ margin: 8 }}
                              margin="normal"
                              value={operation.parent}
                              onChange={(e) => this.updateOperation(operation.id, "parent", e.target.value)}
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="checkedB"
                                  color="primary"
                                  onChange={(e) => this.updateOperation(operation.id, "multiple", e.target.checked)}
                                />
                              }
                              label="Multiple"
                            />
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={this.handleDeletOperation}
                              operation-id={operation.id}
                            >
                              <DeleteIcon />
                            </IconButton>
                            <div>
                              <Button
                                onClick={() => {
                                  this.addParameter(operation.id, {
                                    id: (operation.parameters[operation.parameters.length - 1]?.id ?? -1) + 1,
                                    name: "",
                                    type: "",
                                    value: ""
                                  });
                                }}>
                                Add Parameter
                            </Button>
                              {
                                operation.parameters.map((parameter, i) => {
                                  return (
                                    <div>
                                      <ExpansionPanel
                                        key={i}
                                        parameter-id={parameter.id}
                                        expanded={this.state.expanded === ("panel-" + i)}
                                        onChange={this.handleChange("panel-" + i)}>
                                        <ExpansionPanelSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls={"panel-" + i + "-content"}
                                          id={"panel-" + i + "-header"}
                                        >
                                          <Typography>{parameter.name ? parameter.name : "Parameter"}</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                          <TextField
                                            label="Parameter"
                                            style={{ margin: 8 }}
                                            margin="normal"
                                            value={parameter.name}
                                            onChange={(e) => this.updateParameter(operation.id, parameter.id, "name", e.target.value)}
                                          />
                                          <TextField
                                            label="Type"
                                            style={{ margin: 8 }}
                                            margin="normal"
                                            value={parameter.type}
                                            onChange={(e) => this.updateParameter(operation.id, parameter.id, "type", e.target.value)}
                                          />
                                          <TextField
                                            label="Value"
                                            style={{ margin: 8 }}
                                            margin="normal"
                                            value={parameter.value}
                                            onChange={(e) => this.updateParameter(operation.id, parameter.id, "value", e.target.value)}
                                          />
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
                                    </div>
                                  )
                                })
                              }
                            </div>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      </div>
                    )
                  })
                }
              </div>
              <div>
                <Button
                  onClick={() => {
                    this.setState({
                      addResult: true,
                      program:
                      {
                        inputs: [...this.state.program.inputs],
                        operations: [...this.state.program.operations],
                        results: [...this.state.program.results, {
                          id: (this.state.program.results[this.state.program.results.length - 1]?.id ?? -1) + 1,
                          type: "", value: ""
                        }]
                      }
                    });
                  }}>
                  Add result
            </Button>
                {
                  this.state.program.results.map((result, i) => {
                    return (
                      <ExpansionPanel
                        key={i}
                        result-id={result.id}
                        expanded={this.state.expanded === ("panel-" + i)}
                        onChange={this.handleChange("panel-" + i)}>
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={"panel-" + i + "-content"}
                          id={"panel-" + i + "-header"}
                        >
                          <Typography>{result.type ? result.type : "Result"}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <TextField
                            label="Type"
                            style={{ margin: 8 }}
                            margin="normal"
                            resultLabelProps={{
                              shrink: true,
                            }}
                            value={result.type}
                            onChange={(e) => this.updateResult(result.id, "type", e.target.value)}
                          />
                          <TextField
                            label="Value"
                            style={{ margin: 8 }}
                            margin="normal"
                            resultLabelProps={{
                              shrink: true,
                            }}
                            value={result.value}
                            onChange={(e) => this.updateResult(result.id, "value", e.target.value)}
                          />
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={this.handleDeleteResult}
                            result-id={result.id}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    )
                  })
                }
              </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(Program);