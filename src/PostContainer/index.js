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
      loggedInUser: this.props.loggedInUser,
      usersBuildingId: this.props.usersBuildingId,
      postToShow: {
        text: ''
      },
      editModalIsOpen: false,
      foundAddress: null,

      commentModalIsOpen: false,
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
    console.log("here is id we are trying to use in getPosts");
    console.log(this.props.usersBuildingId);
    try {

      const posts = await fetch(process.env.REACT_APP_API_URL + '/posts/' + this.state.usersBuildingId,
        {
          method:'GET',
          credentials: 'include'
        });
    
      const parsedPosts = await posts.json();
      console.log("response in getPosts");
      console.log(parsedPosts);
      this.setState({
        posts: parsedPosts
      })

      console.log(parsedPosts);
    } catch(err) {
      console.log(err);
    }
  }

 // Add a post --------------------------
  addPost = async (newPost) => { 
    // console.log("trying to add post, here is props ", this.);
    console.log("here is the post we are trying to add");
    console.log(newPost);
    try{

      const createdPost = await fetch(process.env.REACT_APP_API_URL +   '/posts/' + this.props.usersBuildingId, 
      {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(newPost),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const parsedResponse = await createdPost.json()
      console.log("here's what we got back from the server after adding it");
      console.log(parsedResponse)
      this.setState({
        posts: [
          ...this.state.posts, 
          parsedResponse
        ]
      })
    }
    catch(err){
      console.log(err);
    }
  }



  // Delete Post ----------------------
  deletePost = async (id) => {
    try {
          const deletePostResponse = await fetch(process.env.REACT_APP_API_URL + '/posts/' + id, 
        {
          method: 'DELETE',
          credentials: 'include'
        })
        const deletePostParsed = await deletePostResponse.json()
        console.log(deletePostParsed)
        this.setState({
          
          posts: this.state.posts.filter((post) => post._id !== id)
        })

      }

     catch(err){
      console.log(err)
    }
    }

  // Edit post ---------------------------------------
  editPost = (id) => {


      const postToEdit = this.state.posts.find(post => post.id === id)
      console.log("postToEdit>>>> ",postToEdit);
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
      text: this.state.postToEdit.text
    }
    console.log('this is state in updatePost', this.state);
    try {
      const url = process.env.REACT_APP_API_URL + '/posts/' + this.state.postToEdit._id
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
      console.log('this is the update response', updateResponseParsed)
      const newPostArrayWithUpdate = this.state.posts.map((post) => {
      

      console.log('this is post', post);

        if(post._id === updateResponseParsed._id){
          post = updateResponseParsed
        } 
        return post
      })
      console.log('this is newPostArrayWithUpdate-----------', newPostArrayWithUpdate)
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

             <NewPostForm 
             addPost={this.addPost}
             loggedInUser={this.state.loggedInUser}
             />

            </Grid.Column>
            <Grid.Column>
            <Button size='tiny' color='blue' onClick={() => this.props.logout()}>Log out</Button>
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



