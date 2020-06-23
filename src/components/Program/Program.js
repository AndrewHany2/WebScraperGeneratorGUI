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
    checked: "",
    value: "",
    values: {
      input: {
        name: "",
        required: false,
        default: false,
      },
      operation: {
        name: "",
        method: "",
        parent: "",
        multiple: false,
      },
      result: {
        type: "",
        value: "",
      },
    },
    finalValue: [],
  };

  handleChange = (panel) => (event, isExpanded) => {
    isExpanded
      ? this.setState({ expanded: panel })
      : this.setState({ expanded: false }); //new state manager//
  };

  checkIfDuplicated = (values) => {
    var arr = this.state.finalValue;
    for (let i in arr) {
      var firstObj = values;
      console.log("firstObj : ");
      console.log(firstObj);
      var secondObj = arr[i];
      console.log("secondObj : ");
      console.log(secondObj);
      console.log("compare result : ");
      console.log(JSON.stringify(firstObj) === JSON.stringify(secondObj));
      if (JSON.stringify(firstObj) === JSON.stringify(secondObj)) return true;
    }
  };

  handleSent = (values) => {
    if (!this.checkIfDuplicated(values) && values.length != 0) {
      var temp = [...this.state.finalValue, values];
      this.setState({ finalValue: temp });
    }
    console.log("values : ");
    console.log(this.state.values);
    console.log("values in parameter : ");
    console.log(values);
    console.log("final value : ");
    console.log(this.state.finalValue);
  };

  render() {
    return (
      <div>
        <MyExpantionPanel
          headName={"Input"}
          addPanelCompName={"ADD Input"}
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
                    ["values", "input", "name"],
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
                    ["values", "input", "required"],
                    e.target.checked
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
                    ["values", "input", "default"],
                    e.target.checked
                  );
                  this.setState(newState);
                }}
              />
              <IconButton
                onClick={() => {
                  this.handleSent(this.state.values.input);
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
            </Typography>
          }
        ></MyExpantionPanel>

        <MyExpantionPanel
          headName={"Operation"}
          addPanelCompName={"ADD Operation"}
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
                    ["values", "operation", "name"],
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
                    ["values", "operation", "method"],
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
                    ["values", "operation", "parent"],
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
                    ["values", "operation", "multiple"],
                    e.target.checked
                  );
                  this.setState(newState);
                }}
              />
              <IconButton
                onClick={() => {
                  this.handleSent(this.state.values.operation);
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
            </Typography>
          }
        ></MyExpantionPanel>

        <MyExpantionPanel
          headName={"result"}
          addPanelCompName={"ADD result"}
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
              <IconButton
                onClick={() => {
                  this.handleSent(this.state.values.result);
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
            </Typography>
          }
        ></MyExpantionPanel>
        <IconButton
          onClick={() => {
            this.props.dataSent(this.state.finalValue);
          }}
        >
          <DoneIcon fontSize="small" color="blue"></DoneIcon>
        </IconButton>
      </div>
    );
  }
}
