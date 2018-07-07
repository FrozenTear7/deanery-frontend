import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => {
    return (
      localStorage.getItem('userId')
        ? <Component {...props} />
        : <Redirect to='https://frozentear7.github.io/deanery-frontend/signin'/>
    )
  }}/>
)

export default PrivateRoute