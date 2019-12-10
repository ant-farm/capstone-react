import React from 'react';
import './App.css';
import LoginRegisterForm from './LoginRegisterForm'
import SearchAddBuildingForm from './SearchAddBuildingForm'
import PostContainer from './PostContainer'


class App extends React.Component{
	constructor(){
		super()
		this.state={
			addresses: [],
			loggedIn: false,
			loggedInUser: null,
			modalOpen:false,
			newAddress: {
				address: ''
			}, 
			foundAddress: null
		}
	}

	login = async (loginInfo) => {
		const response = await fetch(process.env.REACT_APP_API_URL + '/users/login', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(loginInfo),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const parsedLoginResponse = await response.json()
		console.log(parsedLoginResponse);
	
		if(response.status === 201){
			this.setState({
				loggedIn: true,
				loggedInUser: parsedLoginResponse.data
			})	
			console.log(parsedLoginResponse)
		} else{
			console.log("parsedLoginResponse in else in login");
			console.log(parsedLoginResponse)
			
		}
	}
	register = async (registerInfo) => {
		const response = await fetch(process.env.REACT_APP_API_URL + '/users/register', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(registerInfo),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const parsedRegisterResponse = await response.json()
		console.log("parsedRegisterResponse")
		console.log(parsedRegisterResponse)
		if(parsedRegisterResponse.status.code === 201){
			this.setState({
				loggedIn: true,
				loggedInUser: parsedRegisterResponse.data,
				modalOpen: true
			})
		} else{
			console.log('Register Failed')
			console.log(parsedRegisterResponse);
		}
	}
	// ADD BUILDING ADDRESS -----------------------------------
	addBuilding = async (e) => {
		e.preventDefault();
		console.log("we're sending this");
		console.log(this.state.newAddress)
		try {
			const createdAddressResponse = await fetch(
				process.env.REACT_APP_API_URL + "/building/",
				{
					method: 'POST',
					credentials: 'include',
					body: JSON.stringify(this.state.newAddress),
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
			console.log(createdAddressResponse)
				const parsedResponse = await createdAddressResponse.json();
				console.log(parsedResponse, 'this is the response')
				this.setState({
					addresses: [
					...this.state.addresses,
					parsedResponse.data
					]
				})
				this.closeModal();

			
		} catch(err){
			console.log(err)
		}
	}
	handleCreateChange = (event) => {
		event.preventDefault();
		console.log(" we are hitting the handleCreateChange function");
		this.setState({
			newAddress: {
				// ...this.state.newAddress,
				[event.target.name]: event.target.value
			}
		})
	}
// SEARCH FOR AN ADDRESS ------------------
	searchForAddress = async () => {
		console.log("this is searchForAddress being called!");
		console.log("this is my state ", this.state.newAddress.address);
		try {
			const foundAddress = await fetch(
				process.env.REACT_APP_API_URL + '/building/search',
				{
					method: 'POST',
					credentials: 'include',
					body: JSON.stringify(this.state.newAddress),
					headers: {
						'Content-Type': 'application/json'
					}
				})

			const parsedResponse = await foundAddress.json()
			console.log("this is my response for searchForAddress function ", parsedResponse);
			this.setState({
				foundAddress: parsedResponse
			})

		} catch(err){
			console.log(err)
		}
	}

	// Add user to building --------------------
	addUser = async () => {

		try {
			const addingUser = await fetch(
				process.env.REACT_APP_API_URL + `/users/${this.state.foundAddress._id}`,
				{
					method: 'PUT',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json'
				}
			})
			const parsedResponse = await addingUser.json()
			console.log(parsedResponse)

		} catch(err){
			console.log(err)
		}
	}

	logout = async (loginInfo) => {
		this.setState({
			loggedIn: false
		})
	}



	closeModal = () => {
		this.setState({
			editModalOpen: false,
			modalOpen: false,
			// showModalOpen: false
		});
	};

	render(){
		return(
	    	<div className="App">
	    		{
	    			this.state.loggedInUser	
	    			?
	    			<SearchAddBuildingForm 
	    				searchForAddress={this.searchForAddress}
	    				open={this.state.modalOpen}
	    				addBuilding={this.addBuilding}
	    				handleCreateChange={this.handleCreateChange}
	    			 	closeModal={this.closeModal} 
	    			 	address={this.state.newAddress.address}
	    			 	addUser={this.addUser}
	    			 	logout={this.logout}
	    			/>
	    			// <PostContainer /> 
	    			:
	    			<LoginRegisterForm 
	    			login={this.login} 
	    			register={this.register} 
	    			open={this.state.modalOpen}
	    			closeModal={this.state.closeModal}
	    			/>
// 
	    		}
	    	</div>
	  	);
	}
}

export default App;
