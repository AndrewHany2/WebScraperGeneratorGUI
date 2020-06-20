import React, { Component } from "react";
import MyExpantionPanel from "../MyExpantionPanel/MyExpantionPanel";
import Host from "../Host/Host";
import { TextField } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import IconButton from "@material-ui/core/IconButton";
import { set } from "lodash/fp";

class MainInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        mainInfo: {
          name: "",
          defaultHeaders: "",
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
    console.log(values);
    if (!this.checkIfDuplicated(values)) {
      var temp = [...this.state.finalValue, values];
      this.setState({ finalValue: temp });
      console.log("not duplicated");
    }
  };

  render() {
    return (
      <div>
        <MyExpantionPanel
          headName={"Main"}
          addPanelCompName={"Host"}
          addPanelComp={<Host dataSent={this.handleSent}></Host>}
        >
          <TextField
            id="standard-full-width"
            label="Name"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              const newState = set(
                ["values", "mainInfo", "name"],
                e.target.value
              );
              this.setState(newState);
            }}
          />
          <TextField
            id="standard-full-width"
            label="DefaultHeaders"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              const newState = set(
                ["values", "mainInfo", "defaultHeaders"],
                e.target.value
              );
              this.setState(newState);
            }}
          />
          <IconButton
            onClick={() => {
              this.handleSent(this.state.values);
              console.log(this.state.finalValue);
            }}
          >
            <DoneIcon fontSize="small" color="blue"></DoneIcon>
          </IconButton>
        </MyExpantionPanel>
      </div>
    );
  }
}

export default MainInfo;
