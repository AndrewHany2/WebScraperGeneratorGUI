// import React, { Component, useEffect  } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import axios from "axios";
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormLabel from '@material-ui/core/FormLabel';
// import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';


// const useStyles = makeStyles((theme) => ({
// 	root: {
// 	  backgroundColor: theme.palette.background.paper,
// 	},
//   }));

//   const schemas = [];
  
//   const options = [];
  
//   export default function GenerateSchema() {
// 	const classes = useStyles();
// 	const [anchorEl, setAnchorEl] = React.useState(null);
// 	const [selectedIndex, setSelectedIndex] = React.useState(1);
  
// 	const handleClickListItem = (event) => {
// 	  setAnchorEl(event.currentTarget);
// 	};
  
// 	const handleMenuItemClick = (event, index) => {
// 	  setSelectedIndex(index);
// 	  setAnchorEl(null);
// 	};
  
// 	const handleClose = () => {
// 	  setAnchorEl(null);
// 	};
	
// 	useEffect(() => {
// 		const authToken = localStorage.getItem('AuthToken');
// 		axios.defaults.headers.common = { Authorization: `${authToken}` };
// 		axios
// 			.get('/todos')
// 			.then((response) => {
// 				// options.push(response.data);
// 				var i;
// 				for (i = 0; i < response.data.length ; i++) {
// 					options.push(response.data[i].body.mainInfo.name);
// 				  }
// 				// console.log(response.data[0].body.mainInfo.name);
// 				// console.log(response.data.length);
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 			});
// 		console.log(options);

// 	},[]);
  
// 	return (
// 	  <div className={classes.root}>
// 		<List component="nav" aria-label="Device settings">
// 		  <ListItem
// 			button
// 			aria-haspopup="true"
// 			aria-controls="lock-menu"
// 			aria-label="when device is locked"
// 			onClick={handleClickListItem}
// 		  >
// 			<ListItemText primary="When device is locked" secondary={options[selectedIndex]} />
// 		  </ListItem>
// 		</List>
// 		<Menu
// 		  id="lock-menu"
// 		  anchorEl={anchorEl}
// 		  keepMounted
// 		  open={Boolean(anchorEl)}
// 		  onClose={handleClose}
// 		>
// 		  {options.map((option, index) => (
// 			<MenuItem
// 			  key={option}
// 			  disabled={index === 0}
// 			  selected={index === selectedIndex}
// 			  onClick={(event) => handleMenuItemClick(event, index)}
// 			>
// 			  {option}
// 			</MenuItem>
// 		  ))}
// 		</Menu>
// 	  </div>
// 	);
//   }
//   <div className={classes.root}>
// 		<List component="nav" aria-label="Device settings">
// 		  <ListItem
// 			button
// 			aria-haspopup="true"
// 			aria-controls="lock-menu"
// 			aria-label="when device is locked"
// 			onClick={handleClickListItem}
// 		  >
// 			<ListItemText primary="When device is locked" secondary={options[selectedIndex]} />
// 		  </ListItem>
// 		</List>
// 		<Menu
// 		  id="lock-menu"
// 		  anchorEl={anchorEl}
// 		  keepMounted
// 		  open={Boolean(anchorEl)}
// 		  onClose={handleClose}
// 		>
// 		  {options.map((option, index) => (
// 			<MenuItem
// 			  key={option}
// 			  disabled={index === 0}
// 			  selected={index === selectedIndex}
// 			  onClick={(event) => handleMenuItemClick(event, index)}
// 			>
// 			  {option}
// 			</MenuItem>
// 		  ))}
// 		</Menu>
// 	  </div>