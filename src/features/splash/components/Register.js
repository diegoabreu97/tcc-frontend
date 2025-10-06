import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoEmpresa from '../assets/logoEmpresa.png'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [agreedError, setAgreedError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('O e-mail é obrigatório.');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Por favor, insira um e-mail válido.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('A senha é obrigatória.');
      return false;
    }
    if (password.length < 8) {
      setPasswordError('A senha deve ter no mínimo 8 caracteres.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('As senhas não coincidem.');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(password, confirmPassword);
    
    if (!agreed) {
        setAgreedError('Você deve aceitar os Termos e Condições.');
    } else {
        setAgreedError('');
    }

    if (isEmailValid && isPasswordValid && isConfirmPasswordValid && agreed) {
      alert('Cadastro efetuado com sucesso!');
      // Aqui, você faria a lógica para enviar os dados de registro
    }
  };

  return (
     <div className="slideIn bg-gray-10 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-100">
            <img
          className="mx-auto h-50 w-auto"
          src={logoEmpresa}
          alt="MASI"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Registre-se
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Crie sua conta para começarmos
        </p><br/>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-400 focus:border-teal-400 sm:text-sm"
                  placeholder="Lucas"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Endereço de E-mail
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                  }}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-400 focus:border-teal-400 sm:text-sm"
                  placeholder="name@email.com"
                />
              </div>
              {emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                    validateConfirmPassword(e.target.value, confirmPassword);
                  }}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-teal-400 focus:border-teal-400 sm:text-sm"
                  placeholder="Crie uma senha"
                />
              </div>
              {passwordError && <p className="mt-2 text-sm text-red-600">{passwordError}</p>}
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirmar senha
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    validateConfirmPassword(password, e.target.value);
                  }}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-teal-400 focus:border-teal-400 sm:text-sm"
                  placeholder="Confirmar senha"
                />
              </div>
              {confirmPasswordError && <p className="mt-2 text-sm text-red-600">{confirmPasswordError}</p>}
            </div>

            <div className="flex items-center">
              <input
                id="agreed"
                name="agreed"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label htmlFor="agreed" className="ml-2 block text-sm text-gray-900">
                Eu li e concordo com os 
                <a href="#" className="font-medium text-teal-600 hover:text-teal-500 ml-1">
                  Termos e Condições 
                </a><br/>
                   e com
                <a href="#" className="font-medium text-teal-600 hover:text-teal-500 ml-1">
                  Política de Privacidade.
                </a>
              </label>
            </div>
            {agreedError && <p className="mt-2 text-sm text-red-600">{agreedError}</p>}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Registrar
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">
              Já possui uma conta?
            </span>
            <Link to="/" className="font-medium text-teal-600 hover:text-teal-500 ml-1">
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;