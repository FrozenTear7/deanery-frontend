import React, { Component } from 'react'
import fetchWithToken from '../helpers/fetchWithToken'

class Subjects extends Component {
  constructor (props) {
    super(props)
    this.state = {
      postValues: {
        name: '',
      },
      updateValues: {
        name: '',
      },
      subjectList: [],
      loading: false,
      activeSubject: null
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
        'access-control-allow-origin': '*'
      }
    })
      .then(response => {
        response.json().then(data => {
          this.setState({subjectList: data, loading: false})
        })
      })
  }

  deleteSubject (id) {
    this.setState({loading: true})

    fetchWithToken(`http://localhost:3001/subjects/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'access-control-allow-origin': '*'
      }
    })
      .then(() => {
          this.fetchSubjects()
        }
      )
  }

  editSubject (subject) {
    if (subject._id !== this.state.activeSubject)
      this.setState({
        activeSubject: subject._id,
        updateValues: {
          name: subject.name,
        }
      })
    else
      this.setState({
          activeSubject: null
        }
      )
  }

  componentDidMount () {
    this.fetchSubjects()
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
        'access-control-allow-origin': '*'
      },
      body: JSON.stringify(this.state.postValues)
    })
      .then(() => {
        this.fetchSubjects()
        this.setState({
          postValues: {
            name: '',
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

    fetchWithToken(`http://localhost:3001/subjects/${this.state.activeSubject}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*'
      },
      body: JSON.stringify(this.state.updateValues)
    })
      .then(() => {
        this.fetchSubjects()
        this.setState({
          updateValues: {
            name: '',
          },
          activeSubject: false
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
        <div className='col col-6 center'>
          <h2>Subject list</h2>
          <ul className='list-group'>
            {this.state.subjectList.map(subject => {
              return (
                this.state.activeSubject !== subject._id ?
                  <li className='list-group-item list-group-item-info' key={subject._id}>
                    <h5>Id: {subject._id}</h5>
                    <h4>Name: {subject.name}</h4>
                    <button onClick={() => this.deleteSubject(subject._id)} className='btn btn-danger'>X</button>
                    <button onClick={() => this.editSubject(subject)} className='btn btn-info'>Edit</button>
                  </li> : <form onSubmit={this.handleSubmitUpdate}>
                    <label>
                      Name:
                      <input className='form-control' id='name' type='text' value={this.state.updateValues.name}
                             onChange={this.handleChangeUpdate}/><br/>
                    </label>
                    <br/><input className='btn btn-success' type='submit' value='Submit'/>
                    <button onClick={() => this.editSubject(subject)} className='btn btn-info'>Cancel</button>
                  </form>
              )
            })}
          </ul>
        </div>
        <div className='col col-6 center'>
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
