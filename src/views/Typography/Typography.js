

  import React, { Component, useState  } from 'react';
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
  
  
  class GenerateSchema extends Component {
    
    options = [
      'Show some love to Material-UI',
      'Show all notification content',
      'Hide sensitive notification content',
      'Hide all notification content',
      ];
  
    componentWillMount = () => {
      const authToken = localStorage.getItem('AuthToken');
      axios.defaults.headers.common = { Authorization: `${authToken}` };
      axios
        .get('/todos')
        .then((response) => {
          this.setState({
            schemas: response.data,
            uiLoading: false
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    handleClickListItem = (event) => {
      setAnchorEl(event.currentTarget);
      };
    
    handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      setAnchorEl(null);
      };
    
    handleClose = () => {
      setAnchorEl(null);
      };
    
  
    handleRadioChange = (event) => {
    };
  
    render() {
      const classes = useStyles();
        const [anchorEl, setAnchorEl] = useState(null);
       const [selectedIndex, setSelectedIndex] = useState(1)
      return (
        <div>
          <List component="nav" aria-label="Device settings">
            <ListItem button aria-haspopup="true" aria-controls="lock-menu" aria-label="when device is locked" onClick={handleClickListItem}>
                <ListItemText primary="When device is locked" secondary={options[selectedIndex]} />
            </ListItem>
  </List>
        </div>
      );
    }
  }
  
  export default GenerateSchema;

  