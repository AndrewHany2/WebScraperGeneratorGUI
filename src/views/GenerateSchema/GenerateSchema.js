import React, { Component } from 'react';
import axios from "axios";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';


class GenerateSchema extends Component {
	state = {
		schemas: [],
	}

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

	handleRadioChange = (event) => {
	};

	render() {
		return (
			<form /*onSubmit={handleSubmit}*/>
				<FormControl component="fieldset" >
					<FormLabel component="legend">Choose your schema</FormLabel>
					<RadioGroup aria-label="quiz" name="quiz" /*onChange={handleRadioChange}*/>
						{
							this.state.schemas.map((schema =>
								<FormControlLabel value="best" control={<Radio />} label={schema.mainInfo.name} />))
						}
					</RadioGroup>
					<Button type="submit" variant="outlined" color="primary">
						Generate Schema
			  </Button>
				</FormControl>
			</form>
		);
	}
}

export default GenerateSchema;