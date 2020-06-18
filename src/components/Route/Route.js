import React, { Component } from "react";
import MyExpantionPanel from "../MyExpantionPanel/MyExpantionPanel";
import Method from "../Method/method";
import Parameter from "../Parameter/Parameter";
import { TextField } from "@material-ui/core";
import Response from "../Response/Response";

class Route extends Component {
  state = {};
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
        />
        <MyExpantionPanel
          headName={"Methods"}
          addPanelCompName={"Method"}
          addPanelComp={<Method></Method>}
        ></MyExpantionPanel>
        <MyExpantionPanel
          headName={"Parameters"}
          addPanelCompName={"Parameter"}
          addPanelComp={<Parameter></Parameter>}
        ></MyExpantionPanel>
        <MyExpantionPanel
          headName={"Responses"}
          addPanelCompName={"Response"}
          addPanelComp={<Response></Response>}
        ></MyExpantionPanel>
      </div>
    );
  }
}

export default Route;
