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

class Host extends Component {
  constructor(props) {
    super(props);
    this.state = {
      added: [],
      expanded: "false",
      values: {
        host: {
          hostName: "Host",
          url: "",
          default: "false",
        },
      },
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
            <Typography>{this.state.values.host.hostName}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
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
              <IconButton
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
              {this.state.added}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default Host;
