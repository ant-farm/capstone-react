import React from 'react';
import { Card, Button, Image, Rating } from 'semantic-ui-react';
import '../index.css'

function PostList(props){
	console.log(" this is props", props);
	const posts = props.posts.map((post) => {
		console.log('this is the post -----', post)
		return(
			<Card key={post._id} className='postList'>
				
				<Card.Content>
					<Card.Header>{post.title}</Card.Header>
					<Card.Meta>
						<span className='user'>{post.users}</span><br/>
					</Card.Meta>
					<Card.Description>{post.text}</Card.Description>
					
				</Card.Content>
				<Card.Content extra>
					<span>{post.created}</span>
					<Button className='postButtons'color='red' onClick={() => props.deletePost(post._id)}>Delete Post</Button>
					<Button color='yellow' onClick={() => props.editPost(post.id)}>Edit Post</Button>
					<Button color='olive' onClick={() => props.openCommentModal(post.id)}>Veiw comments</Button>
				</Card.Content>
			</Card>	
		)
	})
	return (
		<Card.Group>
			{posts} 
		</Card.Group>
	)
}

export default PostList