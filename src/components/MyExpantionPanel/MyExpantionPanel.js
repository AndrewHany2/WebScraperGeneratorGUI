import React, { Component } from "react";
import AddPanel from "../AddPanel/AddPanel";
import { ExpansionPanel } from "@material-ui/core";
import {
  Typography,
  TextField,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

class MyExpantionPanel extends Component {
  state = {};

  handleChange = (panel) => (event, isExpanded) => {
    // setExpanded(isExpanded ? panel : false); // //previous state manager , now not needed //
    isExpanded
      ? this.setState({ expanded: panel })
      : this.setState({ expanded: false }); //new state manager//
  };
  a() {
    return (
      <div>
        <ExpansionPanel
          expanded={this.state.expanded === "panel1"}
          onChange={this.handleChange("panel1")}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography>{this.props.headName}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {this.props.children}
              <AddPanel comp={this.props.addPanelComp}>
                {this.props.addPanelCompName}
              </AddPanel>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
  render() {
    return this.a();
  }
}

export default MyExpantionPanel;
