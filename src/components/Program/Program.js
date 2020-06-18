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
// import Route from "./Route";

export default class Program extends Component {
  state = {
    value: "",
  };

  handleChange = (panel) => (event, isExpanded) => {
    // setExpanded(isExpanded ? panel : false); // //previous state manager , now not needed //
    isExpanded
      ? this.setState({ expanded: panel })
      : this.setState({ expanded: false }); //new state manager//
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
              />
              <label>required:</label>
              <Checkbox
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              <label>default:</label>
              <Checkbox
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
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
              />
              <TextField
                label="method"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="parent"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <label>multiple:</label>
              <Checkbox
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
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
              />
              <TextField
                label="Value"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
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
      </div>
    );
  }
}
