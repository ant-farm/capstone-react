import React from 'react';
import { Card, Button, Image, Rating } from 'semantic-ui-react';
import '../index.css'

function PostList(props){
	console.log(" this is props", props);
	// let newDate = new Date()
	const posts = props.posts.map((post) => {
		console.log('this is the post -----', post)
		return(
			<Card key={post._id} className='postList'>
				
				<Card.Content>
					<Card.Header>{post.title}</Card.Header>
					<Card.Meta>
						<span>Message</span><br/>
					</Card.Meta>
					<Card.Description>{post.text}</Card.Description>
					
				</Card.Content>
				<Card.Content extra>
					<span>{post.created}</span>
					<Button size='tiny' className='postButtons'color='red' onClick={() => props.deletePost(post._id)}>Delete Post</Button>
					<Button size='tiny' color='yellow' onClick={() => props.editPost(post.id)}>Edit Post</Button>
					
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