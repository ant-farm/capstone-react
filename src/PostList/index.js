import React from 'react';
import { Card, Button, Image, Rating } from 'semantic-ui-react';
import '../index.css'

function PostList(props){
	console.log(props);
	const posts = props.posts.map((post) => {
		console.log(post)
		return(
			<Card key={post.id} className='postList'>
				<Image src={post.image} wrapped ui={false} />
				<Card.Content>
					<Card.Header>{post.title}</Card.Header>
					<Card.Meta>
						<span className='user'>{post.users}</span><br/>
					</Card.Meta>
					<Card.Description>{post.text}</Card.Description>
					<Card.Description><a href={post.image}>image</a></Card.Description>
					<Rating icon='heart' defaultRating={0} maxRating={1} />
				</Card.Content>
				<Card.Content extra>
					<span>{post.created}</span>
					<Button size='tiny'className='postButtons'color='red' onClick={() => props.deletePost(post.id)}>Delete Post</Button>
					<Button size='tiny' color='yellow' onClick={() => props.editPost(post.id)}>Edit Post</Button>
					<Button size='tiny' color='olive' onClick={() => props.openCommentModal(post.id)}>Comments</Button>
				</Card.Content>
			</Card>	
		)
	})
	console.log(posts);
	return (
		<Card.Group>
			{posts} 
		</Card.Group>
	)
}

export default PostList