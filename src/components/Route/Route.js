import React, { Component } from "react";
import MyExpantionPanel from "../MyExpantionPanel/MyExpantionPanel";
import Method from "../Method/method";
import Parameter from "../Parameter/Parameter";
import { TextField } from "@material-ui/core";
import Response from "../Response/Response";
import DoneIcon from "@material-ui/icons/Done";
import IconButton from "@material-ui/core/IconButton";
import { set } from "lodash/fp";

class Route extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
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
          addPanelCompName={"Method"}
          addPanelComp={<Method dataSent={this.handleSent}></Method>}
        ></MyExpantionPanel>
        <MyExpantionPanel
          headName={"Parameters"}
          addPanelCompName={"Parameter"}
          addPanelComp={<Parameter dataSent={this.handleSent}></Parameter>}
        ></MyExpantionPanel>
        <MyExpantionPanel
          headName={"Responses"}
          addPanelCompName={"Response"}
          addPanelComp={<Response dataSent={this.handleSent}></Response>}
        ></MyExpantionPanel>
        <IconButton
          onClick={() => {
            this.handleSent(this.state.values);
          }}
        >
          <DoneIcon fontSize="small" color="blue"></DoneIcon>
        </IconButton>
      </div>
    );
  }
}

export default Route;
