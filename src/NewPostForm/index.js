import React, { Component } from 'react';
import { Form, Button, Label, Segment } from 'semantic-ui-react'
import '../index.css'


class CreatePost extends Component {
	constructor(){
		super()
		this.state = {
			text: ''
		}
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value})
	}
	render(){
		return(
			<div className='postForm'>
			<Segment>
				<h1>Create a Post</h1>
				<Form size='tiny' onSubmit={(e) => {e.preventDefault(); this.props.addPost(this.state)}}>
					<Label>Text: </Label>
					<Form.Input type='text' name='text' value={this.state.text} onChange={this.handleChange}/>
					<Button type='submit' color='blue'>Create Post</Button>
				</Form>
			</Segment>
			</div>
		)
	}
}

export default CreatePost
