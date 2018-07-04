import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Header extends Component {
  render () {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">Navbar</a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {!localStorage.getItem('isStudent') && <li className="nav-item">
                <a className="nav-link" href="/users">Users</a>
              </li>}
              <li className="nav-item">
                <a className="nav-link" href="/profile">Profile</a>
              </li>
              {!localStorage.getItem('isStudent') && <li className="nav-item">
                <a className="nav-link" href="/subjects">Subjects</a>
              </li>}
            </ul>
          </div>
          {localStorage.getItem('userId') &&
          <div>
            Signed in as: {localStorage.getItem('name')}
            <button onClick={() => {
              this.props.history.push('/signin')
              localStorage.removeItem('userId')
              localStorage.removeItem('isStudent')
              localStorage.removeItem('name')
            }}>Sign out
            </button>
          </div>}
        </nav>
      </div>
    )
  }
}

export default withRouter(Header)
