import React, { useState } from 'react';
import Fundologin from './Fundologin.png'; // Altere o caminho se a sua imagem estiver em outro local
import logoEmpresa from './logoEmpresa.png'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('Fraca');
    const [passwordError, setPasswordError] = useState('');

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

    const handleSubmit = (event) => {
        event.preventDefault();
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        if (isEmailValid && isPasswordValid) {
            // Lógica de autenticação aqui
            alert('Login efetuado com sucesso!');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
            style={{ backgroundImage: `url(${Fundologin})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                {/* Substitua o src pelo link do logo se ele estiver online, ou pelo caminho local */}
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Bem vindo!
                            </h2><br/>
                            <img
                                className="mx-auto h-50 w-auto"
                                src={logoEmpresa} // Use a variável 'logo' aqui
                                alt="MASI - Mapeamento Atendimento de Saúde em Indaiatuba"
                            /><br/><br/>
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
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                placeholder="Endereço de Email"
                            />
                            {emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
                        </div>

                        <div>
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
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    placeholder="Senha"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                                        />
                                        <path
                                            d="M10 0a10 10 0 100 20 10 10 0 000-20zM2 10a8 8 0 1116 0A8 8 0 012 10z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            {passwordError ? (
                                <p className="mt-2 text-sm text-red-600">{passwordError}</p>
                            ) : (
                                <p className={`mt-2 text-sm ${passwordStrength === 'Forte' ? 'text-green-600' : passwordStrength === 'Média' ? 'text-yellow-600' : 'text-red-600'}`}>
                                    Força da senha: {passwordStrength}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-end">
                            <div className="text-sm">
                                <a href="#" className="font-medium text-teal-600 hover:text-teal-500">
                                    Esqueceu a senha?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-gray-600">
                            Não possui conta?
                        </span>
                        <a href="#" className="font-medium text-teal-600 hover:text-teal-500 ml-1">
                            Registre-se agora
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;