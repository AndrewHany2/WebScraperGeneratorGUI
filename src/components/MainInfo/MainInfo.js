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
import values from "./../GlobalState/GlobalState"

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
          default: false,
        },
      },
      finalValue: [],
    };
  }

  componentDidUpdate=( prevProps,  prevState)=>
  {
    console.log(prevState)
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
            <MyExpantionPanel headName={"Host"}>
              <TextField
                label={this.state.values.host.hostName}
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  // const newState = set(
                  //   ["values", "host", "hostName"],
                  //   e.target.value
                  // );
                  // this.setState(newState);
                  values.mainInfo.Host.push({hostName: e.target.value})
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
                  // const newState = set(
                  //   ["values", "host", "url"],
                  //   e.target.value
                  // );
                  // this.setState(newState);
                  values.mainInfo.Host.url=e.target.value;
                }}
              />
              <label>default:</label>
              <Checkbox
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
                onChange={(e) => {
                  // const newState = set(
                  //   ["values", "host", "default"],
                  //   e.target.checked
                  // );
                  // this.setState(newState);
                  values.mainInfo.Host.default=e.target.checked;
                }}
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={this.props.ondelete}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  this.handleSent(this.state.values.host);
                }}
              >
                <DoneIcon fontSize="small" color="blue"></DoneIcon>
              </IconButton>
            </MyExpantionPanel>
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
              // const newState = set(
              //   ["values", "mainInfo", "name"],
              //   e.target.value
              // );
              // this.setState(newState);
              values.mainInfo.name=e.target.value;
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
              // const newState = set(
              //   ["values", "mainInfo", "defaultHeaders"],
              //   e.target.value
              // );
              // this.setState(newState);
              values.mainInfo.defaultHeaders=e.target.value;
            }}
          />
          <IconButton
            onClick={() => {
              // this.handleSent(this.state.values.mainInfo);
              // this.props.dataSent(this.state.finalValue);
              console.log(values);
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
