import React, { Component } from 'react'
import fetchWithToken from '../helpers/fetchWithToken'
import UserCard from './UserCard'

class TeacherProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {},
      postValues: {
        value: '',
        note: '',
        type: '1',
        student: '',
        subject: '',
      },
      updateValues: {
        value: '',
        note: '',
      },
      loading: false,
      activeStudent: null,
      activeSubject: null,
      activeGrade: null,
    }

    this.handleChangePost = this.handleChangePost.bind(this)
    this.handleSubmitPost = this.handleSubmitPost.bind(this)
    this.handleChangeUpdate = this.handleChangeUpdate.bind(this)
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this)
  }

  fetchUser = () => {
    this.setState({loading: true})

    fetchWithToken(`https://frozentear7-deanery-example.herokuapp.com/teachers/${localStorage.getItem('userId')}`, {
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

  handleChangePost (e) {
    this.setState({postValues: {...this.state.postValues, [e.target.id]: e.target.value}})
  }

  handleSubmitPost (e) {
    this.setState({
      loading: true,
    })

    fetchWithToken(`https://frozentear7-deanery-example.herokuapp.com/grades`, {
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
            type: '1',
            student: '',
            subject: '',
          },
        })
      })

    e.preventDefault()
  }

  handleChangeUpdate (e) {
    this.setState({updateValues: {...this.state.updateValues, [e.target.id]: e.target.value}})
  }

  handleSubmitUpdate (e) {
    this.setState({
      loading: true,
    })

    fetchWithToken(`https://frozentear7-deanery-example.herokuapp.com/grades/${this.state.activeGrade}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*',
      },
      body: JSON.stringify({
        ...this.state.updateValues,
      }),
    })
      .then(() => {
        this.fetchUser()
        this.setState({
          updateValues: {
            value: '',
            note: '',
          },
          activeGrade: '',
        })
      })

    e.preventDefault()
  }

  editSubject (subject) {
    if (subject._id !== this.state.activeSubject)
      this.setState({
        activeSubject: subject._id,
      })
    else
      this.setState({
          activeSubject: null,
          updateValues: {
            value: '',
            note: '',
          },
        },
      )
  }

  editStudent (student) {
    if (student._id !== this.state.activeStudent)
      this.setState({
        activeStudent: student._id,
      })
    else
      this.setState({
          activeStudent: null,
        },
      )
  }

  editGrade (grade) {
    if (grade._id !== this.state.activeGrade)
      this.setState({
        activeGrade: grade._id,
        updateValues: {
          value: grade.value,
          note: grade.note,
        },
      })
    else
      this.setState({
          activeGrade: null,
          updateValues: {
            value: '',
            note: '',
          },
        },
      )
  }

  deleteGrade (id) {
    this.setState({loading: true})

    fetchWithToken(`https://frozentear7-deanery-example.herokuapp.com/grades/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'access-control-allow-origin': '*',
      },
    })
      .then(() => {
          this.fetchUser()
        },
      )
  }

  render () {
    if (this.state.loading) return (
      <div className='center'>LOADING...</div>
    )

    if (this.state.error) return (
      <div className='alert alert-danger center' role='alert'>
        Error: {this.state.error}
      </div>
    )

    return (
      <div className='row'>
        <div className='col col-6 center'>
          <UserCard user={this.state.user}/>
        </div>
        {this.state.user.subjects && <div className='col col-6 center'>
          <h2>Subjects:</h2>
          <ul className='list-group'>
            {this.state.user.subjects.map(subject =>
              <li className='list-group-item list-group-item-dark' key={subject._id}>
                <h4>Subject: {subject.name}</h4>
                <button className='btn btn-success' onClick={() => this.editSubject(subject)}>+</button>
                {this.state.activeSubject === subject._id &&
                <div>
                  <h4>Students:</h4>
                  <ul className='list-group'>
                    {subject.students.map(student =>
                      <li className='list-group-item list-group-item-secondary' key={student._id}>
                        <div className='row'>
                          <div
                            className={student.grades.filter(grade => grade.type === 2 && grade.subject === this.state.activeSubject).length > 0
                              ? 'col col-6 center' : 'col col-12 center'}>
                            <UserCard user={student}/>
                          </div>
                          <div className='col col-6 center'>
                            {student.grades.filter(grade => grade.type === 2 && grade.subject === this.state.activeSubject).length > 0 &&
                            <div className='center jumbotron'>
                              <h2>Final
                                grade: {student.grades.filter(grade => grade.type === 2 && grade.subject === this.state.activeSubject)[0].value}</h2>
                            </div>}
                          </div>
                        </div>
                        <button className='btn btn-success' onClick={() => this.editStudent(student)}>+</button>
                        {this.state.activeStudent === student._id &&
                        <div>
                          <form onSubmit={this.handleSubmitPost}>
                            <label>
                              Value:
                              <input className='form-control' id='value' type='text'
                                     value={this.state.postValues.value}
                                     onChange={this.handleChangePost}/>
                              Note:
                              <input className='form-control' id='note' type='text'
                                     value={this.state.postValues.note}
                                     onChange={this.handleChangePost}/>
                              {student.grades.filter(grade => grade.type === 2 && grade.subject === this.state.activeSubject).length === 0 &&
                              <div>
                                Type:
                                <select className='form-control' id='type'
                                        value={this.state.postValues.type}
                                        onChange={this.handleChangePost}>
                                  <option value='1'>Normal</option>
                                  <option value='2'>Final</option>
                                </select>
                              </div>}
                            </label>
                            <br/><input className='btn btn-success' type='submit' value='Submit'/>
                          </form>

                          <ul className='list-group'>
                            {student.grades.filter(grade => grade.subject === subject._id).map(grade =>
                              <li className='list-group-item list-group-item-secondary' key={grade._id}>
                                {(this.state.activeGrade === grade._id) ? <form onSubmit={this.handleSubmitUpdate}>
                                    <label>
                                      Value: <input className='form-control' id='value' type='text'
                                                    value={this.state.updateValues.value}
                                                    onChange={this.handleChangeUpdate}/>
                                      Note: <input className='form-control' id='note' type='text'
                                                   value={this.state.updateValues.note}
                                                   onChange={this.handleChangeUpdate}/>
                                    </label>
                                    <br/><input className='btn btn-success' type='submit' value='Submit'/>
                                    <button className='btn btn-info'
                                            onClick={() => this.setState({activeGrade: null})}>Cancel
                                    </button>
                                  </form>
                                  : <div>
                                    <h4>Grade: {grade.value}</h4>
                                    <h4>Note: {grade.note}</h4>
                                    {grade.type === 1 && <h4>Type: normal</h4>}
                                    {grade.type === 2 && <h4>Type: final</h4>}
                                    <button className='btn btn-danger' onClick={() => this.deleteGrade(grade._id)}>X
                                    </button>
                                    <button className='btn btn-info' onClick={() => this.editGrade(grade)}>Edit
                                    </button>
                                  </div>}
                              </li>,
                            )}
                          </ul>
                        </div>}
                      </li>)}
                  </ul>
                </div>}
              </li>)}
          </ul>
        </div>}
      </div>
    )
  }
}

export default TeacherProfile
