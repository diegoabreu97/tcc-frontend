import React, {useRef, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/auth-store';


const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuthStore(); // Obtém os dados do usuário do Zustand

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-white-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Seção Esquerda - Links de Navegação */}
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-400 transition duration-300">
            Home
          </Link>
          <Link to="/produtos" className="text-white hover:text-gray-400 transition duration-300">
            Produtos
          </Link>
          <Link to="/carrinho" className="text-white hover:text-gray-400 transition duration-300">
            Carrinho
          </Link>
        </div>

        {/* Seção Direita - Perfil do Usuário */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="text-center flex-1">
          <span className="text-gray-500 text-sm">Olá,</span>
          <p className="font-semibold text-lg text-gray-800">{user.name}</p>
        </div>
          ) : (
            <Link to="/login" className="text-white hover:text-gray-400 transition duration-300">
              Login
            </Link>
          )}

          
        {/* Menu Dropdown Condicional */}
          {isDropdownOpen && user && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <div className='mt-12  text-sm text-gray-700 hover:bg-gray-100'>
              <span>Você entrou como {user.accessLevel}</span>
              <Link to="/perfil" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Mostrar Perfil
              </Link>
              <span  onClick={() => handleLogout()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Logout
              </span>
             
              </div>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;