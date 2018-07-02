import React, { Component } from 'react'

class Users extends Component {
  constructor (props) {
    super(props)
    this.state = {
      postValues: {
        name: '',
        surname: '',
        index: '',
        isStudent: true,
        password: ''
      },
      updateValues: {
        name: '',
        surname: '',
        index: '',
        isStudent: true,
        password: ''
      },
      userList: [],
      loading: false,
      activeUser: null
    }

    this.handleChangePost = this.handleChangePost.bind(this)
    this.handleSubmitPost = this.handleSubmitPost.bind(this)
    this.handleChangeUpdate = this.handleChangeUpdate.bind(this)
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this)
  }

  fetchUsers = () => {
    this.setState({loading: true})

    fetch('http://localhost:3001/users', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'access-control-allow-origin': '*'
      }
    })
      .then(response => {
        response.json().then(data => {
          this.setState({userList: data, loading: false})
        })
      })
  }

  deleteUser (id) {
    this.setState({loading: true})

    fetch(`http://localhost:3001/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'access-control-allow-origin': '*'
      }
    })
      .then(() => {
          this.fetchUsers()
        }
      )
  }

  editUser (user) {
    if (user._id !== this.state.activeUser)
      this.setState({
        activeUser: user._id,
        updateValues: {
          name: user.name,
          surname: user.surname,
          index: user.index,
          isStudent: user.isStudent,
          password: user.password,
        }
      })
    else
      this.setState({
          activeUser: null
        }
      )
  }

  componentDidMount () {
    this.fetchUsers()
  }

  handleChangePost (e) {
    this.setState({postValues: {...this.state.postValues, [e.target.id]: e.target.value}})
  }

  handleSubmitPost (e) {
    this.setState({loading: true})

    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*'
      },
      body: JSON.stringify(this.state.postValues)
    })
      .then(() => {
        this.fetchUsers()
        this.setState({
          postValues: {
            name: '',
            surname: '',
            index: '',
            isStudent: true,
            password: ''
          }
        })
      })

    e.preventDefault()
  }

  handleChangeUpdate (e) {
    this.setState({updateValues: {...this.state.updateValues, [e.target.id]: e.target.value}})
  }

  handleSubmitUpdate (e) {
    this.setState({loading: true})

    fetch(`http://localhost:3001/users/${this.state.activeUser}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*'
      },
      body: JSON.stringify(this.state.updateValues)
    })
      .then(() => {
        this.fetchUsers()
        this.setState({
          updateValues: {
            name: '',
            surname: '',
            index: '',
            isStudent: true,
            password: ''
          },
          activeUser: false
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
            {this.state.userList.map(user => {
              return (
                this.state.activeUser !== user._id ?
                  <li className='list-group-item list-group-item-info' key={user._id}>
                    <h5>Id: {user._id}</h5>
                    <h4>Name: {user.name}</h4>
                    <h4>Surname: {user.surname}</h4>
                    <h4>Index: {user.index}</h4>
                    <h4>Password: {user.password}</h4>
                    {user.isStudent && <h4>Is a student</h4>}
                    <button onClick={() => this.deleteUser(user._id)} className='btn btn-danger'>X</button>
                    <button onClick={() => this.editUser(user)} className='btn btn-info'>Edit</button>
                  </li> : <form onSubmit={this.handleSubmitUpdate}>
                    <label>
                      Name:
                      <input className='form-control' id='name' type='text' value={this.state.updateValues.name}
                             onChange={this.handleChangeUpdate}/><br/>
                      Surname:
                      <input className='form-control' id='surname' type='text' value={this.state.updateValues.surname}
                             onChange={this.handleChangeUpdate}/><br/>
                      Password:
                      <input className='form-control' id='password' type='text' value={this.state.updateValues.password}
                             onChange={this.handleChangeUpdate}/><br/>
                      Index:
                      <input className='form-control' id='index' type='text' value={this.state.updateValues.index}
                             onChange={this.handleChangeUpdate}/><br/>
                      Student:
                      <select className='form-control' id='isStudent' value={this.state.updateValues.isStudent}
                              onChange={this.handleChangeUpdate}>
                        <option value='true'>Student</option>
                        <option value='false'>Lecturer</option>
                      </select>
                    </label>
                    <br/><input className='btn btn-success' type='submit' value='Submit'/>
                    <button onClick={() => this.editUser(user)} className='btn btn-info'>Cancel</button>
                  </form>
              )
            })}
          </ul>
        </div>
        <div className='col col-6 center'>
          <form onSubmit={this.handleSubmitPost}>
            <label>
              Name:
              <input className='form-control' id='name' type='text' value={this.state.postValues.name}
                     onChange={this.handleChangePost}/><br/>
              Surname:
              <input className='form-control' id='surname' type='text' value={this.state.postValues.surname}
                     onChange={this.handleChangePost}/><br/>
              Password:
              <input className='form-control' id='password' type='text' value={this.state.postValues.password}
                     onChange={this.handleChangePost}/><br/>
              Index:
              <input className='form-control' id='index' type='text' value={this.state.postValues.index}
                     onChange={this.handleChangePost}/><br/>
              Student:
              <select className='form-control' id='isStudent' value={this.state.postValues.isStudent}
                      onChange={this.handleChangePost}>
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
