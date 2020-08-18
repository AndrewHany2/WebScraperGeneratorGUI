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
import FormControlLabel from '@material-ui/core/FormControlLabel';


class MainInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainInfo: {
        name: "",
        defaultHeaders: [],
        hosts: []
      }
    }
  };

  componentDidUpdate() {
    openScraper.mainInfo = this.state.mainInfo;
  }

  handleDeleteDefaultHeader = (e) => {
    const id = e.target.closest("button[defaultHeader-id]").getAttribute("defaultHeader-id");

    this.state.mainInfo.defaultHeaders.find(defaultHeader => defaultHeader.id == defaultHeader.id);

    var defaultHeaders = [...this.state.mainInfo.defaultHeaders];
    defaultHeaders.splice(id, 1);

    this.setState({
      mainInfo: {
        name: this.state.mainInfo.name,
        hosts: [...this.state.mainInfo.hosts],
        defaultHeaders: [...defaultHeaders]
      }
    }, () => console.log(this.state.mainInfo.defaultHeaders));
  }

  updateDefaultHeader = (id, property, value) => {
    let defaultHeaders = this.state.mainInfo.defaultHeaders;
    this.state.mainInfo.defaultHeaders.find((defaultHeader, i) => {
      if (defaultHeader.id === id) {
        defaultHeaders[i][property] = value;
        return true;
      }
    });
    this.setState({
      mainInfo: {
        name: this.state.mainInfo.name,
        hosts: [...this.state.mainInfo.hosts],
        defaultHeaders: defaultHeaders
      }
    });
  }

  handleDeleteHost = (e) => {
    const id = e.target.closest("button[host-id]").getAttribute("host-id");

    this.state.mainInfo.hosts.find(host => host.id == host.id);

    var hosts = [...this.state.mainInfo.hosts];
    hosts.splice(id, 1);

    this.setState({
      mainInfo: {
        name: this.state.mainInfo.name,
        defaultHeaders: [...this.state.mainInfo.defaultHeaders],
        hosts: [...hosts],
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
        defaultHeaders: [...this.state.mainInfo.defaultHeaders],
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
              <TextField
                required id="standard-required"
                label="Name"
                style={{ margin: 8 }}
                margin="normal"
                onChange={(e) =>
                  this.setState({
                    mainInfo: {
                      name: e.target.value,
                      defaultHeaders: [...this.state.mainInfo.defaultHeaders],
                      hosts: [...this.state.mainInfo.hosts],
                    }
                  })}
              />
              <div>
                <Button
                  onClick={() => {
                    console.log(this.state.mainInfo)
                    this.setState({
                      addDefaultHeader: true,
                      mainInfo:
                      {
                        name: this.state.mainInfo.name,
                        hosts: [...this.state.mainInfo.hosts],
                        defaultHeaders: [...this.state.mainInfo.defaultHeaders, {
                          id: (this.state.mainInfo.defaultHeaders[this.state.mainInfo.defaultHeaders.length - 1]?.id ?? -1) + 1,
                          name: "",
                          value: ""
                        }]
                      }
                    });
                  }}>
                  Add Default Header
              </Button>
                {
                  this.state.mainInfo.defaultHeaders.map((defaultHeader, i) => {
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
                          <Typography>{defaultHeader.name ? defaultHeader.name : "Default Header"}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <TextField
                            label="Name"
                            style={{ margin: 8 }}
                            margin="normal"
                            value={defaultHeader.name}
                            onChange={(e) => this.updateDefaultHeader(defaultHeader.id, "name", e.target.value)}
                          />
                          <TextField
                            label="Value"
                            style={{ margin: 8 }}
                            margin="normal"
                            value={defaultHeader.value}
                            onChange={(e) => this.updateDefaultHeader(defaultHeader.id, "value", e.target.value)}
                          />
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={this.handleDeleteDefaultHeader}
                            defaultHeader-id={defaultHeader.id}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    );
                  })
                }
              </div>
              <div>
                <Button
                  onClick={() => {
                    this.setState({
                      addHost: true,
                      mainInfo:
                      {
                        name: this.state.mainInfo.name,
                        defaultHeaders: [...this.state.mainInfo.defaultHeaders],
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
                          <Typography>{host.name ? host.name : "Host"}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <TextField
                            label="Host"
                            style={{ margin: 8 }}
                            margin="normal"
                            value={host.name}
                            onChange={(e) => this.updateHost(host.id, "name", e.target.value)}
                          />
                          <TextField
                            label="url"
                            style={{ margin: 8 }}
                            margin="normal"
                            value={host.url}
                            onChange={(e) => this.updateHost(host.id, "url", e.target.value)}
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="checkedB"
                                color="primary"
                                checked={host.default}
                                onChange={(e) => this.updateHost(host.id, "default", e.target.checked)}
                              />
                            }
                            label="default"
                          />
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={this.handleDeleteHost}
                            host-id={host.id}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    );
                  })
                }
              </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default MainInfo;
