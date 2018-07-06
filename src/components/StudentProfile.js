import React, { Component } from 'react'
import fetchWithToken from '../helpers/fetchWithToken'

class StudentProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {},
      loading: false,
    }
  }

  fetchUser = () => {
    this.setState({loading: true})

    fetchWithToken(`http://localhost:3001/students/${localStorage.getItem('userId')}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'access-control-allow-origin': '*',
      },
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
          <div className='row'>
            <div className='col col-6 center'>
              <h5>Id: {this.state.user._id}</h5>
              <h4>Name: {this.state.user.name}</h4>
              <h4>Surname: {this.state.user.surname}</h4>
              <h4>Index: {this.state.user.index}</h4>
              <h4>Email: {this.state.user.email}</h4>
              <h4>Password: {this.state.user.password}</h4>
            </div>
            <div className='col col-6 center'>
              {this.state.user.avatar && <img className='avatar' alt='Avatar' src={this.state.user.avatar}/>}
            </div>
          </div>
        </div>
        {this.state.user.grades && <div className='col col-8 center'>
          <h2>Grades:</h2>
          <ul className='list-group'>
            {this.state.user.subjects.map(subject =>
              <li className='list-group-item list-group-item-info' key={subject._id}>
                <h4>Subject: {subject.name}</h4>
                <h4>Grades:</h4>
                <ul className='list-group'>
                  {this.state.user.grades.filter(grade => grade.subject._id === subject._id).map(grade =>
                    <li className='list-group-item list-group-item-info' key={grade._id}>
                      <h4>Grade: {grade.value}</h4>
                      <h4>Note: {grade.note}</h4>
                    </li>)}
                </ul>
              </li>)}
          </ul>
        </div>}
      </div>
    )
  }
}

export default StudentProfile
