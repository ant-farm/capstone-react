import React from 'react';
import './App.css';
import LoginRegisterForm from './LoginRegisterForm'
// import SearchAddBuildingForm from './SearchAddBuildingForm'
import SearchAddBuildingForm from './SearchAddBuildingForm'

class App extends React.Component{
	constructor(){
		super()
		this.state={
			addresses: [],
			loggedIn: false,
			loggedInUser: null,
			showModalOpen: false,
			createModalOpen:false,
			newAddress: {
				address: ''
			}
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
		if(parsedRegisterResponse.status.code === 201){
			this.setState({
				loggedIn: true,
				loggedInUser: parsedRegisterResponse.data
			})
		} else{
			console.log('Register Failed')
			console.log(parsedRegisterResponse);
		}
	}

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

	logout = async (loginInfo) => {
		this.setState({
			loggedIn: false
		})
	}

	showModalOpen = () => {
		this.setState({
			showModalOpen: true
		})
	}

	closeModal = () => {
		this.setState({
			editModalOpen: false,
			createModalOpen: false,
			showModalOpen: false
		});
	};

	render(){
		return(
	    	<div className="App">
	    		{
	    			this.state.loggedInUser
	    			?
	    			<SearchAddBuildingForm 

	    				open={this.state.createModalOpen}
	    				addBuilding={this.addBuilding}
	    				handleCreateChange={this.handleCreateChange}
	    			 	closeModal={this.closeModal} 
	    			 	address={this.state.newAddress.address}
	    			/>
	    			:
	    			<LoginRegisterForm login={this.login} register={this.register} />
	    		}
	    	</div>
	  	);
	}
}

export default App;
