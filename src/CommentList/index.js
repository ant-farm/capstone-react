import React from 'react';
import { Comment, Button, Header, Icon} from 'semantic-ui-react'

function CommentList(props){
	let comments
	if (props.comments !== undefined){
		console.log(props.comments, 'this is props.comments');
		comments = props.comments.map((comment) => {
			return(
				<Comment.Group key={comment.id}>
			    <Header as='h3' dividing>
			    </Header>
		    <Comment>
		    <Comment.Avatar src=''/>
		      <Comment.Content>
		        <Comment.Author as='a'>{comment.user.username}</Comment.Author>
		        <Comment.Text>{comment.body}</Comment.Text>
		        <Button icon size='mini'onClick={() => props.deleteComment(comment.id)}>Delete</Button>
		      </Comment.Content>
		    </Comment>
		    </Comment.Group>
			)
		})
	} else {
		comments = null 
	}
	return(
		<div>
			{ comments }
		</div>
	)
}

 
export default CommentList;