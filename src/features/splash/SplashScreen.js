
import React from 'react';
import LoginForm from './components/LoginForm';
import Fundologin from './assets/Fundologin.png'
import ForgotPassword from './components/ForgotPassword';
import Register from './components/Register';
import RegisterComplete from './components/RegisterComplete';


const SplashScreen = () => {
   const [form, setForm] = React.useState({tipo: ""})
   const [isRegister, setIsRegister] = React.useState(false)

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Fundologin})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
    >
      {/* Overlay com opacidade de 0.5 */}
      <div className="absolute inset-0 bg-white opacity-80 z-1"></div>

      {/* Formulário sobreposto com z-index para ficar acima do overlay */}
      <div className="relative z-50 w-1000 z-50" >
         {!isRegister ?<LoginForm goToRegister={() => setIsRegister(true)} /> :
        
        form.tipo == "" ? <Register goToLogin={() => setIsRegister(false)} goToCompleteRegistration={setForm} /> 
      : <RegisterComplete goBackToRegister={() => setForm({...form, tipo: ""})} setForm={setForm} form={form}  type={form.tipo} /> }
      </div>  
    </div>
  );
};

export default SplashScreen;