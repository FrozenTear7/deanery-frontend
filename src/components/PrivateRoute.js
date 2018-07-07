import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => {
    return (
      localStorage.getItem('userId')
        ? <Component {...props} />
        : <Redirect to='/deanery-frontend/signin'/>
    )
  }}/>
)

export default PrivateRoute