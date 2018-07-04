import React, { Component } from 'react'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {},
      loading: false
    }
  }

  fetchUser = () => {
    this.setState({loading: true})

    fetch(`http://localhost:3001/users/${localStorage.getItem('userId')}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'access-control-allow-origin': '*'
      }
    })
      .then(response => {
        response.json().then(data => {
          this.setState({user: data, loading: false})
        })
      })
  }

  componentDidMount () {
    this.fetchUser()
  }

  render () {
    if (this.state.loading)
      return (
        <div>LOADING...</div>
      )

    return (
      <div className='row'>
        <div className='col col-4 center'>
          <h5>Id: {this.state.user._id}</h5>
          <h4>Name: {this.state.user.name}</h4>
          <h4>Surname: {this.state.user.surname}</h4>
          <h4>Index: {this.state.user.index}</h4>
          <h4>Email: {this.state.user.email}</h4>
          <h4>Password: {this.state.user.password}</h4>
          {this.state.user.isStudent && <h4>Is a student</h4>}
        </div>
        {this.state.user.grades && <div className='col col-8 center'>
          <h2>Grades:</h2>
          <ul className='list-group'>
            {this.state.user.grades.map(grade =>
              <li className='list-group-item list-group-item-info' key={grade._id}>
                <h4>Subject: {grade.subject.name}</h4>
                <h4>Grade: {grade.value}</h4>
              </li>)}
          </ul>
        </div>}
      </div>
    )
  }
}

export default Profile
