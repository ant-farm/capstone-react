import React, { Component } from 'react';
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';
import CommentList from '../CommentList'
import NewCommentForm from '../NewCommentForm'
import '../index.css'

class CommentModal extends Component {
	constructor(props){
		super(props)
		this.state = {
			comments: [],
			commentToEdit: {
				body: ''
			}
		}
	}
	componentDidMount(){
		this.getComments();
	}

	getComments = async (id) => {
		try {
			const comments = await fetch(process.env.REACT_APP_API_URL + '/comments/' + id, 
			{

				credentials: 'include'
			})

			const parsedComments = await comments.json()
			console.log(parsedComments)
			this.setState({
				comments: [
				...this.state.comments, 
				comments.data]
		})
		} catch(err){
			console.log(err)
		}
			
	} 

	addComment = async (e, newCommentForm) => {
		//prevent form from refreshing page
		e.preventDefault()
		console.log('this is addComment in commentModal')
		try{
			const createdCommentResponse = await fetch(process.env.REACT_APP_API_URL + '/comments/' + this.props.postId, 
			{
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(newCommentForm),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			console.log('\nthis is createdCommentRes in addComment');
			console.log(createdCommentResponse)
			const parsedCommentResponse = await createdCommentResponse.json()
			console.log('\nthis is parsedCommentRes in addComment');
			console.log(parsedCommentResponse);
			this.setState({
				comments: [
				...this.state.comments, 
				parsedCommentResponse.data
				]
			})
		} catch(err) {
			console.log(err)
		}
	}

	deleteComment = async (commentId) => {
		const deleteCommentResponse = await fetch(process.env.REACT_APP_API_URL + '/comments/' +
			commentId, 
			{
				method: 'DELETE',
				credentials: 'include'
			})
		const deleteCommentParsed = await deleteCommentResponse.json()
		console.log(deleteCommentParsed)
		this.setState({
			comments: this.state.comments.filter((comment) => comment.id !== commentId)
		})
	}
	render(){

		return(
			<React.Fragment>
				<Modal
					open={this.props.open}
					closeIcon
					onClose={this.props.closeCommentModal}
					>
					<Modal.Header>Comments</Modal.Header>
					<Modal.Content image scrolling className='commentModal'>
						<div className='commentList'>
							<CommentList 
							deleteComment={this.deleteComment}
							comments={this.state.comments} />
						</div>
							<NewCommentForm addComment={this.addComment}/>
					</Modal.Content>
				</Modal>
			</React.Fragment>
		)
	}
}




export default CommentModal