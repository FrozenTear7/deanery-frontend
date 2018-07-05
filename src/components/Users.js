import React, { Component } from 'react'

class Teachers extends Component {
  constructor (props) {
    super(props)
    this.state = {
      postValuesStudent: {
        name: '',
        surname: '',
        index: '',
        password: '',
        email: ''
      },
      updateValuesStudent: {
        name: '',
        surname: '',
        index: '',
        password: '',
        email: ''
      },
      studentList: [],
      teacherList: [],
      loading: false,
      activeStudent: null,
      activeTeacher: null,
      addStudent: true,
    }

    this.handleChangePost = this.handleChangePost.bind(this)
    this.handleSubmitPost = this.handleSubmitPost.bind(this)
    this.handleChangeUpdate = this.handleChangeUpdate.bind(this)
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this)
    this.handleChangePostMode = this.handleChangePostMode.bind(this)
  }

  fetchStudents = () => {
    this.setState({loading: true})

    fetch('http://localhost:3001/students', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'access-control-allow-origin': '*'
      }
    })
      .then(response => {
        response.json().then(data => {
          this.setState({studentList: [...this.state.studentList, ...data], loading: false})
        })
      })

    fetch('http://localhost:3001/teachers', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'access-control-allow-origin': '*'
      }
    })
      .then(response => {
        response.json().then(data => {
          this.setState({studentList: [...this.state.studentList, ...data], loading: false})
        })
      })
  }

  fetchTeachers = () => {
    this.setState({loading: true})

    fetch('http://localhost:3001/teachers', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'access-control-allow-origin': '*'
      }
    })
      .then(response => {
        response.json().then(data => {
          this.setState({teacherList: [...this.state.teacherList, ...data], loading: false})
        })
      })

    fetch('http://localhost:3001/teachers', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'access-control-allow-origin': '*'
      }
    })
      .then(response => {
        response.json().then(data => {
          this.setState({teacherList: [...this.state.teacherList, ...data], loading: false})
        })
      })
  }

  deleteStudent (id) {
    this.setState({loading: true})

    fetch(`http://localhost:3001/students/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'access-control-allow-origin': '*'
      }
    })
      .then(() => {
          this.fetchStudents()
        }
      )
  }

  deleteTeacher (id) {
    this.setState({loading: true})

    fetch(`http://localhost:3001/teachers/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'access-control-allow-origin': '*'
      }
    })
      .then(() => {
          this.fetchTeachers()
        }
      )
  }

  editStudent (student) {
    if (student._id !== this.state.activeStudent)
      this.setState({
        activeStudent: student._id,
        updateValuesStudent: {
          name: student.name,
          surname: student.surname,
          index: student.index,
          password: student.password,
          email: student.email,
        }
      })
    else
      this.setState({
          activeStudent: null
        }
      )
  }

  editTeacher (teacher) {
    if (teacher._id !== this.state.activeTeacher)
      this.setState({
        activeTeacher: teacher._id,
        updateValuesStudent: {
          name: teacher.name,
          surname: teacher.surname,
          index: teacher.index,
          password: teacher.password,
          email: teacher.email,
        }
      })
    else
      this.setState({
          activeTeacher: null
        }
      )
  }

  componentDidMount () {
    this.fetchStudents()
    this.fetchTeachers()
  }

  handleChangePost (e) {
    this.setState({postValuesStudent: {...this.state.postValuesStudent, [e.target.id]: e.target.value}})
  }

  handleChangePostMode (e) {
    this.setState({addStudent: e.target.value})
  }

  handleSubmitPost (e) {
    this.setState({loading: true})

    console.log(this.state.addStudent)

    if(this.state.addStudent) {
      fetch('http://localhost:3001/students', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'access-control-allow-origin': '*'
        },
        body: JSON.stringify(this.state.postValuesStudent)
      })
        .then(() => {
          this.fetchStudents()
          this.setState({
            postValuesStudent: {
              name: '',
              surname: '',
              index: '',
              password: '',
              email: ''
            }
          })
        })
    } else {
      fetch('http://localhost:3001/teachers', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'access-control-allow-origin': '*'
        },
        body: JSON.stringify(this.state.postValuesTeacher)
      })
        .then(() => {
          this.fetchTeachers()
          this.setState({
            postValuesTeacher: {
              name: '',
              surname: '',
              index: '',
              password: '',
              email: ''
            }
          })
        })
    }

    e.preventDefault()
  }

  handleChangeUpdate (e) {
    this.setState({updateValuesStudent: {...this.state.updateValuesStudent, [e.target.id]: e.target.value}})
  }

  handleSubmitUpdate (e) {
    this.setState({loading: true})

    fetch(`http://localhost:3001/teachers/${this.state.activeTeacher}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*'
      },
      body: JSON.stringify(this.state.updateValuesStudent)
    })
      .then(() => {
        this.fetchTeachers()
        this.setState({
          updateValuesStudent: {
            name: '',
            surname: '',
            index: '',
            password: '',
            email: ''
          },
          activeTeacher: false
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
        <div className='col col-4 center'>
          <h2>Student list</h2>
          <ul className='list-group'>
            {this.state.studentList.map(student => {
              return (
                this.state.activeStudent !== student._id ?
                  <li className='list-group-item list-group-item-info' key={student._id}>
                    <h5>Id: {student._id}</h5>
                    <h4>Name: {student.name}</h4>
                    <h4>Surname: {student.surname}</h4>
                    <h4>Index: {student.index}</h4>
                    <h4>Email: {student.email}</h4>
                    <h4>Password: {student.password}</h4>
                    <button onClick={() => this.deleteStudent(student._id)} className='btn btn-danger'>X</button>
                    <button onClick={() => this.editStudent(student)} className='btn btn-info'>Edit</button>
                  </li> : <form onSubmit={this.handleSubmitUpdate}>
                    <label>
                      Name:
                      <input className='form-control' id='name' type='text' value={this.state.updateValuesStudent.name}
                             onChange={this.handleChangeUpdate}/><br/>
                      Surname:
                      <input className='form-control' id='surname' type='text'
                             value={this.state.updateValuesStudent.surname}
                             onChange={this.handleChangeUpdate}/><br/>
                      Password:
                      <input className='form-control' id='password' type='text'
                             value={this.state.updateValuesStudent.password}
                             onChange={this.handleChangeUpdate}/><br/>
                      Index:
                      <input className='form-control' id='index' type='text' value={this.state.updateValuesStudent.index}
                             onChange={this.handleChangeUpdate}/><br/>
                      Email:
                      <input className='form-control' id='email' type='text' value={this.state.updateValuesStudent.email}
                             onChange={this.handleChangeUpdate}/><br/>
                    </label>
                    <br/><input className='btn btn-success' type='submit' value='Submit'/>
                    <button onClick={() => this.editStudent(student)} className='btn btn-info'>Cancel</button>
                  </form>
              )
            })}
          </ul>
        </div>
        <div className='col col-4 center'>
          <h2>Teacher list</h2>
          <ul className='list-group'>
            {this.state.teacherList.map(teacher => {
              return (
                this.state.activeTeacher !== teacher._id ?
                  <li className='list-group-item list-group-item-info' key={teacher._id}>
                    <h5>Id: {teacher._id}</h5>
                    <h4>Name: {teacher.name}</h4>
                    <h4>Surname: {teacher.surname}</h4>
                    <h4>Index: {teacher.index}</h4>
                    <h4>Email: {teacher.email}</h4>
                    <h4>Password: {teacher.password}</h4>
                    <button onClick={() => this.deleteTeacher(teacher._id)} className='btn btn-danger'>X</button>
                    <button onClick={() => this.editTeacher(teacher)} className='btn btn-info'>Edit</button>
                  </li> : <form onSubmit={this.handleSubmitUpdate}>
                    <label>
                      Name:
                      <input className='form-control' id='name' type='text' value={this.state.updateValuesTeacher.name}
                             onChange={this.handleChangeUpdate}/><br/>
                      Surname:
                      <input className='form-control' id='surname' type='text'
                             value={this.state.updateValuesTeacher.surname}
                             onChange={this.handleChangeUpdate}/><br/>
                      Password:
                      <input className='form-control' id='password' type='text'
                             value={this.state.updateValuesTeacher.password}
                             onChange={this.handleChangeUpdate}/><br/>
                      Index:
                      <input className='form-control' id='index' type='text' value={this.state.updateValuesTeacher.index}
                             onChange={this.handleChangeUpdate}/><br/>
                      Email:
                      <input className='form-control' id='email' type='text' value={this.state.updateValuesTeacher.email}
                             onChange={this.handleChangeUpdate}/><br/>
                    </label>
                    <br/><input className='btn btn-success' type='submit' value='Submit'/>
                    <button onClick={() => this.editTeacher(teacher)} className='btn btn-info'>Cancel</button>
                  </form>
              )
            })}
          </ul>
        </div>
        <div className='col col-4 center'>
          <form onSubmit={this.handleSubmitPost}>
            <label>
              Name:
              <input className='form-control' id='name' type='text' value={this.state.postValuesStudent.name}
                     onChange={this.handleChangePost}/><br/>
              Surname:
              <input className='form-control' id='surname' type='text' value={this.state.postValuesStudent.surname}
                     onChange={this.handleChangePost}/><br/>
              Password:
              <input className='form-control' id='password' type='text' value={this.state.postValuesStudent.password}
                     onChange={this.handleChangePost}/><br/>
              Index:
              <input className='form-control' id='index' type='text' value={this.state.postValuesStudent.index}
                     onChange={this.handleChangePost}/><br/>
              Email:
              <input className='form-control' id='email' type='text' value={this.state.postValuesStudent.email}
                     onChange={this.handleChangePost}/><br/>
              Student:
              <select className='form-control' value={this.state.addStudent}
                      onChange={this.handleChangePostMode}>
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

export default Teachers
