import React, { Component } from 'react';
import MyExpantionPanel from "../MyExpantionPanel/MyExpantionPanel";
import {
    TextField,
    Radio,
    Checkbox,
    RadioGroup,
    FormLabel,
    FormControl,
    FormControlLabel,
    IconButton,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";
import { set } from "lodash/fp";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import openScraper from '../../global'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

class Selector extends Component {



    componentDidMount() {
        this.props.updateSelector(this.props.route.id, this.props.method.id, this.props.response.id, this.props.selector.id, "selectors", [])
    }

    render() {

        return (<ExpansionPanel
            key={this.props.k}
        // expanded={this.state.expanded === ("selector-" + g)}
        >
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={"selector-" + this.props.k + "-content"}
                id={"selector-" + this.props.k + "-header"}
            >
                <Typography>{this.props.selector.name ? this.props.selector.name : "Selector"}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    <TextField
                        label="Name"
                        style={{ margin: 8 }}
                        margin="normal"
                        value={this.props.selector.name}
                        onChange={(e) => this.props.updateSelector(this.props.route.id, this.props.method.id, this.props.response.id, this.props.selector.id, "name", e.target.value)}
                    />
                    <FormControl style={{ margin: 5, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="type"
                            value={this.props.selector.type}
                            onChange={(e) => { this.props.updateSelector(this.props.route.id, this.props.method.id, this.props.response.id, this.props.selector.id, "type", e.target.value) }}
                        >
                            <MenuItem value={""}>None</MenuItem>
                            <MenuItem value={"text"}>Text</MenuItem>
                            <MenuItem value={"image"}>Image</MenuItem>
                            <MenuItem value={"attribute"}>Attribute</MenuItem>
                            <MenuItem value={"link"}>Link</MenuItem>
                            <MenuItem value={"object"}>Object</MenuItem>
                        </Select>
                    </FormControl>
                    {
                        this.props.selector.type != "" && this.props.selector.type !== "object" ?
                            <React.Fragment>
                                <TextField
                                    label="selector"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    value={this.props.selector.selector}
                                    onChange={(e) => this.props.updateSelector(this.props.route.id, this.props.method.id, this.props.response.id, this.props.selector.id, "selector", e.target.value)}
                                />
                                <FormControl style={{ margin: 5, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-label">Selector Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="selector type"
                                        value={this.props.selector.selectorType}
                                        onChange={(e) => { this.props.updateSelector(this.props.route.id, this.props.method.id, this.props.response.id, this.props.selector.id, "selectorType", e.target.value) }}
                                    >
                                        <MenuItem value={"parameter"}>Parameter</MenuItem>
                                        <MenuItem value={"querySelector"}>Query Selector</MenuItem>
                                        <MenuItem value={"regex"}>Regex</MenuItem>
                                    </Select>
                                </FormControl>
                            </React.Fragment> : null

                    }
                    {// addSelectorToSelector
                        this.props.selector.type === "object" ?
                            <React.Fragment>
                                <TextField
                                    label="selector"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    value={this.props.selector.selector}
                                    onChange={(e) => this.props.updateSelector(this.props.route.id, this.props.method.id, this.props.response.id, this.props.selector.id, "selector", e.target.value)}
                                />
                                <FormControl style={{ margin: 5, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-label">Selector Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="selector type"
                                        value={this.props.selector.selectorType}
                                        onChange={(e) => { this.props.updateSelector(this.props.route.id, this.props.method.id, this.props.response.id, this.props.selector.id, "selectorType", e.target.value) }}
                                    >
                                        <MenuItem value={"parameter"}>Parameter</MenuItem>
                                        <MenuItem value={"querySelector"}>Query Selector</MenuItem>
                                        <MenuItem value={"regex"}>Regex</MenuItem>
                                    </Select>
                                </FormControl>
                                <div>
                                    <Button
                                        onClick={() => {

                                            this.props.updateSelector(this.props.route.id, this.props.method.id, this.props.response.id, this.props.selector.id, "selectors", [])
                                            
                                            var oldSelectors = [...this.props.selector.selectors];

                                            var newSelector = {
                                                id: (oldSelectors[oldSelectors.length - 1]?.id ?? -1) + 1,
                                                name: "", selectorType: "", type: "", selector: "", regexGroup: ""
                                            };

                                            console.log([...oldSelectors, newSelector]);
                                            
                                            this.props.updateSelector(this.props.route.id, this.props.method.id, this.props.response.id, this.props.selector.id, "selectors", [...oldSelectors, newSelector]);
                                        }}>
                                        Add Selector
                                </Button>
                                    {
                                        this.props.selector.selectors.map((selector, k) => {
                                            return (
                                                <Selector key={k}
                                                    selector={selector} response={this.props.response} method={this.props.method} route={this.props.route} index={this.props.index + 1}
                                                    addSelector={this.props.addSelector} updateSelector={this.props.updateSelector} deleteSelector={this.props.deleteSelector}></Selector>
                                            )
                                        })
                                    }
                                </div>
                            </React.Fragment> : null
                    }
                        {/* <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={this.props.handleDeleteSelector}
                            selector-id={this.props.selector.id}
                        >
                            <DeleteIcon />
                        </IconButton> */}
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>);
    }
    //edit
}

export default Selector;