import React, { Component } from 'react'

class UserCard extends Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    return (
      <div>
        <img className='center rounded-circle' alt='Avatar'
             src={this.props.user.avatar ? this.props.user.avatar : 'http://www.astronomycast.com/wp-content/uploads/2016/03/question-mark.jpg'}
             style={{width: 150, height: 150, marginTop: 20}}/>
        <div className='card-body'>
          <h3><i className='fa fa-user-circle card-title'/> {this.props.user.name + ' ' + this.props.user.surname}
          </h3>
          <h4><i className='fa fa-book card-text'/> {this.props.user.index}</h4>
          <h4><i className='fa fa-envelope-square card-text'/> {this.props.user.email}</h4>
        </div>
      </div>
    )
  }
}

export default UserCard
