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
import openScraper from '../../global'
import Button from "@material-ui/core/Button";

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
    // let mainInfo = this.state.mainInfo;
    // mainInfo.hosts.forEach(v => delete v.id); // delete is bad
    // https://stackoverflow.com/questions/18133635/remove-property-for-all-objects-in-array
    // Make it all at once on sending to api

    openScraper.mainInfo = this.state.mainInfo;
  }

  handleDelete = (e) => {
    const id = e.target.closest("button[host-id]").getAttribute("host-id");

    this.state.mainInfo.hosts.find(host => host.id == host.id);

    var hosts = [...this.state.mainInfo.hosts];
    hosts.splice(id, 1);

    this.setState({
      mainInfo: {
        name: this.state.mainInfo.name,
        defaultHeaders: this.state.mainInfo.defaultHeaders,
        hosts: [...hosts]
      }
    }, () => console.log(this.state.mainInfo.hosts));
  }

  updateHost = (id, property, value) => {
    let hosts = this.state.mainInfo.hosts;
    this.state.mainInfo.hosts.find((host, i) => {
      if (host.id === id) {
        hosts[i][property] = value;
        return true;
      }
    });

    this.setState({
      mainInfo: {
        name: this.state.mainInfo.name,
        defaultHeaders: this.state.mainInfo.defaultHeaders,
        hosts: hosts
      }
    });
  }

  handleChange = (panel) => (event, isExpanded) => {
    this.setState({ expanded: isExpanded ? panel : false })
  };

  render() {
    return (
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="main-panel-content"
            id="main-panel-header"
          >
            <Typography>Main</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <Button
                onClick={() => {
                  this.setState({
                    mainInfo:
                    {
                      name: this.state.mainInfo.name,
                      defaultHeaders: this.state.mainInfo.defaultHeaders,
                      hosts: [...this.state.mainInfo.hosts, {
                        id: (this.state.mainInfo.hosts[this.state.mainInfo.hosts.length - 1]?.id ?? -1) + 1,
                        name: "", url: "", default: false
                      }]
                    }
                  });
                }}>
                Add Host
                </Button>
              {
                this.state.mainInfo.hosts.map((host, i) => {
                  return (
                    <ExpansionPanel
                      key={i}
                      expanded={this.state.expanded === ("panel-" + i)}
                      onChange={this.handleChange("panel-" + i)}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={"panel-" + i + "-content"}
                        id={"panel-" + i + "-header"}
                      >
                        <Typography>{host.name}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <TextField
                          label="host"
                          style={{ margin: 8 }}
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={host.name}
                          onChange={(e) => this.updateHost(host.id, "name", e.target.value)}
                        />
                        <TextField
                          label="url"
                          style={{ margin: 8 }}
                          margin="normal"
                          value={host.url}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => this.updateHost(host.id, "url", e.target.value)}
                        />
                        <label>default:</label>
                        <Checkbox
                          color="primary"
                          inputProps={{
                            "aria-label": "secondary checkbox",
                          }}
                          checked={host.default}
                          onChange={(e) => this.updateHost(host.id, "default", e.target.checked)}
                        />
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={this.handleDelete}
                          host-id={host.id}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  );
                })
              }
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default MainInfo;
