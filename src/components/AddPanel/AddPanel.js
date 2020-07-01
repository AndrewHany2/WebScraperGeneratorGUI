import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class AddPanel extends Component {
  state = {
    value: 0,
    components: [],
  };

  onAddComponent = () => {
    const components = this.state.components;

    var lastId = this.state.components[this.state.components.length - 1]?.id ?? -1;
    console.log(lastId);

    // var test = React.cloneElement(this.props.comp, {
    //   ondelete: () => {
    //     this.ddd(lastId + 1);
    //   },
    // });

    setTimeout(() => {
      var deleteButtons = document.querySelectorAll("button[testmain]");
      for (var i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].removeEventListener('click', this.handleDeleteTest, false);
        deleteButtons[i].addEventListener("click", this.handleDeleteTest);
      }
    }, 500)


    console.log(this.state.components);
    console.log([...this.state.components, { id: lastId + 1, /*...test*/...this.props.comp }]);

    

    this.setState({
      value: this.state.value + 1,
      components: [...this.state.components, { id: lastId + 1, /*...test*/...this.props.comp }],
    });
  };

  handleDeleteTest = (event) => {
    console.log("zzzz");
    this.ddd(event);
  }

  ddd = (event) => {
    var comps = [...this.state.components];

    // console.log("pre comps");
    // console.log(comps);

    // console.log(event.target.closest("button[testmain]"));
    var id = event.target.closest("button[testmain]").getAttribute("index");
    // console.log(id);

    comps = comps.filter(function (obj) {
      return obj.id != id;
    });

    // console.log("post comps");
    // console.log(comps);

    this.setState({
      value: this.state.value - 1,
      components: [...comps],
    }, () => {
      // var deleteButtons = document.querySelectorAll("button[testmain]");
      // for (var i = 0; i < deleteButtons.length; i++) {
      //   deleteButtons[i].setAttribute("index", i)
      //   console.log("index--")
      // }
    });

    // console.log("components");
    // console.log(this.state.components);
  };

  render() {
    return (
      <div>
        <Button onClick={() => { this.onAddComponent();  }}>{this.props.children}</Button>
        {this.state.components}
      </div>
    );
  }
}

export default AddPanel;
