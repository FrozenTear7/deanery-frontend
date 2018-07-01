import React, { Component } from 'react'

class Users extends Component {
  constructor (props) {
    super(props)
    this.state = {
      postValues: {
        name: '',
        surname: '',
        index: '',
        isStudent: true
      },
      userList: [],
      loading: false,
      error: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  fetchUsers = async () => {
    fetch('http://localhost:3001/users', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*'
      }
    })
      .then(response => {
        response.json().then(data => {
          this.setState({userList: data, loading: false})
        })
      })
  }

  componentDidMount () {
    this.setState({loading: true})

    this.fetchUsers()
  }

  handleChange (e) {
    this.setState({postValues: {...this.state.postValues, [e.target.id]: e.target.value}})
  }

  handleSubmit (e) {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*'
      },
      body: JSON.stringify(this.state.postValues)
    })
      .then(response => {
        response.json().then(data => {
          this.fetchUsers()
          this.setState({
            postValues: {
              name: '',
              surname: '',
              index: '',
              isStudent: true
            }
          })
        })
      })

    e.preventDefault()
  }

  render () {
    if (this.state.loading)
      return (
        <div>LOADING...</div>
      )

    return (
      <div className='row'>
        <div className='col col-6 center'>
          <h2>User list</h2>
          <ul className='list-group'>
            {this.state.userList.map(user => <li className='list-group-item list-group-item-info' key={user._id}>
              <h5>Id: {user._id}</h5>
              <h4>Name: {user.name}</h4>
              <h4>Surname: {user.surname}</h4>
              <h4>Index: {user.index}</h4>
              {user.isStudent && <h4>Is a student</h4>}
            </li>)}
          </ul>
        </div>
        <div className='col col-6 center'>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input className='form-control' id='name' type='text' value={this.state.postValues.name}
                     onChange={this.handleChange}/><br/>
              Surname:
              <input className='form-control' id='surname' type='text' value={this.state.postValues.surname}
                     onChange={this.handleChange}/><br/>
              Index:
              <input className='form-control' id='index' type='text' value={this.state.postValues.index}
                     onChange={this.handleChange}/><br/>
              Student:
              <select className='form-control' id='isStudent' value={this.state.postValues.isStudent}
                      onChange={this.handleChange}>
                <option value='true'>Student</option>
                <option value='false'>Lecturer</option>
              </select>
            </label>
            <br/><input className='btn btn-success' type='submit' value='Submit'/>
          </form>
        </div>
      </div>
    )
  }
}

export default Users
