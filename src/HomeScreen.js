import React from 'react';

const HomeScreen = ({ userName = 'Lucas', userProfilePic, vaccineBanner, yogaCard, exerciseReminder, meditationReminder, skinCareReminder }) => {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white shadow-sm">
        <button className="text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="text-center flex-1">
          <span className="text-gray-500 text-sm">Olá,</span>
          <p className="font-semibold text-lg text-gray-800">{userName}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <img
            className="h-8 w-8 rounded-full"
            src={userProfilePic || 'https://via.placeholder.com/150'}
            alt="User Profile"
          />
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Seção Comunicados */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Comunicados</h2>
          <div className="flex space-x-2 mb-4 overflow-x-auto">
            <button className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
              Comunicados
            </button>
            <button className="bg-white text-gray-600 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
              UBSS
            </button>
            <button className="bg-white text-gray-600 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
              Vacinas
            </button>
            <button className="bg-white text-gray-600 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
              Postos de saúde
            </button>
          </div>
          <div className="relative mb-4">
            <img
              src={vaccineBanner || 'https://via.placeholder.com/600x300'}
              alt="Vacina é amor e cuidado"
              className="w-full rounded-xl"
            />
            {/* Aqui você pode adicionar um overlay com texto se a imagem for apenas de fundo */}
          </div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-gray-600">Conscientização contra o tabaco</h3>
            <a href="#" className="text-sm text-teal-600">Saiba mais</a>
          </div>
          <div className="bg-white rounded-lg p-3 shadow flex items-center space-x-4">
            <img
              className="h-16 w-16 rounded-lg"
              src={yogaCard || 'https://via.placeholder.com/150'}
              alt="Yoga Class"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">Yoga Class</h4>
              <p className="text-sm text-gray-500">Secretaria Municipal de Saúde</p>
            </div>
            <button className="text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Seção Lembretes */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Lembretes</h2>
            <a href="#" className="text-sm text-teal-600">Saiba mais</a>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {/* Card 1 */}
            <div className="flex-shrink-0 w-44 bg-blue-100 rounded-lg shadow-sm overflow-hidden text-center">
              <p className="p-3 text-sm font-semibold text-gray-800">Se exercite!!</p>
              <img src={exerciseReminder || 'https://via.placeholder.com/200x300'} alt="Exercite-se" className="w-full h-auto" />
            </div>
            {/* Card 2 */}
            <div className="flex-shrink-0 w-44 bg-gray-100 rounded-lg shadow-sm overflow-hidden text-center">
              <p className="p-3 text-sm font-semibold text-gray-800">Seu corpo deve receber atenção!!</p>
              <img src={meditationReminder || 'https://via.placeholder.com/200x300'} alt="Meditação" className="w-full h-auto" />
            </div>
            {/* Card 3 (Exemplo) */}
            <div className="flex-shrink-0 w-44 bg-orange-100 rounded-lg shadow-sm overflow-hidden text-center">
              <p className="p-3 text-sm font-semibold text-gray-800">Cuide da sua pele</p>
              <img src={skinCareReminder || 'https://via.placeholder.com/200x300'} alt="Cuidados com a pele" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </main>

      {/* Tab Bar Inferior */}
      <nav className="fixed bottom-0 left-0 w-full bg-white flex justify-around items-center p-3 shadow-top">
        <button className="flex flex-col items-center text-teal-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span className="text-xs mt-1">Início</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.5-10.036a9 9 0 010 12.072m-.707 1.25a.5.5 0 01-.707 0l-1.414-1.414a.5.5 0 010-.707l1.414-1.414a.5.5 0 01.707 0l1.414 1.414a.5.5 0 010 .707l-1.414 1.414z" />
          </svg>
          <span className="text-xs mt-1">Leitura de Tela</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-xs mt-1">Mapa</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8h12a2 2 0 002-2v-3a2 2 0 00-2-2H8a2 2 0 00-2 2v3a2 2 0 002 2zm0 0V9a2 2 0 012-2h4a2 2 0 012 2v2" />
          </svg>
          <span className="text-xs mt-1">Settings</span>
        </button>
      </nav>
    </div>
  );
};

export default HomeScreen;