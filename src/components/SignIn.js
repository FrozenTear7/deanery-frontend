import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class SignIn extends Component {
  constructor (props) {
    super(props)
    this.state = {
      signInValues: {
        index: '',
        password: '',
      },
      userList: [],
      loading: false,
      error: null,
      activeUser: null,
      signinMode: 0,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({signInValues: {...this.state.signInValues, [e.target.id]: e.target.value}})
  }

  handleSubmit (e) {
    this.setState({loading: true, error: null})

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
        'access-control-allow-origin': '*',
      },
      body: JSON.stringify(this.state.signInValues),
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Could not sign in')
        }
      })
      .then(data => {
        localStorage.setItem('userId', data.id)
        localStorage.setItem('userMode', String(this.state.signinMode))
        localStorage.setItem('name', data.name)
        localStorage.setItem('token', data.token)
        this.setState({
          signInValues: {
            index: '',
            password: '',
          },
          loading: false,
        })
        this.props.history.push('/deanery-frontend/')
      })
      .catch(error => {
        this.setState({
          error: error.message,
          loading: false,
        })
      })

    e.preventDefault()
  }

  render () {
    if (this.state.loading) return (
      <div className='center'>LOADING...</div>
    )

    return (
      <div>
        {(this.state.error) &&
        <div className='alert alert-danger center' role='alert'>
          Error: {this.state.error}
        </div>}
        <div className='center'>
          <br/><br/>
          <h3>SIGN IN</h3>
          <br/><br/>
          <button type='button' className='btn btn-info' data-toggle='modal' data-target='#help'>
            Help
          </button>
          <div className='modal fade' id='help' role='dialog' aria-labelledby='helpLabel' aria-hidden='true'>
            <div className='modal-dialog' role='document'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='helpLabel'>HELP</h5>
                  <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <div className='modal-body'>
                  <div className='row'>
                    <div className='col col-6'>
                      Example student:
                      <h2>
                        Index: <br/>
                        123123
                      </h2>
                      <h3>
                        Password: <br/>
                        student
                      </h3>
                    </div>
                    <div className='col col-6'>
                      Example teacher:
                      <h2>
                        Index: <br/>
                        100100
                      </h2>
                      <h3>
                        Password: <br/>
                        teacher
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <br/><br/><br/><br/>

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
          <button className={this.state.signinMode === 0 ? 'btn btn-primary' : 'btn btn-sm'}
                  onClick={() => {this.setState({signinMode: 0})}}>Student
          </button>
          <button className={this.state.signinMode === 1 ? 'btn btn-primary' : 'btn btn-sm'}
                  onClick={() => {this.setState({signinMode: 1})}}>Teacher
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(SignIn)
