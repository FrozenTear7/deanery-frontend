import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => {
    console.log(props)
    if (localStorage.getItem('userId')) {
      if (localStorage.getItem('userMode') == 0 && (
        props.location.pathname === '/deanery-frontend/users'
          || props.location.pathname === '/deanery-frontend/subjects')) {
        return <Redirect to='/deanery-frontend/'/>
      } else {
        return <Component {...props} />
      }
    } else {
      return <Redirect to='/deanery-frontend/signin'/>
    }
  }}/>
)

export default PrivateRoute