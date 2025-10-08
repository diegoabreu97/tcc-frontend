import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoEmpresa from '../assets/logoEmpresa.png'

// --- ÍCONES SVG INLINE (Componentes autônomos para evitar dependências externas) ---
// Estes componentes SVG são usados como ícones em todo o formulário.
const IconUser = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>);
const IconMail = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>);
const IconLock = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>);
const IconShield = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>);
const IconCheck = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>);
const IconCircleX = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>);
// --- FIM ÍCONES SVG INLINE ---


// Componente de Mensagem Modal (Substitui o alert() - ESSENCIAL)
const MessageBox = ({ message, type, onClose }) => {
  if (!message) return null;

  const baseClass = "fixed inset-0 flex items-center justify-center p-4 z-50 bg-gray-900 bg-opacity-50 transition-opacity duration-300";
  const boxClass = "bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100";
  const icon = type === 'success' ? <IconCheck className="w-6 h-6 text-green-600" /> : <IconCircleX className="w-6 h-6 text-red-600" />;
  const title = type === 'success' ? 'Sucesso!' : 'Erro!';
  const color = type === 'success' ? 'text-green-600' : 'text-red-600';

  return (
    <div className={baseClass}>
      <div className={boxClass}>
        <div className="flex flex-col items-center space-y-4">
          {icon}
          <h3 className={`text-lg font-bold ${color}`}>{title}</h3>
          <p className="text-gray-700 text-center">{message}</p>
          <button
            onClick={onClose}
            className="mt-4 w-full py-2 px-4 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};


const Register = () => { // Componente principal Register
  // Estado unificado do Formulário (incluindo 'tipo' e campos do seu código original)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    tipo: 'Admin', // INTEGRADO do RegisterForm
    agreed: false
  });

  // Estados de Erro unificados para validação
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agreed: '',
    formSubmit: ''
  });

  // Estado para o Modal de Mensagem
  const [messageBox, setMessageBox] = useState({ message: '', type: 'success' });

  // Função auxiliar para atualizar o estado do formulário
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Atualiza o estado
    setForm(prevForm => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Limpa o erro de termos ao aceitar
    if (name === 'agreed' && checked) {
      setErrors(prevErrors => ({ ...prevErrors, agreed: '' }));
    }

    // Revalida campos de email e senha ao digitar (mantendo a lógica do seu código original)
    if (name === 'email') validateEmail(value);
    if (name === 'password') {
      validatePassword(value);
      validateConfirmPassword(value, form.confirmPassword);
    }
    if (name === 'confirmPassword') validateConfirmPassword(form.password, value);
  };

  // --- LÓGICAS DE VALIDAÇÃO (Idênticas ao seu primeiro código) ---
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setErrors(prev => ({ ...prev, email: 'O e-mail é obrigatório.' }));
      return false;
    }
    if (!emailRegex.test(email)) {
      setErrors(prev => ({ ...prev, email: 'Por favor, insira um e-mail válido.' }));
      return false;
    }
    setErrors(prev => ({ ...prev, email: '' }));
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      setErrors(prev => ({ ...prev, password: 'A senha é obrigatória.' }));
      return false;
    }
    if (password.length < 8) {
      setErrors(prev => ({ ...prev, password: 'A senha deve ter no mínimo 8 caracteres.' }));
      return false;
    }
    setErrors(prev => ({ ...prev, password: '' }));
    return true;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'As senhas não coincidem.' }));
      return false;
    }
    setErrors(prev => ({ ...prev, confirmPassword: '' }));
    return true;
  };
  // --- FIM LÓGICAS DE VALIDAÇÃO ---


  const handleSubmit = (event) => {
    event.preventDefault();

    // Roda todas as validações no submit
    const isEmailValid = validateEmail(form.email);
    const isPasswordValid = validatePassword(form.password);
    const isConfirmPasswordValid = validateConfirmPassword(form.password, form.confirmPassword);

    let isAgreedValid = true;
    if (!form.agreed) {
      setErrors(prev => ({ ...prev, agreed: 'Você deve aceitar os Termos e Condições.' }));
      isAgreedValid = false;
    } else {
      setErrors(prev => ({ ...prev, agreed: '' }));
    }

    if (isEmailValid && isPasswordValid && isConfirmPasswordValid && isAgreedValid) {
      // Lógica de Registro (AGORA INCLUINDO O 'TIPO' DO USUÁRIO)
      console.log('Dados do Registro Enviados:', {
        name: form.name,
        email: form.email,
        tipo: form.tipo, // Campo de perfil do RegisterForm
        password: form.password,
        agreed: form.agreed
      });

      // Exibe mensagem de sucesso (substituindo o alert() do seu código original)
      setMessageBox({
        message: `O usuário ${form.name} foi registrado com sucesso com o perfil de ${form.tipo}!`,
        type: 'success'
      });

      // Limpa o formulário após o sucesso
      setForm({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        tipo: 'Admin',
        agreed: false
      });

    } else {
      setErrors(prev => ({ ...prev, formSubmit: 'Por favor, corrija os erros no formulário antes de prosseguir.' }));
    }
  };

  // Componente de Input Reutilizável (Adiciona os ícones e a estética do Tailwind)
  const CustomInput = ({ id, name, type, placeholder, value, onChange, error, icon: Icon }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 capitalize">
        {/* Usa a primeira palavra do placeholder como label */}
        {placeholder.split(' ')[0]}
      </label>
      <div className="mt-1 relative rounded-lg shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {/* Usa o Icone SVG passado como prop */}
          <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={name}
          required
          value={value}
          onChange={onChange}
          className={`
                        appearance-none block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm 
                        placeholder-gray-400 focus:outline-none sm:text-sm transition duration-150
                        ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-teal-500 focus:border-teal-500'}
                    `}
          placeholder={placeholder}
        />
      </div>
      {error && <p className="mt-2 text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );


  return (
    <div className="slideIn bg-gray-10 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Substitua o src pelo link do logo se ele estiver online, ou pelo caminho local */}
      </div>

      <MessageBox
        message={messageBox.message}
        type={messageBox.type}
        onClose={() => setMessageBox({ message: '' })}
      />

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10 border border-gray-100">
          <img
            className="mx-auto h-50 w-auto"
            src={logoEmpresa}
            alt="MASI Logo Placeholder"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Registre-se
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Crie sua conta para começarmos
          </p>

          <form className="space-y-5 mt-8" onSubmit={handleSubmit}>

            {/* Campo Nome */}
            <CustomInput
              id="name"
              name="name"
              type="text"
              placeholder="Nome Completo"
              value={form.name}
              onChange={handleChange}
              error={null}
              icon={IconUser}
            />

            {/* Campo E-mail */}
            <CustomInput
              id="email"
              name="email"
              type="email"
              placeholder="Endereço de E-mail"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              icon={IconMail}
            />

            {/* Campo Senha */}
            <CustomInput
              id="password"
              name="password"
              type="password"
              placeholder="Crie sua senha"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              icon={IconLock}
            />

            {/* Campo Confirmar Senha */}
            <CustomInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirmar Senha"
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              icon={IconLock}
            />

            {/* Campo de Seleção de Tipo/Role (INTEGRADO DO RegisterForm) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center">
                  <IconShield className="h-5 w-5 text-gray-400 mr-2" />
                  <span>Selecione seu Perfil</span>
                </div>
              </label>
              <div className="mt-1">
                <select
                  id="tipo"
                  name="tipo"
                  value={form.tipo}
                  onChange={handleChange}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm appearance-none transition duration-150"
                >
                  <option value="Admin">Admin</option>
                  <option value="Standard">Standard</option>
                  <option value="Guest">Guest</option>
                </select>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Perfil atual selecionado: <span className="font-semibold text-teal-600">{form.tipo}</span>
              </p>
            </div>

            {/* Checkbox de Termos e Condições */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreed"
                  name="agreed"
                  type="checkbox"
                  checked={form.agreed}
                  onChange={handleChange}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreed" className="font-medium text-gray-900 leading-tight">
                  Eu li e concordo com os
                  <a href="#" className="font-medium text-teal-600 hover:text-teal-500 ml-1">
                    Termos e Condições
                  </a> e com a
                  <a href="#" className="font-medium text-teal-600 hover:text-teal-500 ml-1">
                    Política de Privacidade
                  </a>.
                </label>
                {errors.agreed && <p className="mt-1 text-xs text-red-600 font-medium">{errors.agreed}</p>}
              </div>
            </div>


            {/* Botão de Registro */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150"
              >
                Registrar
              </button>
              {errors.formSubmit && <p className="mt-3 text-sm text-center text-red-600 font-medium">{errors.formSubmit}</p>}
            </div>
          </form>

          {/* Link para Login (Substituído o <Link> por <a> + console.log) */}
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">
              Já possui uma conta?
            </span>
            <a
              href="#"
              className="font-medium text-teal-600 hover:text-teal-500 ml-1"
              onClick={() => console.log('Ação: Navegar para a tela de Login')}
            >
              <Link to="/" className="font-medium text-teal-600 hover:text-teal-500 ml-1">
                Entrar
              </Link>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
