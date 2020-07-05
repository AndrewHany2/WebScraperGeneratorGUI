import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import openScraper from '../../global'
import Button from "@material-ui/core/Button";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/styles';

const styles = (theme) => ({
  formControl: {
    margin: 1,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: 3,
  },

});

class Definition extends Component {
  state = {
    addProperty: false,
    MenuProps: {
      PaperProps: {
        style: {
          maxHeight: 48 * 4.5 + 8,
          width: 250,
        },
      },
    },
    definitions: []
  }

  handleSelectChange = (e) => {

  }

  // getStyles(name, personName, theme) {
  //   return {
  //     fontWeight:
  //       personName.indexOf(name) === -1
  //         ? theme.typography.fontWeightRegular
  //         : theme.typography.fontWeightMedium,
  //   };
  // }

  componentDidUpdate() {
    openScraper.definition = this.state.definitions;
  }

  handleDeleteDefinition = (e) => {
    const definitionId = e.target.closest("div[definition-id]").getAttribute("definition-id");

    this.deleteDefinition(definitionId);
  }

  deleteDefinition = (definitionId) => {
    let definitions = this.state.definitions;
    this.state.definitions.find((definition, i) => {
      if (definition.id === definitionId) {
        definitions.splice(i, 1);
        return true;
      }
    });

    this.setState({
      definitions: [...definitions]
    });
  }


  updateDefinition = (id, property, value) => {
    let definitions = this.state.definitions;
    this.state.definitions.find((definition, i) => {
      if (definition.id === id) {
        definitions[i][property] = value;
        return true;
      }
    });
    this.setState({
      definitions: definitions
    });
  }

  handleDeleteProperty = (e) => {
    const definitionId = e.target.closest("div[definition-id]").getAttribute("definition-id");
    const propertyId = e.target.closest("button[property-id]").getAttribute("property-id");

    this.deleteProperty(definitionId, propertyId);
  }

  deleteProperty = (definitionId, propertyId) => {
    let definitions = this.state.definitions;
    this.state.definitions.find((definition, i) => {
      if (definition.id == definitionId) {

        let properties = definition.properties;
        definition.properties.find((property, j) => {
          if (property.id == propertyId) {
            properties.splice(j, 1);
            return true;
          }
        });

        definitions[i].properties = [...properties];
        return true;
      }
    });

    this.setState({
      definitions: [...definitions]
    });
  }

  addProperty = (definitionId, property) => {
    let definitions = this.state.definitions;
    this.state.definitions.find((definition, i) => {
      if (definition.id === definitionId) {
        definitions[i].properties.push(property);
        return true;
      }
    });

    this.setState({
      definitions: [...definitions]
    });
  }

  updateProperty = (definitionId, propertyId, propert, value) => {
    let definitions = this.state.definitions;
    this.state.definitions.find((definition, i) => {
      if (definition.id === definitionId) {

        let properties = definition.properties;
        definition.properties.find((property, j) => {
          if (property.id === propertyId) {
            properties[j][propert] = value;
            return true;
          }
        });

        definitions[i].properties = [...properties];
        return true;
      }
    });

    this.setState({
      definitions: [...definitions]
    });
  }


  handleChange = (panel) => (event, isExpanded) => {
    this.setState({ expanded: isExpanded ? panel : false })
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="main-panel-content"
            id="main-panel-header"
          >
            <Typography>Definitions</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <Button
                onClick={() => {
                  console.log(this.state.definitions)
                  this.setState({
                    definitions: [...this.state.definitions, {
                      id: (this.state.definitions[this.state.definitions.length - 1]?.id ?? -1) + 1,
                      name: "", type: "", required: [], properties: []
                    }]
                  });
                }}>
                Add Definition
              </Button>
              {
                this.state.definitions.map((definition, i) => {
                  return (
                    <ExpansionPanel
                      key={i}
                      definition-id={definition.id}
                      onChange={this.handleChange("definition-" + i)}
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={"definition-" + i + "-content"}
                        id={"definition-" + i + "-header"}
                      >
                        <Typography>{definition.name ? definition.name : "Definition"}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>
                          <TextField
                            label="Name"
                            style={{ margin: 8 }}
                            margin="normal"
                            value={definition.name}
                            onChange={(e) => this.updateDefinition(definition.id, "name", e.target.value)}
                          />
                          <TextField
                            label="Type"
                            style={{ margin: 8 }}
                            margin="normal"
                            value={definition.type}
                            onChange={(e) => this.updateDefinition(definition.id, "type", e.target.value)}
                          />
                          <FormControl className={classes.formControl}>
                            <InputLabel id="demo-mutiple-chip-label">Required</InputLabel>
                            <Select
                              labelId="demo-mutiple-chip-label"
                              id="demo-mutiple-chip"
                              multiple
                              value={definition.required}
                              onChange={(e) => this.updateDefinition(definition.id, "required", e.target.value)}
                              input={<Input id="select-multiple-chip" />}
                              renderValue={(selected) => (
                                <div className={classes.chips}>
                                  {selected.map((value) => (
                                    <Chip key={value} label={value} className={classes.chip} />
                                  ))}
                                </div>
                              )}
                              MenuProps={this.state.MenuProps}
                            >
                              {definition.properties.map((property) => (
                                <MenuItem key={property.id} value={property.name}/* style={this.getStyles(property.name, definition.required, theme)}*/>
                                  {property.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={this.handleDeleteDefinition}
                            definition-id={definition.id}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <div>
                            <Button
                              onClick={() => {
                                this.addProperty(definition.id, {
                                  id: (definition.properties[definition.properties.length - 1]?.id ?? -1) + 1,
                                  name: "", type: "", format: ""
                                })
                              }}>
                              Add Property
                            </Button>
                            {
                              definition.properties.map((property, i) => {
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
                                      <Typography>{property.name ? property.name : "Property"}</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                      <TextField
                                        label="Name"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        value={property.name}
                                        onChange={(e) => this.updateProperty(definition.id, property.id, "name", e.target.value)}
                                      />
                                      <TextField
                                        label="Type"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        value={property.type}
                                        onChange={(e) => this.updateProperty(definition.id, property.id, "type", e.target.value)}
                                      />
                                      <TextField
                                        label="Format"
                                        style={{ margin: 8 }}
                                        margin="normal"
                                        value={property.format}
                                        onChange={(e) => this.updateProperty(definition.id, property.id, "format", e.target.value)}
                                      />
                                      <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={this.handleDeleteProperty}
                                        property-id={property.id}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </ExpansionPanelDetails>
                                  </ExpansionPanel>)
                              })
                            }
                          </div>
                        </Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  )
                })
              }
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div >
    );
  }
}

export default withStyles(styles)(Definition);