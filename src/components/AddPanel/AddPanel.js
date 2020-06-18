// import React, { Component } from "react";
// import Button from "@material-ui/core/Button";
// import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

// class AddPanel extends Component {
//   state = {
//     value: 0,
//   };

//   onAddComponent = () => {
//     this.setState({
//       value: this.state.value + 1,
//     });
//   };

//   render() {
//     const Components = [];
//     for (var i = 0; i < this.state.value; i += 1) {
//       Components.push(this.props.comp);
//     }
//     return (
//       <div>
//         <Button onClick={this.onAddComponent}>ADD {this.props.children}</Button>
//         {Components}
//       </div>
//     );
//   }
// }

// export default AddPanel;

// import React, { Component } from "react";
// import Button from "@material-ui/core/Button";

// class AddPanel extends Component {
//   state = {
//     value: 0,
//     components: [],
//   };

//   onAddComponent = () => {
//     const components = this.state.components;

//     var test = React.cloneElement(this.props.comp, {
//       ondelete: (test) => {
//         console.log(test);
//         this.ddd(components[0]);
//       },
//     });

//     this.setState({
//       value: this.state.value + 1,
//       components: [
//         ...this.state.components,
//         { id: this.state.components.length + 1, ...test },
//       ],
//     });
//   };

//   ddd = (comp) => {
//     var comps = [...this.state.components];

//     console.log(comp.id);

//     comps = comps.filter(function (obj) {
//       return obj.id === comp.id;
//     });
//     console.log(comp);
//     console.log(comps);

//     this.setState({
//       components: [...comps],
//     });

//     console.log(this.state.components);
//   };

//   render() {
//     return (
//       <div>
//         <Button onClick={this.onAddComponent}>ADD {this.props.children}</Button>
//         {this.state.components}
//       </div>
//     );
//   }
// }

// export default AddPanel;

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
        <Button onClick={this.onAddComponent}>ADD {this.props.children}</Button>
        {this.state.components}
      </div>
    );
  }
}

export default AddPanel;
