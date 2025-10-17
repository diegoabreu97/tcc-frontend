
import React from 'react';
import LoginForm from './components/LoginForm';
import Fundologin from './assets/Fundologin.png'
import ForgotPassword from './components/ForgotPassword';
import Register from './components/Register';


const SplashScreen = () => {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Fundologin})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
    >
      {/* Overlay com opacidade de 0.5 */}
      <div className="absolute inset-0 bg-white opacity-80 z-1"></div>

      {/* Formulário sobreposto com z-index para ficar acima do overlay */}
      <div className="relative z-50 w-1000 z-50" >
        <LoginForm />
      </div>  
    </div>
  );
};

export default SplashScreen;