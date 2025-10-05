import React from 'react'
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/auth-store';

const PrivateRoute = ({children}) => {
  //const {isAuthenticated } = useAuth();
  const {user} = useAuthStore();
  return (

    user != null ? children : <Navigate to={"/login"} replace />
  
  )
}

export default PrivateRoute