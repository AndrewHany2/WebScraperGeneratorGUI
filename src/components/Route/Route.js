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

class Route extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: "",
      values: {
        method: {
          name: "Method",
          summary: "",
          operationId: "",
          description: "",
          outputFile: "",
        },
        parameter: {
          name: "Parameter",
          in: "",
          description: "",
          type: "",
          required: "",
        },
        response: {
          responseCode: "",
          description: "",
          schema: "",
        },
        routeMainInfo: {
          name: "",
        },
      },
      finalValue: [],
    };
  }

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
        <TextField
          id="standard-full-width"
          label="Route Name"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            const newState = set(
              ["values", "routeMainInfo", "name"],
              e.target.value
            );
            this.setState(newState);
          }}
        />
        <MyExpantionPanel
          headName={"Methods"}
          addPanelCompName={"ADD Method"}
          addPanelComp={
            <div>
              <TextField
                label={this.state.values.method.name}
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  const newState = set(
                    ["values", "method", "name"],
                    e.target.value
                  );
                  this.setState(newState);
                }}
              />
              <TextField
                label="Summary"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  const newState = set(
                    ["values", "method", "summary"],
                    e.target.value
                  );
                  this.setState(newState);
                }}
              />
              <TextField
                label="Description"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  const newState = set(
                    ["values", "method", "description"],
                    e.target.value
                  );
                  this.setState(newState);
                }}
              />
              <TextField
                label="Operation Id"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  const newState = set(
                    ["values", "method", "operationId"],
                    e.target.value
                  );
                  this.setState(newState);
                }}
              />
              <FormControl component="fieldset">
                <FormLabel component="legend">Output File</FormLabel>
                <RadioGroup
                  aria-label="outputFile"
                  name="outputFile"
                  value={this.state.values.outputFile}
                  onChange={(e) => {
                    const newState = set(
                      ["values", "method", "outputFile"],
                      e.target.value
                    );
                    this.setState(newState);
                  }}
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
                <IconButton
                  onClick={() => {
                    this.handleSent(this.state.values.method);
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
              </FormControl>
            </div>
          }
        ></MyExpantionPanel>

        <MyExpantionPanel
          headName={"Parameters"}
          addPanelCompName={"ADD Parameter"}
          addPanelComp={
            <div>
              <TextField
                label="Parameter Name"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  const newState = set(
                    ["values", "parameter", "name"],
                    e.target.value
                  );
                  this.setState(newState);
                }}
              />
              <TextField
                label="Parameter In"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  const newState = set(
                    ["values", "parameter", "in"],
                    e.target.value
                  );
                  this.setState(newState);
                }}
              />
              <TextField
                label="Description"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  const newState = set(
                    ["values", "parameter", "description"],
                    e.target.value
                  );
                  this.setState(newState);
                }}
              />
              <TextField
                label="Type"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  const newState = set(
                    ["values", "parameter", "type"],
                    e.target.value
                  );
                  this.setState(newState);
                }}
              />
              <Checkbox
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
                onChange={(e) => {
                  const newState = set(
                    ["values", "parameter", "required"],
                    e.target.checked
                  );
                  this.setState(newState);
                }}
              />
              <label>Required</label>
              <IconButton
                onClick={() => {
                  this.handleSent(this.state.values.parameter);
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
          }
        ></MyExpantionPanel>

        <MyExpantionPanel
          headName={"Responses"}
          addPanelCompName={"ADD Response"}
          addPanelComp={
            <div>
              <TextField
                label="Response Code"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  const newState = set(
                    ["values", "response", "responseCode"],
                    e.target.value
                  );
                  this.setState(newState);
                }}
              />
              <TextField
                label="Description"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  const newState = set(
                    ["values", "response", "description"],
                    e.target.value
                  );
                  this.setState(newState);
                }}
              />
              <TextField
                label="Schema"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  const newState = set(
                    ["values", "response", "schema"],
                    e.target.value
                  );
                  this.setState(newState);
                }}
              />
              {this.state.added}
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={this.props.ondelete}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  this.handleSent(this.state.values.response);
                }}
              >
                <DoneIcon fontSize="small" color="blue"></DoneIcon>
              </IconButton>
            </div>
          }
        ></MyExpantionPanel>
        <IconButton
          onClick={() => {
            this.handleSent(this.state.values.routeMainInfo);
            this.props.dataSent(this.state.finalValue);
          }}
        >
          <DoneIcon fontSize="small" color="blue"></DoneIcon>
        </IconButton>
      </div>
    );
  }
}

export default Route;
