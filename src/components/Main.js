import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Users from './Users'
import Panel from './Panel'
import NotFound from './NotFound'
import Subjects from './Subjects'
import SignIn from './SignIn'
import PrivateRoute from './PrivateRoute'
import StudentProfile from './StudentProfile'
import TeacherProfile from './TeacherProfile'

class Main extends Component {
  render () {
    return (
      <div className='container-fluid'>
        <Switch>
          <PrivateRoute exact path='https://frozentear7.github.io/deanery-frontend/' component={Panel}/>
          <PrivateRoute path='https://frozentear7.github.io/deanery-frontend/users' component={Users}/>
          {localStorage.getItem('userMode') === '0' &&
          <PrivateRoute path='https://frozentear7.github.io/deanery-frontend/profile' component={StudentProfile}/>}
          {localStorage.getItem('userMode') === '1' &&
          <PrivateRoute path='https://frozentear7.github.io/deanery-frontend/profile' component={TeacherProfile}/>}
          <PrivateRoute path='https://frozentear7.github.io/deanery-frontend/subjects' component={Subjects}/>
          <Route path='https://frozentear7.github.io/deanery-frontend/signin' component={SignIn}/>
          <Route path='https://frozentear7.github.io/deanery-frontend/' component={NotFound}/>
        </Switch>
      </div>
    )
  }
}

export default Main
