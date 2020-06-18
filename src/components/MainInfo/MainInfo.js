import React, { Component } from "react";
import MyExpantionPanel from "../MyExpantionPanel/MyExpantionPanel";
import Host from "../Host/Host";
import { TextField } from "@material-ui/core";

class MainInfo extends Component {
  state = {};
  render() {
    return (
      <div>
        <MyExpantionPanel
          headName={"Main"}
          addPanelCompName={"Host"}
          addPanelComp={<Host></Host>}
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
          />
        </MyExpantionPanel>
      </div>
    );
  }
}

export default MainInfo;
