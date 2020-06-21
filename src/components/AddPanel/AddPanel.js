import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class AddPanel extends Component {
  state = {
    value: 0,
    components: [],
  };

  onAddComponent = () => {
    const components = this.state.components;

    var lastId =
      this.state.components[this.state.components.length - 1]?.id ?? 1;
    console.log(lastId);

    var test = React.cloneElement(this.props.comp, {
      ondelete: () => {
        this.ddd(lastId + 1);
      },
    });

    this.setState({
      value: this.state.value + 1,
      components: [...this.state.components, { id: lastId + 1, ...test }],
    });
  };

  ddd = (id) => {
    var comps = [...this.state.components];

    console.log(id);

    console.log("pre comps");
    console.log(comps);

    comps = comps.filter(function (obj) {
      return obj.id === id;
    });

    console.log("post comps");
    console.log(comps);

    this.setState({
      value: this.state.value - 1,
      components: [...comps],
    });

    console.log("components");
    console.log(this.state.components);
  };

  render() {
    return (
      <div>
        <Button onClick={this.onAddComponent}>{this.props.children}</Button>
        {this.state.components}
      </div>
    );
  }
}

export default AddPanel;
