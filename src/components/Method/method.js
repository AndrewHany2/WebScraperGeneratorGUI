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

class Method extends Component {
  state = {
    value: "Method",
    selectedValue: "",
  };

  handleChange = (event) => {
    this.setState({ selectedValue: event.target.value });
  };

  render() {
    return (
      <div>
        <TextField
          label={this.state.value}
          style={{ margin: 8 }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            this.setState({ value: e.target.value });
          }}
        />
        <TextField
          label="Summary"
          style={{ margin: 8 }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="discription"
          style={{ margin: 8 }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="operationId"
          style={{ margin: 8 }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Output File</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={this.value}
            onChange={this.handleChange}
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
        </FormControl>
      </div>
    );
  }
}

export default Method;
