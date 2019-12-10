import React from 'react'
import '../App.css'
import { Form, Button, Label, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'


class LoginRegisterForm extends React.Component{
	constructor(){
		super()

		this.state = {
			username: '',
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			action: 'login'
		}
	}

	loginRegister = () => {
		if(this.state.action === 'login'){
			this.props.login({
				username: this.state.username,
				password: this.state.password
			})
		} else{
			this.props.register({
				username: this.state.username,
				first_name: this.state.first_name,
				last_name: this.state.last_name,
				email: this.state.email,
				password: this.state.password
			})
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.loginRegister()
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	switchForm = () => {
		if(this.state.action === 'login'){
			this.setState({
				action: 'register'
			})
		} else{
			this.setState({
				action: 'login'
			})
		}
	}

 

	render() {
    return(

      <div className='background-image' style={{backgroundColor: 'teal'}}> 
  
      <div className="LoginRegisterForm">
    
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }} >
            <Segment stacked>
       
            <Header as='h2'  textAlign='center' >
               Friendly
            </Header>

        <Form size='large' onSubmit={this.handleSubmit}>
          {
            this.state.action === "register"
            ?
         
            <React.Fragment>

              <Form.Input 
                icon='user'
                iconPosition='left'
                placeholder='First Name'
                type="text" 
                name="first_name" 
                value={this.state.first_name}
                onChange={this.handleChange}
              />
              <Form.Input 
                icon='user'
                iconPosition='left'
                placeholder='Last Name'
                type="text" 
                name="last_name" 
                value={this.state.last_name}
                onChange={this.handleChange}
              />
              <Form.Input 
                icon="user"
                iconPosition='left'
                placeholder='Email'
                type="text" 
                name="email" 
                value={this.state.email}
                onChange={this.handleChange}
              />

            </React.Fragment>

            :
            null
          }
            
              

                <Form.Input 
                fluid icon='user' 
                iconPosition='left' 
                placeholder='Username'
                type="username" 
                name="username" 
                value={this.state.username}
                onChange={this.handleChange} 
                />
                

                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  name="password" 
                  value={this.state.password}
                  onChange={this.handleChange}
                  />

                <Button color='yellow' fluid size='large' type="Submit">{this.state.action === "register" ? "Register" : "Log in" }</Button>
                
           
            </Form>
            {
              this.state.action === "register"
              ?
              <small >Already have an account? Log in <span onClick={this.switchForm}>here</span>.</small>
              :
              <small >Need an account? Sign up <span onClick={this.switchForm}>here</span>!</small>  
            }
               </Segment>
          </Grid.Column>
        </Grid>
     
        </div>
        </div>
      )
  }
 
 
}

export default LoginRegisterForm
