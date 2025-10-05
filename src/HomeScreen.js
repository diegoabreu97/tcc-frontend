import React, { useState } from 'react';

// Componente da tela de consulta de vacinas
const VaccineConsultation = () => {
  const allVaccines = [
    { name: 'BCG', description: 'Protege contra formas graves de tuberculose. É uma vacina essencial do calendário infantil.', ageGroup: 'Recém-nascidos', doseInterval: 'Dose única', doses: 1, quantity: 1 },
    { name: 'Hepatite B', description: 'Previne contra a infecção pelo vírus da Hepatite B, que pode causar doença hepática grave.', ageGroup: 'Recém-nascidos, adolescentes e adultos', doseInterval: '0, 1 e 6 meses', doses: 3, quantity: 1 },
    { name: 'Tríplice Viral', description: 'Protege contra sarampo, caxumba e rubéola. Duas doses são recomendadas para garantir a imunidade.', ageGroup: 'Crianças a partir de 12 meses', doseInterval: '12 meses e 15 meses', doses: 2, quantity: 1 },
    { name: 'Febre Amarela', description: 'Protege contra a febre amarela, uma doença viral transmitida por mosquitos. A vacina é essencial para áreas de risco.', ageGroup: 'Crianças a partir de 9 meses, adultos', doseInterval: 'Dose única', doses: 1, quantity: 1 },
    { name: 'Influenza (Gripe)', description: 'Protege contra os vírus da gripe mais comuns. A vacina deve ser tomada anualmente.', ageGroup: 'Crianças a partir de 6 meses e adultos', doseInterval: 'Anual', doses: 1, quantity: 1 },
    { name: 'Pneumocócica 13', description: 'Protege contra doenças graves causadas pela bactéria Streptococcus pneumoniae, como pneumonia e meningite.', ageGroup: 'Crianças e idosos', doseInterval: 'Variável', doses: 4, quantity: 1 },
  ];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  
  const filteredVaccines = allVaccines.filter(vaccine =>
    vaccine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSearch = (vaccineName) => {
    const vaccine = allVaccines.find(v => v.name.toLowerCase() === vaccineName.toLowerCase());
    setSelectedVaccine(vaccine);
    setSearchTerm(vaccineName);
  };
  
  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 bg-gray-100 font-sans">
      <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Consulta de Vacinas
        </h2>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Digite o nome da vacina..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedVaccine(null);
            }}
            className="w-full px-4 py-3 transition-all duration-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchTerm && filteredVaccines.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
              {filteredVaccines.map((vaccine) => (
                <div
                  key={vaccine.name}
                  onClick={() => handleSearch(vaccine.name)}
                  className="px-4 py-3 transition-colors duration-200 cursor-pointer hover:bg-blue-50 hover:text-blue-700"
                >
                  {vaccine.name}
                </div>
              ))}
            </div>
          )}
        </div>
        {selectedVaccine ? (
          <div className="p-6 space-y-4 transition-all duration-500 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-2xl font-semibold text-blue-800">
              {selectedVaccine.name}
            </h3>
            <p className="text-gray-700">{selectedVaccine.description}</p>
            <ul className="list-none p-0 space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="font-semibold text-gray-800 w-32">Faixa Etária:</span>
                <span>{selectedVaccine.ageGroup}</span>
              </li>
              <li className="flex items-center">
                <span className="font-semibold text-gray-800 w-32">Intervalo:</span>
                <span>{selectedVaccine.doseInterval}</span>
              </li>
              <li className="flex items-center">
                <span className="font-semibold text-gray-800 w-32">Nº de Doses:</span>
                <span>{selectedVaccine.doses}</span>
              </li>
              <li className="flex items-center">
                <span className="font-semibold text-gray-800 w-32">Quantidade:</span>
                <span>{selectedVaccine.quantity}</span>
              </li>
            </ul>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500 bg-gray-50 border border-gray-200 rounded-lg">
            {searchTerm ? "Nenhuma vacina encontrada. Tente um nome diferente." : "Pesquise por uma vacina para ver os detalhes."}
          </div>
        )}
      </div>
    </div>
  );
};

// Componente da tela de consulta de UBS (Unidade Básica de Saúde)
const UBSConsultation = () => {
    return (
        <div className="flex items-center justify-center w-full min-h-screen p-4 bg-gray-100 font-sans">
            <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-lg text-center">
                <h2 className="mb-6 text-3xl font-bold text-gray-800">
                    Consulta de UBS
                </h2>
                <p className="text-gray-600">
                    Em breve, você poderá consultar as Unidades Básicas de Saúde (UBS) próximas a você.
                </p>
                <img src="https://placehold.co/400x300/e5e7eb/4b5563?text=Em+Desenvolvimento" alt="Placeholder para a tela de UBS" className="mt-8 rounded-lg w-full" />
            </div>
        </div>
    );
};


// Componente da tela inicial
const HomeScreen = ({ userName = 'Lucas', userProfilePic, vaccineBanner, yogaCard, exerciseReminder, meditationReminder, skinCareReminder, onVaccinesClick, onUBSClick, onToggleSidebar, onMedicamentosClick }) => {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white shadow-sm">
        <button onClick={onToggleSidebar} className="text-gray-600">
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

      {/* Main Content */}
      <main className="p-4 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Comunicados</h2>
          <div className="flex space-x-2 mb-4 overflow-x-auto">
            <button className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
              Comunicados
            </button>
            <button onClick={onUBSClick} className="bg-white text-gray-600 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
              UBS
            </button>
            <button
              onClick={onVaccinesClick}
              className="bg-white text-gray-600 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap"
            >
              Vacinas
            </button>
            <button
              onClick={onMedicamentosClick}
              className="bg-white text-gray-600 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap" 
              >
                Medicamentos
            </button>
          </div>
          <div className="relative mb-4">
            <img
              src={vaccineBanner || 'https://via.placeholder.com/600x300'}
              alt="Vacina é amor e cuidado"
              className="w-full rounded-xl"
            />
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
          <div>
            <div className="flex justify-between items-center mb-4 mt-6">
              <h2 className="text-xl font-bold text-gray-800">Lembretes</h2>
              <a href="#" className="text-sm text-teal-600">Saiba mais</a>
            </div>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              <div className="flex-shrink-0 w-44 bg-blue-100 rounded-lg shadow-sm overflow-hidden text-center">
                <p className="p-3 text-sm font-semibold text-gray-800">Se exercite!!</p>
                <img src={exerciseReminder || 'https://via.placeholder.com/200x300'} alt="Exercite-se" className="w-full h-auto" />
              </div>
              <div className="flex-shrink-0 w-44 bg-gray-100 rounded-lg shadow-sm overflow-hidden text-center">
                <p className="p-3 text-sm font-semibold text-gray-800">Seu corpo deve receber atenção!!</p>
                <img src={meditationReminder || 'https://via.placeholder.com/200x300'} alt="Meditação" className="w-full h-auto" />
              </div>
              <div className="flex-shrink-0 w-44 bg-orange-100 rounded-lg shadow-sm overflow-hidden text-center">
                <p className="p-3 text-sm font-semibold text-gray-800">Cuide da sua pele</p>
                <img src={skinCareReminder || 'https://via.placeholder.com/200x300'} alt="Cuidados com a pele" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Tab Bar Inferior */}
      <nav className="fixed bottom-0 left-0 w-full bg-white flex justify-around items-center p-3 shadow-top">
        <button onClick={onVaccinesClick} className="flex flex-col items-center text-gray-500">
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

// Componente principal que gerencia o estado e a navegação
const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarItemClick = (view) => {
    setCurrentView(view);
    setIsSidebarOpen(false); // Fecha a sidebar após a seleção
  };
  
  const handleBackToHome = () => {
    setCurrentView('home');
  };

  return (
    <div className="relative overflow-hidden">
      {/* Sidebar - desliza da esquerda */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">Menu</h3>
            <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <nav className="p-4 space-y-2">
          <button
            onClick={() => handleSidebarItemClick('home')}
            className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Início
          </button>
          <button
            onClick={() => handleSidebarItemClick('vacinas')}
            className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2-14h-4a2 2 0 00-2 2v14a2 2 0 002 2h4a2 2 0 002-2V4a2 2 0 00-2-2z" />
            </svg>
            Vacinas
          </button>
          <button
            onClick={() => handleSidebarItemClick('ubs')}
            className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
            UBS
          </button>
           <button
            onClick={() => handleSidebarItemClick('medicamentos')}
            className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
            Medicamentos
          </button>
        </nav>
      </div>

      {/* Overlay - para escurecer o fundo quando a sidebar estiver aberta */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Conteúdo principal */}
      <div className={`transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-64 md:translate-x-0' : 'translate-x-0'}`}>
        {currentView === 'home' ? (
          <HomeScreen
            onVaccinesClick={() => setCurrentView('vacinas')}
            onUBSClick={() => setCurrentView('ubs')}
            onToggleSidebar={toggleSidebar}
          />
        ) : (
          <div>
            <header className="flex items-center p-4 bg-white shadow-sm">
                <button onClick={handleBackToHome} className="text-gray-600 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="text-center flex-1">
                  <span className="text-gray-500 text-sm">Olá,</span>
                  <p className="font-semibold text-lg text-gray-800">Lucas</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={'https://via.placeholder.com/150'}
                    alt="User Profile"
                  />
                </div>
            </header>
            {currentView === 'vacinas' ? (
                <VaccineConsultation />
            ) : (
                <UBSConsultation />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
