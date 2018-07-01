import React, { Component } from 'react'

class Header extends Component {
  render () {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">Navbar</a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/users">Users</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/subjects">Subjects</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default Header
