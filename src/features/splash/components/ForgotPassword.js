import React, { useState } from 'react';
import { Link} from 'react-router-dom'; // Importei BrowserRouter
import logoEmpresa from '../assets/logoEmpresa.png'

// Este é o componente real, que contém toda a lógica e UI.
const ForgotPassword = () => { 
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        setError('');
        setMessage('');

        if (!email) {
            setError('Por favor, insira seu endereço de e-mail.');
            return;
        }

        setLoading(true);
        
        try {
            // Simulação de envio de e-mail de recuperação.
            // Aqui entraria a lógica real de chamada à API para recuperação de senha.
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            
            setMessage('Se o e-mail estiver registado, você receberá instruções para redefinir sua senha em instantes.');
            setEmail('');
        } catch (err) {
            setError('Ocorreu um erro. Tente novamente ou entre em contato com o suporte.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="slideIn bg-gray-10 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                    
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-100">
                    <img
                        // Ajustando classes para centralizar a imagem placeholder
                        className="mx-auto h-50 w-auto" 
                        src={logoEmpresa}
                        alt="MASI Logo"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Esqueceu sua senha?
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Digite seu e-mail abaixo para redefini-la.
                    </p>
                    
                    {/* Mensagens de feedback */}
                    {message && (
                        <div className="mt-4 p-3 rounded-md bg-green-100 text-green-800 text-sm font-medium border border-green-200">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="mt-4 p-3 rounded-md bg-red-100 text-red-800 text-sm font-medium border border-red-200">
                            {error}
                        </div>
                    )}

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-400 focus:border-teal-400 sm:text-sm"
                                    placeholder="name@email.com"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition duration-150 ease-in-out ${
                                    loading 
                                        ? 'bg-teal-400 cursor-not-allowed' 
                                        : 'bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'
                                }`}
                            >
                                {loading ? (
                                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    'Enviar link de redefinição'
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <Link to="/" className="font-medium text-teal-600 hover:text-teal-500 transition duration-150 ease-in-out">
                            Lembrei! Voltar para o Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
