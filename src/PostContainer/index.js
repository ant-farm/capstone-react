import React from 'react'
import PostList from '../PostList'
import NewPostForm from '../NewPostForm'
import EditPostModal from '../EditPostModal'
import { Grid, Button } from 'semantic-ui-react';
import CommentModal from '../CommentModal'
import CommentList from '../CommentList'

class PostContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      posts: [],
      postId: '',
      postToShow: {
        text: ''
      },
      editModalIsOpen: false,
      foundAddress: null,

      commentModalIsOpen: false,
      newPost: {
        text:''
      },
      postToEdit: {
        text: ''
      }
    }
  }
  componentDidMount(){
    this.getPosts();
  }


// Get all posts from one building address   -----------------------
  getPosts = async () => {
    try {
      const posts = await fetch(process.env.REACT_APP_API_URL + `/posts/${this.state.foundAddress._id}`,
        {
          method:'GET',
          credentials: 'include'
        });
    
      const parsedPosts = await posts.json();

      console.log(parsedPosts);
    } catch(err) {
      console.log(err);
    }
  }

 // Add a post --------------------------
  addPost = async (e) => { 
    e.preventDefault()
    try{

      const createdPost = await fetch(process.env.REACT_APP_API_URL +   `/posts/${this.state.foundAddress._id}`, 
      {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(this.state.newPost),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const parsedResponse = await createdPost.json()
      console.log(parsedResponse)
      this.setState({
        posts: [
        ...this.state.posts, 
        parsedResponse.data
        ]
      })
    }
    catch(err){
      console.log(err);
    }
  }



  // Delete Post ----------------------
  deletePost = async (id) => {
    const deletePostResponse = await fetch(process.env.REACT_APP_API_URL + '/posts/' + id, 
    {
      method: 'DELETE',
      credentials: 'include'
    })
    const deletePostParsed = await deletePostResponse.json()
    console.log(deletePostParsed)
    this.setState({
      
      posts: this.state.posts.filter((post) => post.id !== id)
    })

  }

  // Edit post ---------------------------------------
  editPost = (id) => {

      const postToEdit = this.state.posts.find(post => post.id === id)
      this.setState({
        editModalIsOpen: true,
        postToEdit: postToEdit
      })
  }

  handleEditChange = (e) => {
    e.preventDefault()
    this.setState({
      postToEdit: {
        ...this.state.postToEdit, 
        [e.target.name]: e.target.value}
    })
  }

  // show post -------------------------------
  showPost = async (id) => {
    const postToShow = this.state.posts.find(
      post => post.id === id
      );
    console.log('This is the posttoshow')
    console.log(postToShow)
    this.setState({
      showModalOpen: true,
      postToShow: postToShow
    })
  }

  // update post ------------------------------
  updatePost = async (e) => {
    e.preventDefault();
    const body = {
      text: this.state.postToEdit
    }
    try {
      const url = process.env.REACT_APP_API_URL + '/posts/' + this.state.postToEdit.id
      const updateResponse = await fetch(url, 
      {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const updateResponseParsed = await updateResponse.json()
      const newPostArrayWithUpdate = this.state.posts.map((post) => {

        if(post.id === updateResponseParsed.data.id){
          post = updateResponseParsed.data
        } 
        return post
      })
      
      this.setState({
        posts: newPostArrayWithUpdate
      })
      this.closeModal()
    } catch(err){
      console.log(err);
    }
  }


  openCommentModal = (postId) => {
    this.setState({
      postId: postId,
      commentModalIsOpen: true
    })
    console.log('\nthis is this.state.comments when opening the comment modal');
    console.log(this.state.comments);
  }

 //this function will set modal state to false so it can be closed
  closeCommentModal = () => {
    this.setState({
      commentModalIsOpen: false
    })
  }

  //this functiono just closes the modal after updates are submitted
  closeModal = () => {
    this.setState({
      editModalIsOpen: false
    })
  }
   

  render(){
    return (
      <Grid columns={3} 
        divided textAlign='center' 
        style={{ height: '100%' }} 
        verticalAlign='top' 
        stackable
        >
          <Grid.Row>
            <Grid.Column>

              <PostList 
              posts={this.state.posts}
              editPost={this.editPost}
              deletePost={this.deletePost}
              openCommentModal={this.openCommentModal}
              // getComments={this.getComments}
              //maybe have just modal open on button click and make fetch call when state of modalIsOpen changes ttrue?
            />
            </Grid.Column>

            {
              this.state.commentModalIsOpen === true
              ?
            <Grid.Column>

              <CommentModal
              postId={this.state.postId} 
              openCommentModal={this.openCommentModal}
              open={this.state.commentModalIsOpen}
              closeCommentModal={this.closeCommentModal}
              />
            </Grid.Column>
            :
            null
            }

            <Grid.Column >

             <NewPostForm addPost={this.addPost}/>

            </Grid.Column>
            
              <EditPostModal
              open={this.state.editModalIsOpen}
              updatePost={this.updatePost}
              postToEdit={this.state.postToEdit}
              closeModal={this.closeModal}
              handleEditChange={this.handleEditChange}
              />
          </Grid.Row>
        </Grid>
    )
  }
}

export default PostContainer
// -------------------



// render() {
// 	return(
    
// 		<div>
// 		<div class="ui comments">
//   <h3 class="ui dividing header">Comments</h3>
//   <div class="comment">
//     <a class="avatar">

//     </a>
//     <div class="content">
//       <a class="author">Matt</a>
//       <div class="metadata">
//         <span class="date">Today at 5:42PM</span>
//       </div>
//       <div class="text">
//         How artistic!
//       </div>
//       <div class="actions">
//         <a class="reply">Reply</a>
//       </div>
//     </div>
//   </div>
//   <div class="comment">
//     <a class="avatar">

//     </a>
//     <div class="content">
//       <a class="author">Elliot Fu</a>
//       <div class="metadata">
//         <span class="date">Yesterday at 12:30AM</span>
//       </div>
//       <div class="text">
//         <p>This has been very useful for my research. Thanks as well!</p>
//       </div>
//       <div class="actions">
//         <a class="reply">Reply</a>
//       </div>
//     </div>
//     <div class="comments">
//       <div class="comment">
//         <a class="avatar">

//         </a>
//         <div class="content">
//           <a class="author">Jenny Hess</a>
//           <div class="metadata">
//             <span class="date">Just now</span>
//           </div>
//           <div class="text">
//             Elliot you are always so right :)
//           </div>
//           <div class="actions">
//             <a class="reply">Reply</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div class="comment">
//     <a class="avatar">

//     </a>
//     <div class="content">
//       <a class="author">Joe Henderson</a>
//       <div class="metadata">
//         <span class="date">5 days ago</span>
//       </div>
//       <div class="text">
//         Dude, this is awesome. Thanks so much
//       </div>
//       <div class="actions">
//         <a class="reply">Reply</a>
//       </div>
//     </div>
//   </div>
//   <form class="ui reply form">
//     <div class="field">
//       <textarea></textarea>
//     </div>
//     <div class="ui blue labeled submit icon button">
//       <i class="icon edit"></i> Add Reply
//     </div>
//   </form>
// </div>
// 		</div>

// 		)
// }

// }


// export default Forum 