import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Users from './Users'
import Panel from './Panel'
import NotFound from './NotFound'
import Subjects from './Subjects'
import SignIn from './SignIn'
import PrivateRoute from './PrivateRoute'

class Main extends Component {
  render () {
    return (
      <div className='container-fluid'>
        <Switch>
          <PrivateRoute exact path='/' component={Panel}/>
          <PrivateRoute path='/users' component={Users}/>
          <PrivateRoute path='/subjects' component={Subjects}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/' component={NotFound}/>
        </Switch>
      </div>
    )
  }
}

export default Main
