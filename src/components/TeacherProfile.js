import React, { Component } from 'react'
import fetchWithToken from '../helpers/fetchWithToken'

class TeacherProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {},
      postValues: {
        value: '',
        note: '',
        student: '',
        subject: '',
      },
      loading: false,
      activeStudent: null,
      activeSubject: null,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  fetchUser = () => {
    this.setState({loading: true})

    fetchWithToken(`http://localhost:3001/teachers/${localStorage.getItem('userId')}`, {
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

  handleChange (e) {
    this.setState({postValues: {...this.state.postValues, [e.target.id]: e.target.value}})
  }

  handleSubmit (e) {
    this.setState({
      loading: true,
    })

    fetchWithToken(`http://localhost:3001/grades`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*',
      },
      body: JSON.stringify({
        ...this.state.postValues,
        student: this.state.activeStudent,
        subject: this.state.activeSubject,
      }),
    })
      .then(() => {
        this.fetchUser()
        this.setState({
          postValues: {
            value: '',
            note: '',
            student: '',
            subject: '',
          },
          activeStudent: '',
          activeSubject: '',
        })
      })

    e.preventDefault()
  }

  editStudent (student, subject) {
    if (student._id !== this.state.activeStudent && subject._id !== this.state.activeSubject)
      this.setState({
        activeStudent: student._id,
        activeSubject: subject._id,
      })
    else
      this.setState({
          activeStudent: null,
          activeSubject: null,
        },
      )
  }

  render () {
    if (this.state.loading)
      return (
        <div>LOADING...</div>
      )

    console.log(this.state)

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
        {this.state.user.subjects && <div className='col col-8 center'>
          <h2>Subjects:</h2>
          <ul className='list-group'>
            {this.state.user.subjects.map(subject =>
              <li className='list-group-item list-group-item-info' key={subject._id}>
                <h4>Subject: {subject.name}</h4>
                <h4>Students:</h4>
                <ul className='list-group'>
                  {subject.students.map(student =>
                    <li className='list-group-item list-group-item-info' key={student._id}>
                      <h4>Name: {student.name}</h4>
                      <h4>Surname: {student.name}</h4>
                      <h4>Index: {student.index}</h4>
                      <ul className='list-group'>
                        {student.grades.filter(grade => grade.subject === subject._id).map(grade =>
                          <li className='list-group-item list-group-item-info' key={grade._id}>
                            <h4>Grade: {grade.value}</h4>
                            <h4>Note: {grade.note}</h4>
                          </li>)}
                      </ul>
                      {(this.state.activeSubject === subject._id && this.state.activeStudent === student._id) ?
                        <form onSubmit={this.handleSubmit}>
                          <label>
                            Value:
                            <input className='form-control' id='value' type='text'
                                   value={this.state.postValues.value}
                                   onChange={this.handleChange}/>
                            Note:
                            <input className='form-control' id='note' type='text'
                                   value={this.state.postValues.note}
                                   onChange={this.handleChange}/>
                          </label>
                          <br/><input className='btn btn-success' type='submit' value='Submit'/>
                        </form> :
                        <button className='btn btn-success' onClick={() => this.editStudent(student, subject)}>+
                        </button>}
                    </li>)}
                </ul>
              </li>)}
          </ul>
        </div>}
      </div>
    )
  }
}

export default TeacherProfile
