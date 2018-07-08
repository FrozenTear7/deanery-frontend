import React, { Component } from 'react'
import fetchWithToken from '../helpers/fetchWithToken'
import UserCard from './UserCard'

class StudentProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {},
      loading: false,
      activeSubject: null,
    }
  }

  fetchUser = () => {
    this.setState({loading: true})

    fetchWithToken(`https://frozentear7-deanery-example.herokuapp.com/students/${localStorage.getItem('userId')}`, {
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

  selectSubject (subject) {
    if (subject._id !== this.state.activeSubject)
      this.setState({
        activeSubject: subject._id,
      })
    else
      this.setState({
          activeSubject: null,
        },
      )
  }

  teacherEmail (email) {
    return 'mailto:' + email
  }

  componentDidMount () {
    this.fetchUser()
  }

  render () {
    if (this.state.loading)
      return (
        <div>LOADING...</div>
      )

    console.log(this.state)

    return (
      <div className='row'>
        <div className='col col-6 center'>
          <UserCard user={this.state.user}/>
        </div>
        {this.state.user.grades && <div className='col col-6 center'>
          <h2>Subjects:</h2>
          <ul className='list-group'>
            {this.state.user.subjects.map(subject =>
              <li className='list-group-item list-group-item-dark' key={subject._id}>
                <h3>Subject: {subject.name}
                  <div className='dropdown'>
                    <button className='btn btn-info-sm dropdown-toggle' type='button' id='dropdownTeachers'
                            data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                      Teachers
                    </button>
                    <div className='dropdown-menu' aria-labelledby='dropdownTeachers'>
                      <ul>
                        {subject.teachers.map(teacher =>
                          <li>
                            <h5>{teacher.name + ' ' + teacher.surname}</h5>
                            <a href={this.teacherEmail(teacher.email)}>Email the teacher</a>
                          </li>)}
                      </ul>
                    </div>
                  </div>
                  <br/>

                  <button className='btn btn-info-sm' onClick={() => this.selectSubject(subject)}>
                    Grades:
                    <span
                      className='badge badge-pill badge-success'>{this.state.user.grades
                      .filter(grade => grade.subject._id === subject._id).length}
                    </span>
                  </button>
                </h3>
                {this.state.activeSubject === subject._id &&
                <div>
                  <h4>Grades:</h4>
                  <div className='row'>
                    <div className='col col-5 center'>
                      <ul className='list-group'>
                        {this.state.user.grades.filter(grade => grade.subject._id === subject._id && grade.type === 1).map(grade =>
                          <li className='list-group-item list-group-item-action list-group-item-secondary'
                              key={grade._id}
                              data-toggle='tooltip' data-placement='top' title={grade.note}>
                            <h4>Grade: {grade.value}</h4>
                          </li>)}
                      </ul>
                    </div>
                    <div className='col col-3 center'>
                    </div>
                    {this.state.user.grades.filter(grade => grade.type === 2 && grade.subject._id === this.state.activeSubject).length > 0 &&
                    <div className='col col-4 center jumbotron'>
                      <h2>Final
                        grade: {this.state.user.grades.filter(grade => grade.type === 2 && grade.subject._id === this.state.activeSubject)[0].value}</h2>
                    </div>}
                  </div>
                </div>}
              </li>)}
          </ul>
        </div>}
      </div>
    )
  }
}

export default StudentProfile
