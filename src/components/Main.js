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
          <PrivateRoute exact path='/' component={Panel}/>
          <PrivateRoute path='/users' component={Users}/>
          {localStorage.getItem('userMode') === '0' && <PrivateRoute path='/profile' component={StudentProfile}/>}
          {localStorage.getItem('userMode') === '1' && <PrivateRoute path='/profile' component={TeacherProfile}/>}
          <PrivateRoute path='/subjects' component={Subjects}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/' component={NotFound}/>
        </Switch>
      </div>
    )
  }
}

export default Main
