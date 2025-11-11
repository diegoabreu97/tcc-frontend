// src/LoginForm.js
import React from 'react';
import { MdEmail, MdHome, MdLock, MdPerson, MdPlace, MdTypeSpecimen } from 'react-icons/md';
import './LoginForm.css'
import LoginService from '../services/LoginService';
import { useAuth } from '../../../shared/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../shared/store/auth-store';
import { jwtDecode } from 'jwt-decode';
import useUserStore from '../../../shared/store/user-store';
import FormComponent from '../../../shared/components/FormComponent';
import logoEmpresa from '../assets/logoEmpresa.png'



const RegisterComplete = ({ goBackToRegister, form, setForm }) => {

  const navigate = useNavigate();

  //const { login } = useAuth()
  const { setAuthData } = useAuthStore();

  const { setMe } = useUserStore();

  const [errorMessages, setErrorMessages] = React.useState({})





  const submitForm = async (e) => {
    e.preventDefault();

    // Isso eu pego do backend
    const responseData = await LoginService.register(form)



  }

  const adminForm = [



  ]

  const userForm = [
    {
      fieldName: "cpf", type: "text", placeholder: "Insira seu CPF",
      errorMessages,
      form, setForm: setForm, icon: <MdPerson className="text-gray-400 mr-2" size={20} />
    },

    {
      fieldName: "cidade", type: "text", placeholder: "Cidade",
      errorMessages,
      form, setForm: setForm, icon: <MdHome className="text-gray-400 mr-2" size={20} />
    },

    {
      fieldName: "cep", type: "text", placeholder: "Insira seu CEP",
      errorMessages,
      form, setForm: setForm, icon: <MdHome className="text-gray-400 mr-2" size={20} />
    },


    {
      fieldName: "numero", type: "number", placeholder: "N° da residência",
      errorMessages,
      form, setForm: setForm, icon: <MdHome className="text-gray-400 mr-2" size={20} />
    },

    {
      fieldName: "extra", type: "text", placeholder: "Insira o Complemento",
      errorMessages,
      form, setForm: setForm, icon: <MdHome className="text-gray-400 mr-2" size={20} />
    },

  ]


  const ubsAdminForm = [
    {
      fieldName: "codigoUbs", type: "text", placeholder: "Insira o codigo da Ubs",
      errorMessages,
      form, setForm: setForm, icon: <MdPlace className="text-gray-400 mr-2" size={20} />
    },


  ]


  return (
    <div className="flex slideIn items-center justify-center  bg-gray-100">
      <div className="bg-white  p-8 rounded-lg shadow-xl w-full max-w-sm animate-slideIn">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800"></h1>
        <img
          className="mx-auto h-50 w-auto"
          src={logoEmpresa}
          alt="MASI Logo Placeholder"
        />

        <form>


          {form.tipo == "UbsAdmin" && ubsAdminForm.map(e => (
            FormComponent(e)
          ))}
          {form.tipo == "User" && userForm.map(e => (
            FormComponent(e)
          ))}



          {/* Botão de Registro */}
          <div className="flex items-center justify-center mb-4">
            <button onClick={submitForm}
              className="w-full bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-200"
              type="button"
            >
              Registre-se
            </button>
          </div>

          {/* Link para Cadastro */}
          <div className="flex items-center justify-center">
            <a onClick={goBackToRegister}
              className="w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-200"
              href="#"
            >
              Retornar à página anterior
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterComplete;