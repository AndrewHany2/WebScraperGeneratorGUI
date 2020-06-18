import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

class Response extends Component {
  state = {};
  render() {
    return (
      <div>
        <TextField
          label="Response Code"
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
          label="Schema"
          style={{ margin: 8 }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
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

export default Response;
