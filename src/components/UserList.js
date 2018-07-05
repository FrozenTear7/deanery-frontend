import React, { Component } from 'react'
import fetchWithToken from '../helpers/fetchWithToken'

class UserList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      postValues: {
        name: '',
        surname: '',
        index: '',
        password: '',
        email: ''
      },
      updateValues: {
        name: '',
        surname: '',
        index: '',
        password: '',
        email: ''
      },
      userList: [],
      loading: false,
      activeUser: null,
    }

    this.handleChangePost = this.handleChangePost.bind(this)
    this.handleSubmitPost = this.handleSubmitPost.bind(this)
    this.handleChangeUpdate = this.handleChangeUpdate.bind(this)
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this)
  }

  fetchUsers = () => {
    this.setState({loading: true})

    fetchWithToken(`http://localhost:3001/${this.props.mode}`, {
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

    fetchWithToken(`http://localhost:3001/${this.props.mode}/${id}`, {
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
          password: user.password,
          email: user.email,
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

    fetchWithToken(`http://localhost:3001/${this.props.mode}`, {
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
            password: '',
            email: ''
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

    fetchWithToken(`http://localhost:3001/${this.props.mode}/${this.state.activeUser}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*'
      },
      body: JSON.stringify(this.state.updateValues)
    })
      .then(() => {
        this.setState({
          updateValues: {
            name: '',
            surname: '',
            index: '',
            password: '',
            email: ''
          },
          activeUser: null
        })
        this.fetchUsers()
      })

    e.preventDefault()
  }

  render () {
    if (this.state.loading)
      return (
        <div>LOADING...</div>
      )

    return (
      <div>
        <h2>{this.props.mode}</h2>
        <ul className='list-group'>
          {this.state.userList.map(user => {
            return (
              this.state.activeUser !== user._id ? <li className='list-group-item list-group-item-info' key={user._id}>
                <h5>Id: {user._id}</h5>
                <h4>Name: {user.name}</h4>
                <h4>Surname: {user.surname}</h4>
                <h4>Index: {user.index}</h4>
                <h4>Email: {user.email}</h4>
                <h4>Password: {user.password}</h4>
                <button onClick={() => this.deleteUser(user._id)} className='btn btn-danger'>X</button>
                <button onClick={() => this.editUser(user)} className='btn btn-info'>Edit</button>
              </li> : <form onSubmit={this.handleSubmitUpdate}>
                <label>
                  Name:
                  <input className='form-control' id='name' type='text' value={this.state.updateValues.name}
                         onChange={this.handleChangeUpdate}/>
                  Surname:
                  <input className='form-control' id='surname' type='text'
                         value={this.state.updateValues.surname}
                         onChange={this.handleChangeUpdate}/>
                  Password:
                  <input className='form-control' id='password' type='text'
                         value={this.state.updateValues.password}
                         onChange={this.handleChangeUpdate}/>
                  Index:
                  <input className='form-control' id='index' type='text' value={this.state.updateValues.index}
                         onChange={this.handleChangeUpdate}/>
                  Email:
                  <input className='form-control' id='email' type='text' value={this.state.updateValues.email}
                         onChange={this.handleChangeUpdate}/>
                </label>
                <br/><input className='btn btn-success' type='submit' value='Submit'/>
                <button onClick={() => this.editUser(user)} className='btn btn-info'>Cancel</button>
              </form>
            )
          })}
        </ul>
        <br/><br/><br/>
        Add new:<br/>
        <form onSubmit={this.handleSubmitPost}>
          <label>
            Name:
            <input className='form-control' id='name' type='text' value={this.state.postValues.name}
                   onChange={this.handleChangePost}/>
            Surname:
            <input className='form-control' id='surname' type='text' value={this.state.postValues.surname}
                   onChange={this.handleChangePost}/>
            Password:
            <input className='form-control' id='password' type='text' value={this.state.postValues.password}
                   onChange={this.handleChangePost}/>
            Index:
            <input className='form-control' id='index' type='text' value={this.state.postValues.index}
                   onChange={this.handleChangePost}/>
            Email:
            <input className='form-control' id='email' type='text' value={this.state.postValues.email}
                   onChange={this.handleChangePost}/>
          </label>
          <br/><input className='btn btn-success' type='submit' value='Submit'/>
        </form>
      </div>
    )
  }
}

export default UserList
