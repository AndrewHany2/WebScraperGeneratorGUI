import React, { Component } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

// core components
// import GridContainer from "components/Grid/GridContainer.js";
// import MyExpantionPanel from "../../components/MyExpantionPanel/MyExpantionPanel";
// import Program from "../../components/Program/Program";
import Rt from "../../components/Root/root";


// const styles = {
//   cardCategoryWhite: {
//     "&,& a,& a:hover,& a:focus": {
//       color: "rgba(255,255,255,.62)",
//       margin: "0",
//       fontSize: "14px",
//       marginTop: "0",
//       marginBottom: "0"
//     },
//     "& a,& a:hover,& a:focus": {
//       color: "#FFFFFF"
//     }
//   },
//   cardTitleWhite: {
//     color: "#FFFFFF",
//     marginTop: "0px",
//     minHeight: "auto",
//     fontWeight: "300",
//     fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//     marginBottom: "3px",
//     textDecoration: "none",
//     "& small": {
//       color: "#777",
//       fontSize: "65%",
//       fontWeight: "400",
//       lineHeight: "1"
//     }
//   }
// };

class Schema extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: "false",
    };
  }
  styles = {
    darkTheme: createMuiTheme({
      palette: {
        type: "light",
      },
    }),
  };

  handleChange = (panel) => (event, isExpanded) => {
    // setExpanded(isExpanded ? panel : false); // //previous state manager , now not needed //
    isExpanded
      ? this.setState({ expanded: panel })
      : this.setState({ expanded: false }); //new state manager//
  };

  classes = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));

  render() {
    return (
      <ThemeProvider theme={this.styles.darkTheme}>
        <form className={this.classes.root} noValidate autoComplete="off">
          <div className={this.classes.root}>
            <Rt></Rt>
          </div>
        </form>
      </ThemeProvider>
    );
  }
}

export default Schema;