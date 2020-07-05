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
    state = {}
    addSelector = (routeId, methodId, responseId, selector) => {
        let routes = this.state.routes;

        this.state.routes.find((route, i) => {

            if (route.id === routeId) {
                this.state.routes[i].methods.find((method, j) => {

                    if (method.id === methodId) {
                        this.state.routes[i].methods[j].responses.find((response, k) => {

                            if (response.id === responseId) {
                                routes[i].methods[j].responses[k].selectors.push(selector);

                            }
                        })

                    }
                })
            }
        });

        this.setState({
            routes: [...routes]
        });
    }

    updateSelector = (routeId, methodId, responseId, selectorId, property, value) => {
        let routes = this.state.routes;

        this.state.routes.find((route, i) => {

            if (route.id === routeId) {
                let methods = route.methods;

                route.methods.find((method, j) => {

                    if (method.id === methodId) {
                        let responses = method.responses;

                        method.responses.find((response, h) => {

                            if (response.id === responseId) {
                                let selectors = response.selectors;

                                response.selectors.find((selector, l) => {

                                    if (selector.id === selectorId) {
                                        selectors[l][property] = value;
                                        return true
                                    }
                                })
                                responses[h].selectors = [...selectors];
                                return true;
                            }
                        })
                        methods[j].responses = [...responses]
                        return true;
                    }

                });
                routes[i].methods = [...methods]
                return true
            }
        });

        this.setState({
            routes: [...routes]
        });
    }

    handleDeleteSelector = (e) => {
        const routeId = e.target.closest("div[route-id]").getAttribute("route-id");
        const methodId = e.target.closest("button[method-id]").getAttribute("method-id");
        const responseId = e.target.closest("button[response-id]").getAttribute("response-id");
        const selectorId = e.target.closest("button[selector-id]").getAttribute("selector-id");


        this.deleteSelector(routeId, methodId, responseId, selectorId);
    }

    deleteSelector = (routeId, methodId, responseId, selectorId) => {
        let routes = this.state.routes;

        this.state.routes.find((route, i) => {

            if (route.id == routeId) {
                let methods = route.methods;

                route.methods.find((method, j) => {

                    if (method.id == methodId) {
                        let responses = method.responses;

                        method.responses.find((response, h) => {

                            if (response.id === responseId) {
                                let selectors = response.selectors;

                                response.selectors.find((selector, l) => {

                                    if (selector.id === selectorId) {
                                        selectors.splice(l, 1);
                                        return true;
                                    }
                                })
                                responses[h].selectors = [...selectors];
                                return true;
                            }
                        })
                        methods[j].responses = [...responses];
                        return true;
                    }
                });
                routes[i].methods = [...methods];
                return true;
            }
        });

        this.setState({
            routes: [...routes]
        });
    }

    render() {
        return (<ExpansionPanel
            key={this.props.k}
            // expanded={this.state.expanded === ("selector-" + g)}
            onChange={this.handleChange("selector-" + this.props.k)}>
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
                        onChange={(e) => this.updateSelector(this.props.route.id, this.props.method.id, this.props.response.id, this.props.selector.id, "name", e.target.value)}
                    />
                    <FormControl style={{ margin: 5, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Selector Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="selector type"
                            value={this.props.selector.selectorType}
                            onChange={(e) => { this.updateSelector(this.props.route.id, this.props.method.id, this.props.response.id, this.props.selector.id, "selectorType", e.target.value) }}
                        >
                            <MenuItem value={"parameter"}>Parameter</MenuItem>
                            <MenuItem value={"querySelector"}>Query Selector</MenuItem>
                            <MenuItem value={"regex"}>Regex</MenuItem>
                            <MenuItem value={"object"}>Object</MenuItem>
                        </Select>
                    </FormControl>
                    {
                        selector.selectorType === "parameter" ?
                            <React.Fragment>
                                <TextField
                                    label="selector"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    value={selector.selector}
                                    onChange={(e) => this.updateSelector(this.props.route.id, this.props.method.id, this.props.response.id, this.props.selector.id, "selector", e.target.value)}
                                />
                            </React.Fragment> : null
                    }
                    {
                        selector.selectorType === "querySelector" ?
                            <React.Fragment>
                                <TextField
                                    label="selector"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    value={selector.selector}
                                    onChange={(e) => this.updateSelector(this.props.route.id, this.props.method.id, this.props.response.id, this.props.selector.id, "selector", e.target.value)}
                                />
                                <TextField
                                    label="type"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    value={selector.type}
                                    onChange={(e) => this.updateSelector(this.props.route.id, this.props.method.id, this.props.response.id, this.props.selector.id, "type", e.target.value)}
                                />
                            </React.Fragment> : null

                    }
                    {
                        selector.selectorType === "regex" ?
                            <React.Fragment>
                                <TextField
                                    label="selector"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    value={selector.selector}
                                    onChange={(e) => this.updateSelector(route.id, method.id, response.id, selector.id, "selector", e.target.value)}
                                />
                                <TextField
                                    label="type"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    value={selector.type}
                                    onChange={(e) => this.updateSelector(route.id, method.id, response.id, selector.id, "type", e.target.value)}
                                />
                                <TextField
                                    label="regex Group"
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    value={selector.regexGroup}
                                    onChange={(e) => this.updateSelector(route.id, method.id, response.id, selector.id, "regexGroup", e.target.value)}
                                />
                            </React.Fragment> : null
                    }
                    {
                        selector.selectorType === "object" ?
                            <Selector k={this.props.k} selector={this.props.selector} response={this.props.response} method={this.props.method} route={route}></Selector> : null
                    }
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={this.handleDeleteSelector}
                        selector-id={selector.id}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>);
    }
}

export default Selector;