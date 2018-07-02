import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Users from './Users'
import Panel from './Panel'
import NotFound from './NotFound'
import Subjects from './Subjects'
import SignIn from './SignIn'

class Main extends Component {
  render () {
    return (
      <div className='container-fluid'>
        <Switch>
          <Route exact path='/' component={Panel}/>
          <Route path='/users' component={Users}/>
          <Route path='/subjects' component={Subjects}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/' component={NotFound}/>
        </Switch>
      </div>
    )
  }
}

export default Main
