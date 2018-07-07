import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class SignIn extends Component {
  constructor (props) {
    super(props)
    this.state = {
      signInValues: {
        index: '',
        password: ''
      },
      userList: [],
      loading: false,
      error: null,
      activeUser: null,
      signinMode: 0
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({signInValues: {...this.state.signInValues, [e.target.id]: e.target.value}})
  }

  handleSubmit (e) {
    this.setState({loading: true})

    let signinUrl
    switch (this.state.signinMode) {
      case 2:
        signinUrl = 'https://frozentear7-deanery-example.herokuapp.com/signin/admin'
        break
      case 1:
        signinUrl = 'https://frozentear7-deanery-example.herokuapp.com/signin/teacher'
        break
      default:
        signinUrl = 'https://frozentear7-deanery-example.herokuapp.com/signin/student'
        break
    }

    fetch(signinUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*'
      },
      body: JSON.stringify(this.state.signInValues)
    })
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          localStorage.setItem('userId', data.id)
          localStorage.setItem('userMode', String(this.state.signinMode))
          localStorage.setItem('name', data.name)
          localStorage.setItem('token', data.token)
          this.setState({
            signInValues: {
              index: '',
              password: ''
            },
            loading: false
          })
          this.props.history.push('/deanery-frontend/')
        } else {
          this.setState({
            error: data,
            loading: false
          })
        }
      })

    e.preventDefault()
  }

  render () {
    if (this.state.loading)
      return (
        <div>LOADING...</div>
      )

    return (
      <div className='center'>
        <h3>SIGN IN</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Index:
            <input className='form-control' id='index' type='text' value={this.state.signInValues.index}
                   onChange={this.handleChange}/><br/>
            Password:
            <input className='form-control' id='password' type='text' value={this.state.signInValues.password}
                   onChange={this.handleChange}/><br/>
          </label>
          <br/><input className='btn btn-success' type='submit' value='Submit'/>
        </form>
        <br/>
        <button className='btn btn-info' onClick={() => {this.setState({signinMode: 0})}}>Student</button>
        <button className='btn btn-info' onClick={() => {this.setState({signinMode: 1})}}>Teacher</button>
        <button className='btn btn-info' onClick={() => {this.setState({signinMode: 2})}}>Admin (Not available)</button>
      </div>
    )
  }
}

export default withRouter(SignIn)
