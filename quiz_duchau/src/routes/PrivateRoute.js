import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = (props) => {
    const isAuthenticated = useSelector(state=>state.user.isAuthenticated);
  
    if(!isAuthenticated) {
       return <Navigate to='/login'></Navigate>   
    }
  return (
    <div>
        {props.children}
    </div>
  )
}

export default PrivateRoute
