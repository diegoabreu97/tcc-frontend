import React, { useState } from 'react';
import './LoginForm.css'
import LoginService from '../services/LoginService';
import useAuthStore from '../../../shared/store/auth-store';
import { jwtDecode } from 'jwt-decode';
import logoEmpresa from '../assets/logoEmpresa.png'
import { Link, useNavigate } from 'react-router-dom';
import useUserStore from '../../../shared/store/user-store';



// O componente pode receber a prop goToRegister, como no código 1
const LoginForm = ({ goToRegister }) => {
    // --- HOOKS E STORES ---
    const navigate = useNavigate();
    const { setAuthData, fcmToken } = useAuthStore();
    const { setMe } = useUserStore();

    // --- ESTADOS ---
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('Fraca');
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    // --- FUNÇÕES DE VALIDAÇÃO ---
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

    const redirectTo =
    new URLSearchParams(location.search).get('redirect') || '/home';

    const refresh = async() => {
      const token = localStorage.getItem('accessToken');
      if (token) {
            // Se já tem token, decodifica e atualiza o estado global
            // Isso garante que o estado persista ao recarregar a página
            try {
              const me = await LoginService.me();
              const userData = jwtDecode(token);
              setMe(me.role, me);
              setAuthData(userData); // Atualiza o auth store
              navigate(redirectTo, { replace: true });
            } catch (e) {
              // Token inválido, limpa o token armazenado
              localStorage.removeItem('accessToken');
            }
        }
    }

    const checkPasswordStrength = (password) => {
        if (password.length < 8) {
            setPasswordStrength('Fraca');
            return 'Fraca';
        }

        const hasLetters = /[a-zA-Z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

        if (hasLetters && hasNumbers && hasSpecial) {
            setPasswordStrength('Forte');
        } else if (hasLetters && hasNumbers) {
            setPasswordStrength('Média');
        } else {
            setPasswordStrength('Fraca');
        }
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

    // --- FUNÇÃO DE SUBMISSÃO UNIFICADA ---
    const submitForm = async (e) => {
        e.preventDefault();
        setApiError(''); 

        // 1. Validação local do formulário
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        if (!isEmailValid || !isPasswordValid) {
            return;
        }

        setIsLoading(true); 

        try {
            const loginCredentials = { email, password };
            
            // 2. Chamada de login
            const responseData = await LoginService.login(loginCredentials);
            console.log(responseData);

            // 3. Processa o token
            const receivedTokenFromBackend = responseData.token;
            localStorage.setItem("accessToken", receivedTokenFromBackend);

            const decodedUser = jwtDecode(receivedTokenFromBackend);
            setAuthData(receivedTokenFromBackend, decodedUser);
            console.log('Dados do usuário decodificados e armazenados:', decodedUser);

            // 4. Envia o FCM Token (se disponível)
            if (fcmToken) {
                await LoginService.sendToken({ fcmToken });
            } else {
                console.log("FCM Token não disponível, pulando o envio.");
            }
            
            // 5. Obtém e armazena os dados "me"
            const me = await LoginService.me();
            console.log(me)
            setMe(me.tipo, me);

            console.log('Dados do usuário "me" armazenados.');

            // 6. Redirecionamento
            navigate("/home"); // Descomente para navegar após o sucesso

        } catch (error) {
            // 7. Captura e exibe o erro
            console.error('Erro de login capturado no componente:', error.message);
            // Uso de optional chaining para acessar a mensagem de erro do backend com segurança
            const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido ao fazer login.';
            setApiError(errorMessage);
        } finally {
            // 8. Finaliza o carregamento
            setIsLoading(false);
        }
    };

    // --- JSX (RETURN) INTEGRADO ---
    return (
        <div className="slideIn bg-gray-10 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                {/* O logo e título estão dentro do form, mas é comum colocá-los acima. 
                Aqui mantivemos a estrutura do seu primeiro código fornecido. */}
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-100">
                    <form className="space-y-6" onSubmit={submitForm}>
                        <div>
                            <img
                                className="mx-auto h-50 w-auto"
                                src={logoEmpresa}
                                alt="MASI Logo Placeholder"
                            />

                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Bem vindo!
                            </h2><br /><br />

                            {/* Campo de Email */}
                            <label htmlFor="email" className="sr-only">
                                Endereço de Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    validateEmail(e.target.value);
                                }}
                                onBlur={() => validateEmail(email)}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                placeholder="Endereço de Email"
                                disabled={isLoading}
                            />
                            {emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
                        </div>

                        <div>
                            {/* Campo de Senha */}
                            <label htmlFor="password" className="sr-only">
                                Senha
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        checkPasswordStrength(e.target.value);
                                        validatePassword(e.target.value);
                                    }}
                                    onBlur={() => validatePassword(password)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    placeholder="Senha"
                                    disabled={isLoading}
                                />
                                {/* Adicione seu ícone SVG de visibilidade de senha aqui se necessário */}
                            </div>
                            {passwordError ? (
                                <p className="mt-2 text-sm text-red-600">{passwordError}</p>
                            ) : (
                                <p className={`mt-2 text-sm ${passwordStrength === 'Forte' ? 'text-green-600' : passwordStrength === 'Média' ? 'text-yellow-600' : 'text-red-600'}`}>
                                    Força da senha: {passwordStrength}
                                </p>
                            )}
                        </div>

                        {/* EXIBIÇÃO DE ERRO DA API */}
                        {apiError && (
                            <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md text-sm text-center font-medium">
                                {apiError}
                            </div>
                        )}

                        {/* Link de Esqueceu a Senha */}
                        <div className="flex items-center justify-end">
                            <div className="text-sm">
                                <Link to={"/forgot-password"} className="font-medium text-teal-600 hover:text-teal-500">
                                    Esqueceu a senha?
                                </Link>
                            </div>
                        </div>

                        {/* Botão de Login */}
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition duration-150
                                    ${isLoading ? 'bg-teal-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'}`
                                }
                            >
                                {isLoading ? (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    'Login'
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Link de Registro */}
                    <div className="mt-6 text-center text-sm">
                        <span className="text-gray-600">
                            Não possui conta?
                        </span>
                        {/* Se a prop goToRegister for usada, você pode alternar o link aqui */}
                        <span to="/register" onClick={goToRegister} className="font-medium text-teal-600 hover:text-teal-500 ml-1">
                            Registre-se agora
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;