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
import openScraper from '../../global'

class MainInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainInfo: {
        name: "",
        defaultHeaders: "",
        hosts: []
      }
    }
  };

  componentDidUpdate() {
    openScraper.mainInfo = this.state.mainInfo;
  }

  handleDelete = (e) => {
    const index = e.target.closest("button[testmain]").getAttribute("index");

    console.log(index);

    console.log("pre:");
    console.log(this.state.mainInfo.hosts);

    var hosts = [...this.state.mainInfo.hosts].splice(index, 1);
    
    console.log("post:");
    console.log(hosts);
    
    this.setState({ mainInfo: { name: this.state.mainInfo.name, defaultHeaders: this.state.mainInfo.defaultHeaders, hosts: [...hosts] } }, () => console.log(this.state.mainInfo.hosts));
  }


  
  render() {
    return (
      <div>
        <MyExpantionPanel
          headName={"Main"}
          addPanelCompName={"Add Host"}
          onclick={() => { this.setState({ mainInfo: { name: this.state.mainInfo.name, defaultHeaders: this.state.mainInfo.defaultHeaders, hosts: [...this.state.mainInfo.hosts, { name: "", url: "", default: false }] } }); console.log(";;") }}
          addPanelComp={
            <MyExpantionPanel headName={"Host"}>
              <TextField
                label={this.state.mainInfo.hosts[this.state.mainInfo.hosts.length - 1]?.name}
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  index: (this.state.mainInfo.hosts.length == 0) ? 0 : this.state.mainInfo.hosts.length
                }}
                onChange={(e) => {
                  this.state.mainInfo.hosts[e.target.getAttribute("index")].name = e.target.value;
                }}
              />
              <TextField
                label="url"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  index: (this.state.mainInfo.hosts.length == 0) ? 0 : this.state.mainInfo.hosts.length
                }}
                onChange={(e) => {
                  this.state.mainInfo.hosts[e.target.getAttribute("index")].url = e.target.value;
                }}
              />
              <label>default:</label>
              <Checkbox
                color="primary"
                inputProps={{
                  "aria-label": "secondary checkbox",
                  index: (this.state.mainInfo.hosts.length == 0) ? 0 : this.state.mainInfo.hosts.length
                }}
                onChange={(e) => {
                  this.state.mainInfo.hosts[e.target.getAttribute("index")].default = e.target.checked;
                }}
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={this.handleDelete}
                index={(this.state.mainInfo.hosts.length == 0) ? 0 : this.state.mainInfo.hosts.length}
                testmain=""
              >
                <DeleteIcon />
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
              this.state.mainInfo.name = e.target.value;
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
              this.state.mainInfo.defaultHeaders = e.target.value;
            }}
          />
        </MyExpantionPanel>
      </div>
    );
  }
}

export default MainInfo;
