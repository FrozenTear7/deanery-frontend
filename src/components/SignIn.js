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
      activeUser: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({signInValues: {...this.state.signInValues, [e.target.id]: e.target.value}})
  }

  handleSubmit (e) {
    this.setState({loading: true})

    fetch('http://localhost:3001/signin', {
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
          localStorage.setItem('userId', data._id)
          localStorage.setItem('name', data.name + data.surname)
          this.setState({
            signInValues: {
              index: '',
              password: ''
            },
            loading: false
          })
          this.props.history.push('/')
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
      </div>
    )
  }
}

export default withRouter(SignIn)
