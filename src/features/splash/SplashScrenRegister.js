import React from 'react';
import Fundologin from './assets/Fundologin.png'
import Register from './components/Register';


const SplashScreenRegister = () => {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Fundologin})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
    >
      {/* Overlay com opacidade de 0.5 */}
      <div className="absolute inset-0 bg-white opacity-80 z-1"></div>

      {/* Formulário sobreposto com z-index para ficar acima do overlay */}
      <div className="relative z-50 w-1000 z-50" >
        <Register />
      </div>  
    </div>
  );
};

export default SplashScreenRegister;