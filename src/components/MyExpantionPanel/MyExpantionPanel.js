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
    this.setState({ expanded: isExpanded ? panel: false })
  };

  render() {
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
              <AddPanel comp={this.props.addPanelComp} onclick={this.props.onclick}>
                {this.props.addPanelCompName}
              </AddPanel>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default MyExpantionPanel;