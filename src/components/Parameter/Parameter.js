import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

class Parameter extends Component {
  state = {};
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
        />
        <TextField
          label="Parameter In"
          style={{ margin: 8 }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Description"
          style={{ margin: 8 }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Type"
          style={{ margin: 8 }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Checkbox label={"Required"}></Checkbox>
        <label>Required</label>

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
