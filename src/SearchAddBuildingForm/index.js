// import React from 'react'
import React from "react";
import "../App.css";
import {
	Form,
	Button,
	Label,
	Header,
	Modal,
	Segment,
	Image
} from "semantic-ui-react";

class SearchAddBuildingForm extends React.Component {
	constructor() {
		super();

		this.state = {
			propertyAddress: "",
			action: "search"
		};
	}

	searchAdd = () => {
		if (this.state.action === "search") {
			this.props.search({
				address: this.state.address
			});
		} else {
			this.props.add({
				address: this.state.address
			});
		}
	};

	switchForm = () => {
		if (this.state.action === "search") {
			this.setState({
				action: "add"
			});
		} else {
			this.setState({
				action: "search"
			});
		}
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = e => {
		e.prevernDefault();
		this.searchAdd();
	};

	render() {
		return (
			<Modal open={true} closeIcon onClose={this.props.closeModal}>
				{this.state.action === "search" ? (
					<Modal.Content>
						<Modal.Description>
							<Header>Search for your building</Header>
							<Form onSubmit={this.props.searchForAddress}>
								<Label>Address:</Label>
								<Form.Input
									type="text"
									name="address"
									value={this.props.address}
									onChange={this.props.handleCreateChange}
								/>
								<Modal.Actions>
									<Button
										color="green"
										type="Submit"
										content="Search address!"
									/>
								</Modal.Actions>
							</Form>
							<Button
								color="yellow"
								onClick={this.props.closeModal}
							>
								Cancel
							</Button>
							<Button color="blue" onClick={this.props.addUser}>
								Add yourself
							</Button>
						</Modal.Description>
					</Modal.Content>
				) : (
					<Modal.Content>
						<Modal.Description>
							<Header>Add your current building</Header>
							<Form onSubmit={this.props.addBuilding}>
								<Label>Address:</Label>
								<Form.Input
									type="text"
									name="address"
									value={this.props.address}
									onChange={this.props.handleCreateChange}
								/>
								<Modal.Actions>
									<Button
										color="black"
										onClick={this.props.closeModal}
									>
										Cancel
									</Button>
									<Button
										color="green"
										type="Submit"
										content="Create address!"
									/>
								</Modal.Actions>
							</Form>
						</Modal.Description>
					</Modal.Content>
				)}

				{this.state.action === "search" ? (
					<small>
						Dont see your building? Add it{" "}
						<span onClick={this.switchForm}>here</span>.
					</small>
				) : (
					<small>
						Search for your building{" "}
						<span onClick={this.switchForm}>here</span>!
					</small>
				)}
			</Modal>
		);
	}
}


export default SearchAddBuildingForm







