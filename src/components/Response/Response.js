import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { set } from "lodash/fp";
import DoneIcon from "@material-ui/icons/Done";

class Response extends Component {
  state = {
    values: {
      response: {
        responseCode: "",
        description: "",
        schema: "",
      },
    },
  };
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
          onChange={(e) => {
            const newState = set(
              ["values", "response", "responseCode"],
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
              ["values", "response", "description"],
              e.target.value
            );
            this.setState(newState);
          }}
        />
        <TextField
          label="Schema"
          style={{ margin: 8 }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            const newState = set(
              ["values", "response", "schema"],
              e.target.value
            );
            this.setState(newState);
          }}
        />
        <IconButton
          onClick={() => {
            this.props.dataSent(this.state.values);
          }}
        >
          <DoneIcon fontSize="small" color="blue"></DoneIcon>
        </IconButton>
        {this.state.added}
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
