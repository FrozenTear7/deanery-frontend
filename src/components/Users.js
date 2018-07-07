import React, { Component } from 'react'
import UserList from './UserList'

class Teachers extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='row'>
        <div className='col col-6 center'>
          <UserList mode='students'/>
        </div>
        <div className='col col-6 center'>
          <UserList mode='teachers'/>
        </div>
      </div>
    )
  }
}

export default Teachers
