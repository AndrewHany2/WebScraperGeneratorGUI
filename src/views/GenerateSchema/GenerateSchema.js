import React, { Component, useEffect ,useLayoutEffect } from 'react';
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
import CardFooter from "components/Card/CardFooter.js";



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

const languages = ['C#','Visual Basics'];
  
var options = [];
  
  export default function GenerateSchema() {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [anchorE2, setAnchorE2] = React.useState(null);
	const [selectedIndex, setSelectedIndex] = React.useState(1);
	const [selectedIndex2, setSelectedIndex2] = React.useState(1);

  
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

	const handleClickListItem1 = (event) => {
		setAnchorE2(event.currentTarget);
	  };
	
	const handleMenuItemClick1 = (event, index) => {
		setSelectedIndex2(index);
		setAnchorE2(null);
	  };
	
	const handleClose1 = () => {
		setAnchorE2(null);
	  };

	const   handleSubmit = () => {
		
	  };
	
	useLayoutEffect(() => {
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/todos')
			.then((response) => {
				// options.push(response.data);
				var i;
				options = [];
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
	                            <ListItem button aria-haspopup="true" aria-controls="lock-menu" aria-label="schema" onClick={handleClickListItem}>
	                                <ListItemText primary="Schema" secondary={options[selectedIndex]} />
	                            </ListItem>
	                        </List>
	                        <Menu id="lock-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
	                            {options.map((option, index) => (
	                            <MenuItem key={option} selected={index===selectedIndex} onClick={(event)=> handleMenuItemClick(event, index)}
	                            >
	                            {option}
	                            </MenuItem>
	                            ))}
	                        </Menu>
	                    </GridItem>
	                </GridContainer>
	                <GridContainer>
	                    <GridItem xs={12} sm={12} md={4}>
	                        <h4>Choose your language </h4>
	                    </GridItem>
	                    <GridItem xs={12} sm={12} md={4}>
	                        <List component="nav" aria-label="Device settings">
	                            <ListItem button aria-haspopup="true" aria-controls="lock-menu" aria-label="language" onClick={handleClickListItem1}>
	                                <ListItemText primary="language" secondary={languages[selectedIndex2]} />
	                            </ListItem>
	                        </List>
	                        <Menu id="lock-menu" anchorEl={anchorE2} keepMounted open={Boolean(anchorE2)} onClose={handleClose1}>
	                            {languages.map((option, index) => (
	                            <MenuItem key={option} selected={index===selectedIndex2} onClick={(event)=> handleMenuItemClick1(event, index)}
	                            >
	                            {option}
	                            </MenuItem>
	                            ))}
	                        </Menu>
	                    </GridItem>
	                </GridContainer>
	            </CardBody>
	            <CardFooter>
	                <Button color="primary" variant="contained" type="submit" className={classes.submitButton} onClick={handleSubmit}>
	                    Genrate schema
	                </Button>
	            </CardFooter>
	        </Card>
	    </GridItem>
	</GridContainer>
	  
	);
  }