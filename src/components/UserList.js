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
        email: '',
        avatar: '',
      },
      updateValues: {
        name: '',
        surname: '',
        index: '',
        email: '',
        avatar: '',
      },
      userList: [],
      loading: false,
      activeUser: null,
      addFormActive: false,
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
        'access-control-allow-origin': '*',
      },
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
        'access-control-allow-origin': '*',
      },
    })
      .then(() => {
          this.fetchUsers()
        },
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
          email: user.email,
          avatar: user.avatar,
        },
      })
    else
      this.setState({
          activeUser: null,
        },
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
        'access-control-allow-origin': '*',
      },
      body: JSON.stringify(this.state.postValues),
    })
      .then(() => {
        this.fetchUsers()
        this.setState({
          postValues: {
            name: '',
            surname: '',
            index: '',
            password: '',
            email: '',
            avatar: '',
          },
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
        'access-control-allow-origin': '*',
      },
      body: JSON.stringify(this.state.updateValues),
    })
      .then(() => {
        this.setState({
          updateValues: {
            name: '',
            surname: '',
            index: '',
            email: '',
            avatar: '',
          },
          activeUser: null,
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

    console.log(this.state.userList)

    return (
      <div>
        <h2>{this.props.mode.charAt(0).toUpperCase() + this.props.mode.substr(1)}</h2>

        <br/>
        <button className='btn btn-info' onClick={() => this.setState({addFormActive: !this.state.addFormActive})}>
          Add new user
        </button>
        <br/>

        {this.state.addFormActive && <div>
          Add new:<br/>
          <form onSubmit={this.handleSubmitPost}>
            <div className="form-row">
              <div className="form-group col-md-6">
                Name:
                <input className='form-control' id='name' type='text' value={this.state.postValues.name}
                       onChange={this.handleChangePost}/>
              </div>
              <div className="form-group col-md-6">
                Surname:
                <input className='form-control' id='surname' type='text'
                       value={this.state.postValues.surname}
                       onChange={this.handleChangePost}/>
              </div>
              <div className="form-group col-md-6">
                Index:
                <input className='form-control' id='index' type='text' value={this.state.postValues.index}
                       onChange={this.handleChangePost}/>
              </div>
              <div className="form-group col-md-6">
                Password:
                <input className='form-control' id='password' type='text' value={this.state.postValues.password}
                       onChange={this.handleChangePost}/>
              </div>
              <div className="form-group col-md-6">
                Email:
                <input className='form-control' id='email' type='text' value={this.state.postValues.email}
                       onChange={this.handleChangePost}/>
              </div>
              <div className="form-group col-md-6">
                Avatar:
                <input className='form-control' id='avatar' type='text' value={this.state.postValues.avatar}
                       onChange={this.handleChangePost}/>
              </div>
              <div className="form-group col-md-12">
                <br/><input className='btn btn-success' type='submit' value='Submit'/>
              </div>
            </div>
          </form>
        </div>}

        <ul className='list-group'>
          {this.state.userList.map(user => {
            return (
              this.state.activeUser !== user._id ? <li className='list-group-item list-group-item-dark' key={user._id}>
                <div className='row'>
                  <div className='col col-6 center'>
                    <h5>Id: {user._id}</h5>
                    <h4>Name: {user.name}</h4>
                    <h4>Surname: {user.surname}</h4>
                    <h4>Index: {user.index}</h4>
                    <h4>Email: {user.email}</h4>
                  </div>
                  <div className='col col-6 center'>
                    Avatar:<br/>
                    {user.avatar && <img className='avatar' alt='Avatar' src={user.avatar}/>}
                  </div>
                </div>
                <button onClick={() => this.deleteUser(user._id)} className='btn btn-danger'>X</button>
                <button onClick={() => this.editUser(user)} className='btn btn-info'>Edit</button>
              </li> : <form onSubmit={this.handleSubmitUpdate}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    Name:
                    <input className='form-control' id='name' type='text' value={this.state.updateValues.name}
                           onChange={this.handleChangeUpdate}/>
                  </div>
                  <div className="form-group col-md-6">
                    Surname:
                    <input className='form-control' id='surname' type='text'
                           value={this.state.updateValues.surname}
                           onChange={this.handleChangeUpdate}/>
                  </div>
                  <div className="form-group col-md-6">
                    Index:
                    <input className='form-control' id='index' type='text' value={this.state.updateValues.index}
                           onChange={this.handleChangeUpdate}/>
                  </div>
                  <div className="form-group col-md-6">
                    Email:
                    <input className='form-control' id='email' type='text' value={this.state.updateValues.email}
                           onChange={this.handleChangeUpdate}/>
                  </div>
                  <div className="form-group col-md-12">
                    Avatar:
                    <input className='form-control' id='avatar' type='text' value={this.state.updateValues.avatar}
                           onChange={this.handleChangeUpdate}/>
                    <br/><input className='btn btn-success' type='submit' value='Submit'/>
                    <button onClick={() => this.editUser(user)} className='btn btn-info'>Cancel</button>
                  </div>
                </div>
              </form>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default UserList
