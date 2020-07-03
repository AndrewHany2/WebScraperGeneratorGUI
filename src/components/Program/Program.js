import React, { Component } from "react";
import {
  ExpansionPanel,
  Typography,
  TextField,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MyExpantionPanel from "../MyExpantionPanel/MyExpantionPanel";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { set } from "lodash/fp";
import DoneIcon from "@material-ui/icons/Done";
import openScraper from '../../global'


export default class Program extends Component {
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
        // operations: [...this.state.operations],
        // results: [...this.state.results]
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

  handleChange = (panel) => (event, isExpanded) => {
    isExpanded
      ? this.setState({ expanded: panel })
      : this.setState({ expanded: false }); //new state manager//
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
            <Typography>Program</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <div>
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
                            label="input"
                            style={{ margin: 8 }}
                            margin="normal"
                            value={input.name}
                            onChange={(e) => this.updateInput(input.id, "name", e.target.value)}
                          />
                          <label>required:</label>
                          <Checkbox
                            color="primary"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                            value={input.required}
                            onChange={(e) => this.updateInput(input.id, "required", e.target.value)}
                          />
                          <label>default:</label>
                          <Checkbox
                            color="primary"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                            value={input.default}
                            onChange={(e) => this.updateInput(input.id, "default", e.target.value)}
                          />
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={this.handleDeleteInput}
                            input-id={input.id}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    )
                  })
                }
              </div>
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
                          name: "", method: "", parent: "", multiple: ""
                        }]
                      }
                    });
                  }}>
                  Add operation
            </Button>
                {
                  this.state.program.operations.map((operation, i) => {
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
                          <Typography>{operation.name ? operation.name : "Operation"}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <TextField
                            label="operation"
                            style={{ margin: 8 }}
                            margin="normal"
                            value={operation.name}
                            onChange={(e) => this.updateOperation(operation.id, "name", e.target.value)}
                          />
                          <TextField
                            label="method"
                            style={{ margin: 8 }}
                            margin="normal"
                            value={operation.method}
                            onChange={(e) => this.updateOperation(operation.id, "method", e.target.value)}
                          />
                          <TextField
                            label="parent"
                            style={{ margin: 8 }}
                            margin="normal"
                            value={operation.parent}
                            onChange={(e) => this.updateOperation(operation.id, "parent", e.target.value)}
                          />
                          <label>multiple:</label>
                          <Checkbox
                            color="primary"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                            value={operation.multiple}
                            onChange={(e) => this.updateOperation(operation.id, "multiple", e.target.checked)}
                          />
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={this.handleDeleteOperation}
                            operation-id={operation.id}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
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
