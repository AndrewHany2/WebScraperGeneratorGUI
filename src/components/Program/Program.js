import React, { Component } from "react";
import {
  ExpansionPanel,
  Typography,
  TextField,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MyExpantionPanel from "../MyExpantionPanel/MyExpantionPanel";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { set } from "lodash/fp";
import DoneIcon from "@material-ui/icons/Done";

export default class Program extends Component {
  state = {
    values: {
      inputs: {
        name: "",
        required: true,
      },
      operations: {
        name: "",
        method: "",
        parent: "",
        multiple: "false",
      },
      result: {
        type: "",
        value: "",
      },
    },
    finalValue: [],
  };

  handleChange = (panel) => (event, isExpanded) => {
    // setExpanded(isExpanded ? panel : false); // //previous state manager , now not needed //
    isExpanded
      ? this.setState({ expanded: panel })
      : this.setState({ expanded: false }); //new state manager//
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
    if (!this.checkIfDuplicated(values)) {
      var temp = [...this.state.finalValue, values];
      this.setState({ finalValue: temp });
    }
    console.log(this.state.finalValue);
  };

  render() {
    return (
      <div>
        <MyExpantionPanel
          headName={"Input"}
          addPanelCompName={"Input"}
          addPanelComp={
            <Typography>
              <TextField
                label="Input name"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  const newState = set(
                    ["values", "inputs", "name"],
                    e.target.value
                  );
                  this.setState(newState);
                }}
              />
              <label>required:</label>
              <Checkbox
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
                onChange={(e) => {
                  const newState = set(
                    ["values", "inputs", "required"],
                    e.target.value
                  );
                  this.setState(newState);
                }}
              />
              <label>default:</label>
              <Checkbox
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
                onChange={(e) => {
                  const newState = set(
                    ["values", "inputs", "default"],
                    e.target.value
                  );
                  this.setState(newState);
                }}
              />
            </Typography>
          }
        ></MyExpantionPanel>

        <MyExpantionPanel
          headName={"Operation"}
          addPanelCompName={"Operation"}
          addPanelComp={
            <Typography>
              <TextField
                label="Operation name"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  const newState = set(
                    ["values", "operations", "name"],
                    e.target.value
                  );
                  this.setState(newState);
                }}
              />
              <TextField
                label="method"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  const newState = set(
                    ["values", "operations", "method"],
                    e.target.value
                  );
                  this.setState(newState);
                }}
              />
              <TextField
                label="parent"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  const newState = set(
                    ["values", "operations", "parent"],
                    e.target.value
                  );
                  this.setState(newState);
                }}
              />
              <label>multiple:</label>
              <Checkbox
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
                onChange={(e) => {
                  const newState = set(
                    ["values", "operations", "multiple"],
                    e.target.value
                  );
                  this.setState(newState);
                }}
              />
            </Typography>
          }
        ></MyExpantionPanel>

        <MyExpantionPanel
          headName={"result"}
          addPanelCompName={"result"}
          addPanelComp={
            <Typography>
              <TextField
                label="Type"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  const newState = set(
                    ["values", "result", "type"],
                    e.target.value
                  );
                  this.setState(newState);
                }}
              />
              <TextField
                label="Value"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  const newState = set(
                    ["values", "result", "value"],
                    e.target.value
                  );
                  this.setState(newState);
                }}
              />
            </Typography>
          }
        ></MyExpantionPanel>
        <IconButton
          onClick={() => {
            this.handleSent(this.state.values);
          }}
        >
          <DoneIcon fontSize="small" color="blue"></DoneIcon>
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={this.props.ondelete}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    );
  }
}
