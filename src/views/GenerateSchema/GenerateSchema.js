import React, { Component, useEffect  } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";


const useStyles = makeStyles((theme) => ({
	root: {
	  backgroundColor: theme.palette.background.paper,
	},
	cardCategoryWhite: {
		color: "rgba(255,255,255,.62)",
		margin: "0",
		fontSize: "14px",
		marginTop: "0",
		marginBottom: "0",
	  },
	  cardTitleWhite: {
		color: "#FFFFFF",
		marginTop: "0px",
		minHeight: "auto",
		fontWeight: "300",
		fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		marginBottom: "3px",
		textDecoration: "none",
	  },
  }));

const schemas = [];
  
const options = [];
  
  export default function GenerateSchema() {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [selectedIndex, setSelectedIndex] = React.useState(1);
  
	const handleClickListItem = (event) => {
	  setAnchorEl(event.currentTarget);
	};
  
	const handleMenuItemClick = (event, index) => {
	  setSelectedIndex(index);
	  setAnchorEl(null);
	};
  
	const handleClose = () => {
	  setAnchorEl(null);
	};
	
	useEffect(() => {
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/todos')
			.then((response) => {
				// options.push(response.data);
				var i;
				for (i = 0; i < response.data.length ; i++) {
					options.push(response.data[i].body.mainInfo.name);
				  }
				// console.log(response.data[0].body.mainInfo.name);
				// console.log(response.data.length);
			})
			.catch((err) => {
				console.log(err);
			});
		console.log(options);

	},[]);
  
	return (
	<GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Generate Schema</h4>
            <p className={classes.cardCategoryWhite}>Choose your schema</p>

          </CardHeader>
          <CardBody>
		  <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <h4>Choose your schema</h4>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
				  <List component="nav" aria-label="Device settings">
		  <ListItem
			button
			aria-haspopup="true"
			aria-controls="lock-menu"
			aria-label="when device is locked"
			onClick={handleClickListItem}
		  >
			<ListItemText primary="When device is locked" secondary={options[selectedIndex]} />
		  </ListItem>
		</List>
		<Menu
		  id="lock-menu"
		  anchorEl={anchorEl}
		  keepMounted
		  open={Boolean(anchorEl)}
		  onClose={handleClose}
		>
		  {options.map((option, index) => (
			<MenuItem
			  key={option}
			  disabled={index === 0}
			  selected={index === selectedIndex}
			  onClick={(event) => handleMenuItemClick(event, index)}
			>
			  {option}
			</MenuItem>
		  ))}
		</Menu>
                  </GridItem>
                </GridContainer>
		
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
	  
	);
  }