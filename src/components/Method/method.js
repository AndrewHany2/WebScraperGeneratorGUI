import React, { Component } from "react";
import {
  ExpansionPanel,
  Typography,
  TextField,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Radio,
} from "@material-ui/core";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import MyExpantionPanel from "./MyExpantionPanel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import { set } from "lodash/fp";
import { merge } from "lodash/fp";

class Method extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: "",
      values: {
        method: {
          name: "Method",
          summary: "",
          operationId: "",
          description: "",
          outputFile: "",
        },
      },
    };
  }

  handleChange = (event) => {
    this.setState({
      values: { ...this.state.values.method, outputFile: event.target.value },
    });
  };

  render() {
    return (
      <div>
        <TextField
          label={this.state.values.method.name}
          style={{ margin: 8 }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            const newState = set(["values", "method", "name"], e.target.value);
            this.setState(newState);
          }}
        />
        <TextField
          label="Summary"
          style={{ margin: 8 }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            const newState = set(
              ["values", "method", "summary"],
              e.target.value
            );
            this.setState(newState);
          }}
        />
        <TextField
          label="Description"
          style={{ margin: 8 }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            const newState = set(
              ["values", "method", "description"],
              e.target.value
            );
            this.setState(newState);
          }}
        />
        <TextField
          label="Operation Id"
          style={{ margin: 8 }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            const newState = set(
              ["values", "method", "operationId"],
              e.target.value
            );
            this.setState(newState);
          }}
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Output File</FormLabel>
          <RadioGroup
            aria-label="outputFile"
            name="outputFile"
            value={this.state.values.outputFile}
            onChange={(e) => {
              const newState = set(
                ["values", "method", "outputFile"],
                e.target.value
              );
              this.setState(newState);
            }}
          >
            <FormControlLabel value="Json" control={<Radio />} label="Json" />
            <FormControlLabel value="XML" control={<Radio />} label="XML" />
          </RadioGroup>
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
            }}
          >
            <DoneIcon fontSize="small" color="blue"></DoneIcon>
          </IconButton>
        </FormControl>
      </div>
    );
  }
}

export default Method;
