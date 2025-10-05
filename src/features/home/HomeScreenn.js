import React from 'react'
import { useAuth } from '../../shared/context/AuthContext'
import useAuthStore from '../../shared/store/auth-store';

const HomeScreen = () => {
  //const {logout} = useAuth()
  const {logout} = useAuthStore();

  return (
    <div>
      HomeScreen <br  />
    </div>
  )
}

export default HomeScreen
