import React, { Component } from 'react'
import fetchWithToken from '../helpers/fetchWithToken'
import containsObject from '../helpers/containsObject'

class Subjects extends Component {
  constructor (props) {
    super(props)
    this.state = {
      postValues: {
        name: '',
      },
      updateValues: {
        name: '',
        teacherListAdd: [],
        studentListAdd: [],
        teacherListDelete: [],
        studentListDelete: [],
      },
      subjectList: [],
      studentList: [],
      teacherList: [],
      loading: false,
      activeSubject: null,
    }

    this.handleChangePost = this.handleChangePost.bind(this)
    this.handleSubmitPost = this.handleSubmitPost.bind(this)
    this.handleChangeUpdate = this.handleChangeUpdate.bind(this)
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this)
  }

  fetchSubjects = () => {
    this.setState({loading: true})

    fetchWithToken('http://localhost:3001/subjects', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'access-control-allow-origin': '*',
      },
    })
      .then(response => {
        response.json().then(data => {
          this.setState({subjectList: data, loading: false})
        })
      })
  }

  fetchStudents = () => {
    this.setState({loading: true})

    fetchWithToken('http://localhost:3001/students', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'access-control-allow-origin': '*',
      },
    })
      .then(response => {
        response.json().then(data => {
          this.setState({studentList: data, loading: false})
        })
      })
  }

  fetchTeachers = () => {
    this.setState({loading: true})

    fetchWithToken('http://localhost:3001/teachers', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'access-control-allow-origin': '*',
      },
    })
      .then(response => {
        response.json().then(data => {
          this.setState({teacherList: data, loading: false})
        })
      })
  }

  deleteSubject (id) {
    this.setState({loading: true})

    fetchWithToken(`http://localhost:3001/subjects/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'access-control-allow-origin': '*',
      },
    })
      .then(() => {
          this.fetchSubjects()
        },
      )
  }

  editSubject (subject) {
    if (subject._id !== this.state.activeSubject)
      this.setState({
        activeSubject: subject._id,
        updateValues: {
          name: subject.name,
          teacherListAdd: [],
          studentListAdd: [],
          teacherListDelete: [],
          studentListDelete: [],

        },
      })
    else
      this.setState({
          activeSubject: null,
        },
      )
  }

  componentDidMount () {
    this.fetchSubjects()
    this.fetchStudents()
    this.fetchTeachers()
  }

  handleChangePost (e) {
    this.setState({postValues: {...this.state.postValues, [e.target.id]: e.target.value}})
  }

  handleSubmitPost (e) {
    this.setState({loading: true})

    fetchWithToken('http://localhost:3001/subjects', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*',
      },
      body: JSON.stringify(this.state.postValues),
    })
      .then(() => {
        this.fetchSubjects()
        this.setState({
          postValues: {
            name: '',
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

    fetchWithToken(`http://localhost:3001/subjects/${this.state.activeSubject}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*',
      },
      body: JSON.stringify(this.state.updateValues),
    })
      .then(() => {
        this.fetchSubjects()
        this.setState({
          updateValues: {
            name: '',
            teacherListAdd: [],
            studentListAdd: [],
            teacherListDelete: [],
            studentListDelete: [],
          },
          activeSubject: false,
        })
      })

    e.preventDefault()
  }

  renderUsers (users, mode) {
    console.log(this.state.updateValues)

    return (
      <ul className='list-group'>
        {users.map(user => {
          return (
            <li
              className='list-group-item list-group-item-dark'
              key={user._id}
            >
              <h4>{user.name}</h4>
              <h4>{user.surname}</h4>
              <h4>{user.index}</h4>
              {mode === 'addStudent' && <button className='btn btn-danger' onClick={() => this.setState({
                updateValues: {
                  ...this.state.updateValues,
                  studentListAdd: [...this.state.updateValues.studentListAdd, user],
                },
              })}>Add</button>}
              {mode === 'addTeacher' && <button className='btn btn-danger' onClick={() => this.setState({
                updateValues: {
                  ...this.state.updateValues,
                  teacherListAdd: [...this.state.updateValues.teacherListAdd, user],
                },
              })}>Add</button>}
              {mode === 'deleteStudent' && <button className='btn btn-danger' onClick={() => this.setState({
                updateValues: {
                  ...this.state.updateValues,
                  studentListDelete: [...this.state.updateValues.studentListDelete, user],
                },
              })}>X</button>}
              {mode === 'deleteTeacher' && <button className='btn btn-danger' onClick={() => this.setState({
                updateValues: {
                  ...this.state.updateValues,
                  teacherListDelete: [...this.state.updateValues.teacherListDelete, user],
                },
              })}>X</button>}
              {mode === 'deleteStudentRevert' && <button className='btn btn-danger' onClick={() => this.setState({
                updateValues: {
                  ...this.state.updateValues,
                  studentListDelete: this.state.updateValues.studentListDelete.filter(student => student._id !== user._id),
                },
              })}>X</button>}
              {mode === 'deleteTeacherRevert' && <button className='btn btn-danger' onClick={() => this.setState({
                updateValues: {
                  ...this.state.updateValues,
                  teacherListDelete: this.state.updateValues.teacherListDelete.filter(teacher => teacher._id !== user._id),
                },
              })}>X</button>}
              {mode === 'addStudentRevert' && <button className='btn btn-danger' onClick={() => this.setState({
                updateValues: {
                  ...this.state.updateValues,
                  studentListAdd: this.state.updateValues.studentListAdd.filter(student => student._id !== user._id),
                },
              })}>X</button>}
              {mode === 'addTeacherRevert' && <button className='btn btn-danger' onClick={() => this.setState({
                updateValues: {
                  ...this.state.updateValues,
                  teacherListAdd: this.state.updateValues.teacherListAdd.filter(teacher => teacher._id !== user._id),
                },
              })}>X</button>}
            </li>
          )
        })}
      </ul>
    )
  }

  render () {
    if (this.state.loading)
      return (
        <div>LOADING...</div>
      )

    return (
      <div className='row'>
        <div className='col col-10 center'>
          <h2>Subject list</h2>
          <ul className='list-group'>
            {this.state.subjectList.map(subject => {
              return (
                this.state.activeSubject !== subject._id ?
                  <li className='list-group-item list-group-item-dark' key={subject._id}>
                    <h5>Id: {subject._id}</h5>
                    <h4>Name: {subject.name}</h4>
                    <button onClick={() => this.deleteSubject(subject._id)} className='btn btn-danger'>X</button>
                    <button onClick={() => this.editSubject(subject)} className='btn btn-info'>Edit</button>
                    <div className='row'>
                      <div className='col col-6 center'>
                        Students:
                        {this.renderUsers(subject.students)}
                      </div>
                      <div className='col col-6 center'>
                        Teachers:
                        {this.renderUsers(subject.teachers)}
                      </div>
                    </div>
                  </li> : <div>
                    <form onSubmit={this.handleSubmitUpdate}>
                      <label>
                        Name:
                        <input className='form-control' id='name' type='text' value={this.state.updateValues.name}
                               onChange={this.handleChangeUpdate}/><br/>
                      </label>
                      <br/><input className='btn btn-success' type='submit' value='Submit'/>
                      <button onClick={() => this.editSubject(subject)} className='btn btn-info'>Cancel</button>
                    </form>
                    <div className='row'>
                      <div className='col col-1 center'>
                        Students
                      </div>
                      <div className='col col-1 center'>
                        Subject's students:
                        {this.renderUsers(subject.students.filter(student => containsObject(student, this.state.updateValues.studentListDelete) === false), 'deleteStudent')}
                      </div>
                      <div className='col col-1 center'>
                        Students to delete:
                        {this.renderUsers(this.state.updateValues.studentListDelete, 'deleteStudentRevert')}
                      </div>
                      <div className='col col-1 center'>
                        Students:
                        {this.renderUsers(this.state.studentList.filter(student => containsObject(student, this.state.updateValues.studentListAdd) === false
                          && containsObject(student, subject.students) === false), 'addStudent')}
                      </div>
                      <div className='col col-1 center'>
                        Students to add:
                        {this.renderUsers(this.state.updateValues.studentListAdd, 'addStudentRevert')}
                      </div>
                      <div className='col col-1 center'>
                        Teachers
                      </div>
                      <div className='col col-1 center'>
                        Subject's teachers:
                        {this.renderUsers(subject.teachers.filter(teacher => containsObject(teacher, this.state.updateValues.teacherListDelete) === false), 'deleteTeacher')}
                      </div>
                      <div className='col col-1 center'>
                        Teachers to delete:
                        {this.renderUsers(this.state.updateValues.teacherListDelete, 'deleteTeacherRevert')}
                      </div>
                      <div className='col col-1 center'>
                        Teachers:
                        {this.renderUsers(this.state.teacherList.filter(teacher => containsObject(teacher, this.state.updateValues.teacherListAdd) === false
                          && containsObject(teacher, subject.teachers) === false), 'addTeacher')}
                      </div>
                      <div className='col col-1 center'>
                        Teachers to add:
                        {this.renderUsers(this.state.updateValues.teacherListAdd, 'addTeacherRevert')}
                      </div>
                    </div>
                  </div>
              )
            })}
          </ul>
        </div>
        <div className='col col-2 center'>
          <h3>Add new subject:</h3>
          <form onSubmit={this.handleSubmitPost}>
            <label>
              Name:
              <input className='form-control' id='name' type='text' value={this.state.postValues.name}
                     onChange={this.handleChangePost}/><br/>
            </label>
            <br/><input className='btn btn-success' type='submit' value='Submit'/>
          </form>
        </div>
      </div>
    )
  }
}

export default Subjects
