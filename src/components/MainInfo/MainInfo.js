import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import { set } from "lodash/fp";
import MyExpantionPanel from "./../MyExpantionPanel/MyExpantionPanel";

class MainInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: "false",
      values: {
        mainInfo: {
          name: "",
          defaultHeaders: "",
        },
        host: {
          hostName: "Host",
          url: "",
          default: "false",
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
          headName={"Main"}
          addPanelCompName={"ADD Host"}
          addPanelComp={
            // <ExpansionPanel
            //   expanded={this.state.expanded === "panel1"}
            //   onChange={this.handleChange("panel1")}
            // >
            //   <ExpansionPanelSummary
            //     expandIcon={<ExpandMoreIcon />}
            //     aria-controls="panel1bh-content"
            //     id="panel1bh-header"
            //   >
            //     <Typography></Typography>
            //   </ExpansionPanelSummary>
            //   <ExpansionPanelDetails>
            //     <Typography>
            <MyExpantionPanel headName={"Host"}>
              <TextField
                label={this.state.values.host.hostName}
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  const newState = set(
                    ["values", "host", "hostName"],
                    e.target.value
                  );
                  this.setState(newState);
                }}
              />
              <TextField
                label="url"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  const newState = set(
                    ["values", "host", "url"],
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
                    ["values", "host", "default"],
                    e.target.value
                  );
                  this.setState(newState);
                }}
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={this.props.ondelete}
              >
                <DeleteIcon />
              </IconButton>
            </MyExpantionPanel>
            /* <IconButton
                      onClick={() => {
                        this.props.dataSent(this.state.values);
                        var added = (
                          <div>
                            {this.state.values.host.hostName} added successfully
                          </div>
                        );
                        this.setState({ added: added });
                      }}
                    >
                      <DoneIcon fontSize="small" color="blue"></DoneIcon>
                    </IconButton>
                    // {this.state.added} */
            //     </Typography>
            //   </ExpansionPanelDetails>
            // </ExpansionPanel>
          }
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
