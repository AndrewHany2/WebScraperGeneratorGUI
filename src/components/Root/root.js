import React, { Component } from "react";
import MainInfo from "../MainInfo/MainInfo";
import MyExpantionPanel from "../MyExpantionPanel/MyExpantionPanel";
import Route from "../Route/Route";
import Program from "../Program/Program";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";

class Rt extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    if (!this.checkIfDuplicated(values) && values.length != 0) {
      var temp = [...this.state.finalValue, values];
      this.setState({ finalValue: temp });
    }
  };
  
  render() {
    return (
      <div>
        <MainInfo dataSent={this.handleSent}></MainInfo>
        <MyExpantionPanel
          headName={"Routes"}
          addPanelCompName={"ADD Route"}
          addPanelComp={<Route dataSent={this.handleSent}></Route>}
        ></MyExpantionPanel>
        <MyExpantionPanel
          headName={"Program"}
          addPanelCompName={"ADD Program"}
          addPanelComp={<Program dataSent={this.handleSent}></Program>}
        ></MyExpantionPanel>
        <IconButton
          onClick={() => {
            console.log(this.state.finalValue);
          }}
        >
          <DoneIcon fontSize="small" color="blue"></DoneIcon>
        </IconButton>
      </div>
    );
  }
}

export default Rt;
