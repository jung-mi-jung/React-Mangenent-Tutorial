import React, { Component } from 'react';
//import logo from './logo.svg';
import Customer from './components/Customer'
import './App.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { withStyles } from '@mui/styles';

const styles = theme => ({
	root: {
		width: '100%',
		//marginTop: theme.spacing(3),
		//marginTop: theme.spacing.unit * 3,  //구버전
		overflewX: "auto"
	},
	table: {
		minWidth: 1080
	}
})

class App extends Component {

	state = {
		customers: ""
	}

	componentDidMount() {
		this.callApi()
			.then(res => this.setState({customers: res}))
			.catch(err => console.log(err));
	}

	callApi = async () => {
		const response = await fetch('/api/customers');	//테스트용으로 로컬에서 불러옴
		const body = await response.json();
		return body;
	}

	render () {
		const { classes } = this.props;
		return (
			<Paper className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>번호</TableCell>
							<TableCell>이미지</TableCell>
							<TableCell>이름</TableCell>
							<TableCell>생년월일</TableCell>
							<TableCell>성별</TableCell>
							<TableCell>직업</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.state.customers ? this.state.customers.map(c => { return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} /> ); 
						}) : ""}
					</TableBody>
				</Table>
			</Paper>
		);
	}	
}

export default withStyles(styles)(App);
