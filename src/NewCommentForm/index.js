import React, { Component } from 'react';
import { Button, Comment, Form, Header, Label} from 'semantic-ui-react';

class CreateComment extends Component {
	constructor(props){
		console.log(props);
		super(props)
		this.state = {
			user: '',
			body: ''
			// post: ''
		}	
	}

	handleChange = (e) => {
		this.setState({[e.currentTarget.name]: e.target.value})
	}
	render(){
		return (
			<Form onSubmit={(e) => this.props.addComment(e, this.state)}>
				<Form.Input className='commentForm' type='text' name='body' value={this.state.body}
					onChange={this.handleChange}/>
				<Button className='commentFormButton' color='green' type='submit'>Create Comment</Button>
			</Form>
		)
	}
}

export default CreateComment;