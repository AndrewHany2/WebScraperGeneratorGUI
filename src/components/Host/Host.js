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

class Host extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: "false",
      HostName: "Host",
    };
  }

  handleChange = (panel) => (event, isExpanded) => {
    // setExpanded(isExpanded ? panel : false); // //previous state manager , now not needed //
    isExpanded
      ? this.setState({ expanded: panel })
      : this.setState({ expanded: false }); //new state manager//
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
            <Typography>{this.state.HostName}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <TextField
                label={this.state.HostName}
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  this.setState({ HostName: e.target.value });
                }}
              />
              <TextField
                label="Url"
                style={{ margin: 8 }}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
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
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default Host;
