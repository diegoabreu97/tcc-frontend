// src/LoginForm.js
import React from 'react';
import { MdEmail, MdHome, MdLock, MdPerson, MdTypeSpecimen } from 'react-icons/md';
import './LoginForm.css'
import LoginService from '../services/LoginService';
import { useAuth } from '../../../shared/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../shared/store/auth-store';
import { jwtDecode } from 'jwt-decode';
import useUserStore from '../../../shared/store/user-store';
import FormComponent from '../../../shared/components/FormComponent';



const RegisterComplete = ({ goBackToRegister, form, setForm }) => {

  const navigate = useNavigate();

  //const { login } = useAuth()
  const { setAuthData } = useAuthStore();

  const { setMe } = useUserStore();

  const [errorMessages, setErrorMessages] = React.useState({})

  
  


  const submitForm = async (e) => {
    e.preventDefault();
/*
    // Isso eu pego do backend
    const responseData = await LoginService.register(form)
    const receivedTokenFromBackend = responseData.token;
    localStorage.setItem("accessToken", receivedTokenFromBackend)

    const decodedUser = jwtDecode(receivedTokenFromBackend);
    // Armazena o token e as informações decodificadas no Zustand
    setAuthData(receivedTokenFromBackend, decodedUser);
    console.log('Dados do usuário decodificados e armazenados:', decodedUser);

    const me = await LoginService.me();
    setMe(me.tipo, me)
    */


  }

  const adminForm = [
    { fieldName: "cnpj", type: "text",  placeholder: "Insert your cnpj",
       errorMessages,
       form, setForm: setForm, icon: <MdPerson className="text-gray-400 mr-2" size={20} /> },

    { fieldName: "nomeDaEmpresa", type: "text",  placeholder: "Insert your Company Name",
       errorMessages,
       form, setForm: setForm, icon: <MdEmail className="text-gray-400 mr-2" size={20} /> },

    { fieldName: "ramoAtuacao", type: "text",  placeholder: "Insert your business area",
       errorMessages,
       form, setForm: setForm, icon: <MdLock className="text-gray-400 mr-2" size={20} /> },

  ]

   const guestForm = [
    { fieldName: "cpfOrCnpj", type: "text",  placeholder: "Insert your cpfOrCnpj",
       errorMessages,
       form, setForm: setForm, icon: <MdPerson className="text-gray-400 mr-2" size={20} /> },

    { fieldName: "city", type: "text",  placeholder: "Insert your City",
       errorMessages,
       form, setForm: setForm, icon: <MdHome className="text-gray-400 mr-2" size={20} /> },

    { fieldName: "zipCode", type: "text",  placeholder: "Insert your zip code",
       errorMessages,
       form, setForm: setForm, icon: <MdHome className="text-gray-400 mr-2" size={20} /> },


       { fieldName: "number", type: "number",  placeholder: "Insert your address number",
       errorMessages,
       form, setForm: setForm, icon: <MdHome className="text-gray-400 mr-2" size={20} /> },

  ]


  const standardForm = [
    { fieldName: "cnpj", type: "text",  placeholder: "Insert your cnpj",
       errorMessages,
       form, setForm: setForm, icon: <MdPerson className="text-gray-400 mr-2" size={20} /> },

    { fieldName: "nomeDaEmpresa", type: "text",  placeholder: "Insert your Company Name",
       errorMessages,
       form, setForm: setForm, icon: <MdEmail className="text-gray-400 mr-2" size={20} /> },

    { fieldName: "ramoAtuacao", type: "text",  placeholder: "Insert your business area",
       errorMessages,
       form, setForm: setForm, icon: <MdLock className="text-gray-400 mr-2" size={20} /> },

  ]


  return (
    <div className="flex slideIn items-center justify-center  bg-gray-100">
      <div className="bg-white  p-8 rounded-lg shadow-xl w-full max-w-sm animate-slideIn">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">ESTOQUE - FRONT</h1>


        <form>

          {form.tipo == "Admin" && adminForm.map(e => (
            FormComponent(e)
          ))}
          {form.tipo == "Standard" && standardForm.map(e => (
            FormComponent(e)
          ))}
          {form.tipo == "Guest" && guestForm.map(e => (
            FormComponent(e)
          ))}



          {/* Botão de Registro */}
          <div className="flex items-center justify-center mb-4">
            <button onClick={submitForm}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-200"
              type="button"
            >
              REGISTER
            </button>
          </div>

          {/* Link para Cadastro */}
          <div className="flex items-center justify-center">
            <a onClick={goBackToRegister}
              className="w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-200"
              href="#"
            >
              VOLTAR PARA REGISTER
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterComplete;