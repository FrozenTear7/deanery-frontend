import React, { Component } from 'react'
import fetchWithToken from '../helpers/fetchWithToken'
import containsObject from '../helpers/containsObject'
import UserCard from './UserCard'

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
      error: null,
      activeSubject: null,
    }

    this.handleChangePost = this.handleChangePost.bind(this)
    this.handleSubmitPost = this.handleSubmitPost.bind(this)
    this.handleChangeUpdate = this.handleChangeUpdate.bind(this)
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this)
  }

  fetchSubjects = () => {
    this.setState({loading: true})

    fetchWithToken('https://frozentear7-deanery-example.herokuapp.com/subjects', {
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

    fetchWithToken('https://frozentear7-deanery-example.herokuapp.com/students', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'access-control-allow-origin': '*',
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Could not fetch students')
        }
      })
      .then(data => {
          this.setState({studentList: data, loading: false})
        })
      .catch(error => {
        this.setState({
          error: error.message,
          loading: false,
        })
      })
  }

  fetchTeachers = () => {
    this.setState({loading: true})

    fetchWithToken('https://frozentear7-deanery-example.herokuapp.com/teachers', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'access-control-allow-origin': '*',
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Could not fetch teachers')
        }
      })
      .then(data => {
          this.setState({teacherList: data, loading: false})
        })
      .catch(error => {
        this.setState({
          error: error.message,
          loading: false,
        })
      })
  }

  deleteSubject (id) {
    this.setState({loading: true})

    fetchWithToken(`https://frozentear7-deanery-example.herokuapp.com/subjects/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'access-control-allow-origin': '*',
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Could not delete the subject')
        }
      })
      .then(() => {
          this.fetchSubjects()
        },
      )
      .catch(error => {
        this.setState({
          error: error.message,
          loading: false,
        })
      })
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
        .catch(error => {
          this.setState({
            error: error.message,
            loading: false,
          })
        })
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

    fetchWithToken('https://frozentear7-deanery-example.herokuapp.com/subjects', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*',
      },
      body: JSON.stringify(this.state.postValues),
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Could not add the subject')
        }
      })
      .then(() => {
        this.fetchSubjects()
        this.setState({
          postValues: {
            name: '',
          },
        })
      })
      .catch(error => {
        this.setState({
          error: error.message,
          loading: false,
        })
      })

    e.preventDefault()
  }

  handleChangeUpdate (e) {
    this.setState({updateValues: {...this.state.updateValues, [e.target.id]: e.target.value}})
  }

  handleSubmitUpdate (e) {
    this.setState({loading: true})

    fetchWithToken(`https://frozentear7-deanery-example.herokuapp.com/subjects/${this.state.activeSubject}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*',
      },
      body: JSON.stringify(this.state.updateValues),
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Could not edit the subject')
        }
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
      .catch(error => {
        this.setState({
          error: error.message,
          loading: false,
        })
      })

    e.preventDefault()
  }

  renderUsers (users, mode) {
    return (
      <ul className='list-group'>
        {users.map(user => {
          return (
            <li
              className='list-group-item list-group-item-dark'
              key={user._id}
            >
              <UserCard user={user}/>
              {mode && <button className='btn btn-success' onClick={() => {
                switch (mode) {
                  case 'addStudent':
                    if (!containsObject(user, this.state.updateValues.studentListAdd))
                      this.setState({
                        updateValues: {
                          ...this.state.updateValues,
                          studentListAdd: [...this.state.updateValues.studentListAdd, user],
                        },
                      })
                    else
                      this.setState({
                        updateValues: {
                          ...this.state.updateValues,
                          studentListAdd: this.state.updateValues.studentListAdd.filter(student => student._id !== user._id),
                        },
                      })
                    break
                  case 'addTeacher':
                    if (!containsObject(user, this.state.updateValues.teacherListAdd))
                      this.setState({
                        updateValues: {
                          ...this.state.updateValues,
                          teacherListAdd: [...this.state.updateValues.teacherListAdd, user],
                        },
                      })
                    else
                      this.setState({
                        updateValues: {
                          ...this.state.updateValues,
                          teacherListAdd: this.state.updateValues.teacherListAdd.filter(teacher => teacher._id !== user._id),
                        },
                      })
                    break
                  case 'deleteStudent':
                    if (!containsObject(user, this.state.updateValues.studentListDelete))
                      this.setState({
                        updateValues: {
                          ...this.state.updateValues,
                          studentListDelete: [...this.state.updateValues.studentListDelete, user],
                        },
                      })
                    else
                      this.setState({
                        updateValues: {
                          ...this.state.updateValues,
                          studentListDelete: this.state.updateValues.studentListDelete.filter(student => student._id !== user._id),
                        },
                      })
                    break
                  case 'deleteTeacher':
                    if (!containsObject(user, this.state.updateValues.teacherListDelete))
                      this.setState({
                        updateValues: {
                          ...this.state.updateValues,
                          teacherListDelete: [...this.state.updateValues.teacherListDelete, user],
                        },
                      })
                    else
                      this.setState({
                        updateValues: {
                          ...this.state.updateValues,
                          teacherListDelete: this.state.updateValues.teacherListDelete.filter(teacher => teacher._id !== user._id),
                        },
                      })
                    break
                  default:
                    break
                }
              }}>+
              </button>}
            </li>
          )
        })}
      </ul>
    )
  }

  render () {
    if (this.state.loading) return (<div className='center'>LOADING...</div>)

    return (
      <div>
        {(this.state.error) &&
        <div className='alert alert-danger center' role='alert'>
          Error: {this.state.error}
        </div>}
        <div className='row'>
          <div className='col col-10 center'>
            <h2>Subject list</h2>
            <ul className='list-group'>
              {this.state.subjectList.map(subject => {
                return (
                  this.state.activeSubject !== subject._id ?
                    <li className='list-group-item list-group-item-dark' key={subject._id}>
                      <h4>Name: {subject.name}</h4>
                      <button onClick={() => this.deleteSubject(subject._id)} className='btn btn-danger'>X</button>
                      <button onClick={() => this.editSubject(subject)} className='btn btn-info'>Edit</button>
                      <div className='row'>
                        <div className='col col-6 center'>
                          <h4>Students:</h4>
                          {this.renderUsers(subject.students)}
                        </div>
                        <div className='col col-6 center'>
                          <h4>Teachers:</h4>
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
                        <div className='col col-3 center'>
                          Subject's students:
                          {this.renderUsers(subject.students, 'deleteStudent')}
                        </div>
                        <div className='col col-3 center'>
                          Students:
                          {this.renderUsers(this.state.studentList.filter(student => containsObject(student, subject.students) === false), 'addStudent')}
                        </div>
                        <div className='col col-3 center'>
                          Subject's teachers:
                          {this.renderUsers(subject.teachers, 'deleteTeacher')}
                        </div>
                        <div className='col col-3 center'>
                          Teachers:
                          {this.renderUsers(this.state.teacherList.filter(teacher => containsObject(teacher, subject.teachers) === false), 'addTeacher')}
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
      </div>
    )
  }
}

export default Subjects
