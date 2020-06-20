import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import { set } from "lodash/fp";

class Parameter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: "",
      values: {
        parameter: {
          name: "Parameter",
          in: "",
          description: "",
          type: "",
          required: "",
        },
      },
    };
  }
  render() {
    return (
      <div>
        <TextField
          label="Parameter Name"
          style={{ margin: 8 }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            const newState = set(
              ["values", "parameter", "name"],
              e.target.value
            );
            this.setState(newState);
          }}
        />
        <TextField
          label="Parameter In"
          style={{ margin: 8 }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            const newState = set(["values", "parameter", "in"], e.target.value);
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
              ["values", "parameter", "description"],
              e.target.value
            );
            this.setState(newState);
          }}
        />
        <TextField
          label="Type"
          style={{ margin: 8 }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            const newState = set(
              ["values", "parameter", "type"],
              e.target.value
            );
            this.setState(newState);
          }}
        />
        <Checkbox
          label={"Required"}
          onChange={(e) => {
            const newState = set(
              ["values", "parameter", "required"],
              e.target.value
            );
            this.setState(newState);
          }}
        ></Checkbox>
        <label>Required</label>
        <IconButton
          onClick={() => {
            this.props.dataSent(this.state.values);
          }}
        >
          <DoneIcon fontSize="small" color="blue"></DoneIcon>
        </IconButton>

        <IconButton
          edge="end"
          aria-label="delete"
          onClick={this.props.ondelete}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    );
  }
}

export default Parameter;
