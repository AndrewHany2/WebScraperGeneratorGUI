import React, { Component } from "react";
import MainInfo from "../MainInfo/MainInfo";
import MyExpantionPanel from "../MyExpantionPanel/MyExpantionPanel";
import Route from "../Route/Route";
import Program from "../Program/Program";

class Rt extends Component {
  render() {
    return (
      <div>
        <MainInfo></MainInfo>
        <MyExpantionPanel
          headName={"Routes"}
          addPanelCompName={"Route"}
          addPanelComp={<Route></Route>}
        ></MyExpantionPanel>
        <MyExpantionPanel
          headName={"Program"}
          addPanelCompName={"Program"}
          addPanelComp={<Program></Program>}
        ></MyExpantionPanel>
        {/* <Program></Program> */}
      </div>
    );
  }
}

export default Rt;
