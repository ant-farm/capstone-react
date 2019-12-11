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
			foundAddress: null,
			usersBuildingId: null
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
		console.log("\n\nThis is info from parsedLoginResponse")
		console.log(parsedLoginResponse);
		console.log(parsedLoginResponse.data[0].building);
	
		if (response.status === 201) {
			this.setState({
				loggedIn: true,
				loggedInUser: parsedLoginResponse.data,
				usersBuildingId: parsedLoginResponse.data[0].building
			})	
			console.log('this is the state after login ', this.state)
		// 	console.log(parsedLoginResponse)
		// } else{
		// 	console.log("parsedLoginResponse in else in login");
		// 	console.log(parsedLoginResponse)
			
		}

		// find this user's building and save its id in this.state.usersBuildingId
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
		console.log("parsedRegisterResponse -- register")
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
				usersBuildingId: parsedResponse.user.building._id
			})
			this.closeModal();
			console.log(this.state.usersBuildingId)
			
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

			this.addUser()

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
				}
			)
			const parsedResponse = await addingUser.json()
			console.log(parsedResponse)
			this.setState({
				usersBuildingId: parsedResponse._id
			})

			this.closeModal();
			console.log(this.state.usersBuildingId)
		} catch(err){
			console.log(err)
		}
	}

	logout = async (loginInfo) => {
		this.setState({
			addresses: [],
			loggedIn: false,
			loggedInUser: null,
			modalOpen:false,
			newAddress: {
				address: ''
			}, 
			foundAddress: null,
			usersBuildingId: null
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
	    			this.state.loggedIn	
	    			?
	    			<SearchAddBuildingForm 
	    				searchForAddress={this.searchForAddress}
	    				open={this.state.modalOpen}
	    				addBuilding={this.addBuilding}
	    				handleCreateChange={this.handleCreateChange}
	    			 	closeModal={this.closeModal} 
	    			 	address={this.state.newAddress.address}
	    			 	logout={this.logout}
	    			 	loggedInUser={this.state.loggedInUser}
	    			 	usersBuildingId={this.state.usersBuildingId}
	    			/>
	    			:
	    			<LoginRegisterForm 
	    				login={this.login} 
	    				register={this.register} 
	    				open={this.state.modalOpen}
	    				closeModal={this.state.closeModal}
	    				usersBuildingId={this.state.usersBuildingId}

	    			/>
// 
	    		}
	    	</div>
	  	);
	}
}

export default App;
