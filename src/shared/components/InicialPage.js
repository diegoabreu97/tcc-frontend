import React, { useState, useEffect } from 'react';
import { APIProvider, Map, Marker, Pin } from '@vis.gl/react-google-maps';
import useUserStore from '../store/user-store';
import MedicamentoService from '../../features/splash/services/MedicamentoService';
import VacinaService from '../../features/splash/services/VacinaService';
import FundoLogin from '../../../src/features/splash/assets/Fundologin.png'

const PRIMARY_COLOR_CLASSES = 'bg-teal-500 hover:bg-teal-600 focus:ring-teal-500'; // teal-500 é um bom match
const TEXT_COLOR_CLASSES = 'text-balck';
const FOCUS_BORDER_CLASSES = 'focus:ring-teal-500';

const MedicamentosConsultation = () => {

  const [allMedicamentos, setallMedicamentos] = useState([])
  const [filteredMedicamentos, setFilteredMedicamentos] = useState([])
  useEffect(() => {
    MedicamentoService.medicamentos().then(setallMedicamentos).catch(console.log)

  }, [])
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedicamentos, setSelectedMedicamentos] = useState(null)



  const handleSearch = (medicamentoName) => {
    console.log(medicamentoName)
    const medicamentos = allMedicamentos.find(v => v.nome.toLowerCase() === medicamentoName.toLowerCase());
    setSelectedMedicamentos(medicamentos);
    setSearchTerm(null);
  };

  return (
      <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${FundoLogin})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
    >
      <div className="absolute inset-0 bg-white opacity-80 z-1"></div>
      <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-2xl z-50"> {/* Card mais elegante */}
        <h2 className={`text-3xl font-extrabold ${TEXT_COLOR_CLASSES} mb-8 text-center`}>
          💊 Consulta de Medicamentos
        </h2>
        {/* Campo de busca com a navbar dropdown */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Digite o nome do medicamento..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedMedicamentos(null);
              setFilteredMedicamentos(allMedicamentos.filter(medicamentos =>
                medicamentos.nome?.toLowerCase().includes(e.target.value.toLowerCase())))// Limpa a vacina selecionada ao digitar
            }}
            className={`w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 ${FOCUS_BORDER_CLASSES} transition-all text-lg`}
          />

          {/* Navbar dropdown que só aparece se houver um termo de busca e resultados */}
          {searchTerm && filteredMedicamentos.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-xl z-10 max-h-60 overflow-y-auto"> {/* Sombra mais leve */}
              {filteredMedicamentos.map((medicamentos) => (
                <div
                  key={medicamentos.nome}
                  onClick={() => handleSearch(medicamentos.nome)} // Passando o nome original
                  className="px-5 py-3 cursor-pointer hover:bg-teal-50 transition-colors border-b border-gray-100 last:border-b-0 text-gray-800" // Cor de hover sutil
                >
                  {medicamentos.nome}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Exibição do Medicamento Selecionado */}
        {selectedMedicamentos ? (
          <div className="p-6 space-y-4 transition-all duration-500 bg-teal-50 border-l-4 border-teal-500 rounded-lg shadow-md"> {/* Usando a cor de destaque no fundo e na borda esquerda */}
            <h3 className={`text-2xl font-bold ${TEXT_COLOR_CLASSES}`}>
              {selectedMedicamentos.nome} {/* Usando o nome do medicamento como título */}
            </h3>

            <ul className="list-none p-0 space-y-3 text-gray-700">
              <li className="flex justify-between items-start border-b border-teal-100 pb-2">
                <span className="font-semibold text-gray-800 w-32 flex-shrink-0">Princípio Ativo:</span>
                <span className="text-right flex-grow ml-4">{selectedMedicamentos.principio_ativo}</span>
              </li>
              <li className="flex justify-between items-start">
                <span className="font-semibold text-gray-800 w-32 flex-shrink-0">Tipo:</span>
                <span className="text-right flex-grow ml-4">{selectedMedicamentos.tipo}</span>
              </li>
            </ul>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-600 bg-gray-100 border border-gray-300 rounded-lg shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 mx-auto mb-2 ${TEXT_COLOR_CLASSES}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            {searchTerm && filteredMedicamentos.length === 0 ? (
              "Nenhum medicamento encontrado. Tente um nome diferente."
            ) : (
              "Pesquise por um medicamento para ver os detalhes."
            )}
          </div>
        )}
      </div>
    </div>
  );
};
// Componente da tela de consulta de vacinas
const VaccineConsultation = () => {

  const [allVaccines, setallVaccines] = useState([])
  const [filteredVaccines, setFilteredVaccines] = useState([])
  useEffect(() => {
    VacinaService.vacinas().then(setallVaccines).catch(console.log)

  }, [])
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVaccine, setSelectedVaccine] = useState(null);


  const handleSearch = (vaccineName) => {
    const vaccine = allVaccines.find(v => v.nomeVacina.toLowerCase() === vaccineName.toLowerCase());
    setSelectedVaccine(vaccine);
    setSearchTerm(null);
  };

return (
       <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${FundoLogin})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
    >
      <div className="absolute inset-0 bg-white opacity-80 z-1"></div>
      <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-2xl z-50"> {/* Card mais elegante */}
        
        <h2 className={`mb-8 text-3xl font-extrabold text-center ${TEXT_COLOR_CLASSES}`}>
          💉 Consulta de Vacinas
        </h2>
        
        {/* Campo de busca com a navbar dropdown */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Digite o nome da vacina..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedVaccine(null);
              setFilteredVaccines(allVaccines.filter(vaccine =>
                vaccine.nomeVacina.toLowerCase().includes(e.target.value.toLowerCase())))
            }}
            className={`w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 ${FOCUS_BORDER_CLASSES} transition-all text-lg`}
          />

          {/* Dropdown de resultados */}
          {searchTerm && filteredVaccines.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-xl z-10 max-h-60 overflow-y-auto">
              {filteredVaccines.map((vaccine) => (
                <div
                  key={vaccine.nomeVacina}
                  onClick={() => handleSearch(vaccine.nomeVacina)}
                  className="px-5 py-3 cursor-pointer hover:bg-teal-50 transition-colors border-b border-gray-100 last:border-b-0 text-gray-800"
                >
                  {vaccine.nomeVacina}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Detalhes da Vacina Selecionada */}
        {selectedVaccine ? (
          <div className="p-6 space-y-4 transition-all duration-500 bg-teal-50 border-l-4 border-teal-500 rounded-lg shadow-md">
            
            <h3 className={`text-2xl font-bold ${TEXT_COLOR_CLASSES} border-b border-teal-200 pb-2`}>
              {selectedVaccine.nomeVacina}
            </h3>
            
            <ul className="list-none p-0 space-y-3 text-gray-700">
              {/* Descrição em um parágrafo separado */}
              <li className="text-gray-600 text-sm italic">
                 {selectedVaccine.descVacina}
              </li>

              {/* Itens detalhados estilizados como tabela limpa */}
              <li className="flex justify-between items-start pt-2 border-t border-teal-100">
                <span className="font-semibold text-gray-800 w-40 flex-shrink-0">Tratamento:</span>
                <span className="text-right flex-grow ml-4">{selectedVaccine.tratamento}</span>
              </li>
              <li className="flex justify-between items-start">
                <span className="font-semibold text-gray-800 w-40 flex-shrink-0">Faixa Etária:</span>
                <span className="text-right flex-grow ml-4">{selectedVaccine.faixaEtaria}</span>
              </li>
              <li className="flex justify-between items-start">
                <span className="font-semibold text-gray-800 w-40 flex-shrink-0">N° de Doses:</span>
                <span className="text-right flex-grow ml-4">{selectedVaccine.numeroDoses}</span>
              </li>
              <li className="flex justify-between items-start">
                <span className="font-semibold text-gray-800 w-40 flex-shrink-0">Intervalo de Doses:</span>
                <span className="text-right flex-grow ml-4">{selectedVaccine.intervaloEntreDoses}</span>
              </li>
            </ul>
          </div>
        ) : (
          /* Mensagem de Estado */
          <div className="p-6 text-center text-gray-600 bg-gray-100 border border-gray-300 rounded-lg shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 mx-auto mb-2 ${TEXT_COLOR_CLASSES}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944c6.287 0 11.44 4.095 12 9.056-1.42 6.008-6.195 10.902-12 11.056C5.44 24.04 0.287 19.945 0 14.944A12.003 12.003 0 0112 1.944v0z" />
            </svg>
            {searchTerm && filteredVaccines.length === 0 ? "Nenhuma vacina encontrada. Tente um nome diferente." : "Pesquise por uma vacina para ver os detalhes."}
          </div>
        )}
      </div>
    </div>
  );
};

const currentView = () => {
  switch (currentView) {
    case 'vacinas':
      return <VaccineConsultation />;
    case 'medicamentos': // <--- NOVA OPÇÃO ADICIONADA
      return <MedicamentosConsultation />;
    case 'ubs':
    default: // O 'default' irá renderizar UBSConsultation caso currentView seja algo diferente ou não definido
      return <UBSConsultation />;
  }
};


const locations = [
  { lat: 34.052235, lng: -118.243683, name: 'Location A' },
  { lat: 34.052235, lng: -118.253683, name: 'Location B' },
  { lat: 34.062235, lng: -118.243683, name: 'Location C' },
];




function MyMapComponent() {
  const mapId = "YOUR_MAP_ID"; // Obtain from Google Maps console if using advanced markers

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <Map
          center={{ lat: 34.052235, lng: -118.243683 }} // Initial map center
          zoom={12}
          mapId={mapId} // Required for advanced markers
        >
          {locations.map((location, index) => (
            <Marker key={index} position={{ lat: location.lat, lng: location.lng }}>
              <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
              {/* Optional: Add custom content to the marker, e.g., location.name */}
            </Marker>
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}

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
        <MyMapComponent />
      </div>

    </div>
  );
};

// Componente da tela inicial
const HomeScreen = ({ userName, userProfilePic, vaccineBanner, yogaCard, exerciseReminder, meditationReminder, skinCareReminder, onVaccinesClick, onUBSClick, onToggleSidebar, onMedicamentosClick }) => {
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

        {/* <div className="flex items-center space-x-2"> 
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
        </div> */}
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
const HomeApp = () => {
  const { info } = useUserStore()
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
          <button onClick={() => handleSidebarItemClick('vacinas')} className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2-14h-4a2 2 0 00-2 2v14a2 2 0 002 2h4a2 2 0 002-2V4a2 2 0 00-2-2z" />
            </svg>
            Vacinas
          </button>
          <button onClick={() => handleSidebarItemClick('ubs')} className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
            UBS
          </button>
          <button
            onClick={() => handleSidebarItemClick('medicamentos')} className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
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
            onMedicamentosClick={() => setCurrentView('medicamentos')}
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
                <p className="font-semibold text-lg text-gray-800">{info.nome}</p>
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
            ) : currentView === 'medicamentos' ? ( // <--- Adicionando o segundo ternário para medicamentos
              <MedicamentosConsultation />
            ) : (
              <UBSConsultation /> // <--- Opção padrão (fallback)
            )}
          </div>
        )}
      </div>
    </div>
  );
};



export default HomeApp;
