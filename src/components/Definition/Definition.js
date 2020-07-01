import React, { Component } from 'react';
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


class Definition extends Component {
    state = { 
      addProperty:false,
      definition:
        {
            name:"",
            type:"",
            required:"",
            properties:[]
        } 
    }
      componentDidUpdate() {
        openScraper.definition = this.state.definition;
      }
    
      handleDeleteProperty = (e) => {
        const id = e.target.closest("button[property-id]").getAttribute("Property-id");
    
        this.state.definition.properties.find(property => property.id == property.id);
    
        var properties = [...this.state.definition.properties];
        properties.splice(id, 1);
    
        this.setState({
          definition: {
            name: this.state.definition.name,
            type: this.state.definition.type,
            required: this.state.definition.required,
            properties: [...properties],
          }
        }); 
      }
     
      updateProperty = (id, propert, value) => {
        let properties = this.state.definition.properties;
        this.state.definition.properties.find((property, i) => {
          if (property.id === id) {
            properties[i][propert] = value;
            return true;
          }
        });
        this.setState({
          definition: {
            name: this.state.definition.name,
            type: this.state.definition.type,
            required: this.state.definition.required,
            properties: properties
          }
        });
      }
      handleDeleteProperty = (e) => {
        const id = e.target.closest("button[property-id]").getAttribute("Property-id");
    
        this.state.definition.properties.find(property => property.id == property.id);
    
        var properties = [...this.state.definition.properties];
        properties.splice(id, 1);
    
        this.setState({
          definition: {
            name: this.state.definition.name,
            type: this.state.definition.type,
            required: this.state.definition.required,
            properties: [...properties],
          }
        }); 
      }
     
      updateProperty = (id, propert, value) => {
        let properties = this.state.definition.properties;
        this.state.definition.properties.find((property, i) => {
          if (property.id === id) {
            properties[i][propert] = value;
            return true;
          }
        });
        this.setState({
          definition: {
            name: this.state.definition.name,
            type: this.state.definition.type,
            required: this.state.definition.required,
            properties: properties
          }
        });
      }


      handleChange = (panel) => (event, isExpanded) => {
        this.setState({ expanded: isExpanded ? panel : false })
      };

    render() { 
      let propertyComp;
      if(this.state.addProperty)
      {
        propertyComp=
        this.state.definition.properties.map((property,i)=>
        {
          return(          
          <ExpansionPanel
            key={i}
            expanded={this.state.expanded === ("panel-" + i)}
            onChange={this.handleChange("panel-" + i)}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={"panel-" + i + "-content"}
              id={"panel-" + i + "-header"}
            >
              <Typography>{property.name ? property.name:"Property"}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TextField
                label="name"
                style={{ margin: 8 }}
                margin="normal"
                value={property.name}
                onChange={(e) => this.updateProperty(property.id, "name", e.target.value)}
              />
              <TextField
              label="type"
              style={{ margin: 8 }}
              margin="normal"
              value={property.type}
              onChange={(e) => this.updateProperty(property.id, "type", e.target.value)}
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
        return (   
          <div>             
          <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="main-panel-content"
            id="main-panel-header"
          >
            <Typography>Definition</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
            <TextField
              label="Name"
              style={{ margin: 8 }}
              margin="normal"
              onChange={(e) => 
                this.setState({
                  definition: {
                    name: e.target.value,
                    type:this.state.definition.type,
                    required:this.state.definition.required,
                    properties:[...this.state.definition.properties]
                  }
                })}
            />
            <TextField
              label="Type"
              style={{ margin: 8 }}
              margin="normal"
              onChange={(e) => 
                this.setState({
                  definition: {
                    name:this.state.definition.name,
                    type:e.target.value,
                    required:this.state.definition.required,
                    properties:[...this.state.definition.properties]
                  }
                })}
            />
            <TextField
              label="Required"
              style={{ margin: 8 }}
              margin="normal"
              onChange={(e) => 
                this.setState({
                  definition: {
                    name:this.state.definition.name,
                    type:this.state.definition.type,
                    required:e.target.value,
                    properties:[...this.state.definition.properties]
                  }
                })}
            />
            <div>
              <Button
                onClick={() => {
                  this.setState({
                    addProperty:true,
                    definition:
                    {
                      name: this.state.definition.name,
                      type: this.state.definition.type,
                      required: this.state.definition.required,
                      properties: [...this.state.definition.properties, {
                        id: (this.state.definition.properties[this.state.definition.properties.length - 1]?.id ?? -1) + 1,
                        name: "",type:""
                      }]
                    }
                  });
                  console.log(openScraper);
                }}>
              Add Property
              </Button>
              {
                propertyComp
              }
            </div> 
          </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        </div>
        );
    }
}
 
export default Definition;