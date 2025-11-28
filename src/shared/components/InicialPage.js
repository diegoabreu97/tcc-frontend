import React, { useState, useEffect, useRef } from 'react';
import { APIProvider, Map, Marker, Pin } from '@vis.gl/react-google-maps';
import useUserStore from '../store/user-store';
import MedicamentoService from '../../features/splash/services/MedicamentoService';
import VacinaService from '../../features/splash/services/VacinaService';
import FundoLogin from '../../../src/features/splash/assets/Fundologin.png'
import logoEmpresa from '../../../src/features/splash/assets/logoEmpresa.png'
import AgendamentoService from '../../features/splash/services/AgendamentoService';

const PRIMARY_COLOR_CLASSES = 'bg-teal-500 hover:bg-teal-600 focus:ring-teal-500';
const TEXT_COLOR_CLASSES = 'text-balck';
const FOCUS_BORDER_CLASSES = 'focus:ring-teal-500';

// --- DEFINIÇÃO DE LOCAIS ---
const locations = [
  { lat: 34.052235, lng: -118.243683, name: 'Location A' },
  { lat: 34.052235, lng: -118.253683, name: 'Location B' },
  { lat: 34.062235, lng: -118.243683, name: 'Location C' },
];

// --- DADOS MOCK PARA IMPORT SCREEN ---
const MOCK_DATA_UBS = [
  { unidade: 'UBS Jardim das Flores', bairro: 'Jd. Flores', telefone: '(11) 9999-8888', horario: '07:00 às 17:00' },
  { unidade: 'UBS Centro', bairro: 'Centro', telefone: '(11) 3333-2222', horario: '08:00 às 18:00' },
  { unidade: 'UBS Vila Nova', bairro: 'Vila Nova', telefone: '(11) 4444-5555', horario: '07:00 às 19:00' },
  { unidade: 'UBS Parque Industrial', bairro: 'Industrial', telefone: '(11) 7777-6666', horario: '07:00 às 17:00' },
];

const MOCK_DATA_ADMINS = [
  { nome: 'João da Silva', cargo: 'Gerente', email: 'joao@saude.gov.br', status: 'Ativo' },
  { nome: 'Maria Oliveira', cargo: 'Coord.', email: 'maria@saude.gov.br', status: 'Ativo' },
  { nome: 'Carlos Souza', cargo: 'Admin', email: 'carlos@saude.gov.br', status: 'Férias' },
];

// --- SERVICES ---

const AppointmentService = {
  getAppointmentRequest: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 1,
          patientName: 'Maria Silva',
          date: '20/11/2023',
          time: '14:30',
          reason: 'Retorno de consulta cardiológica',
          status: 'pending'
        });
      }, 800);
    });
  },
  approveRequest: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Pedido ${id} aprovado.`);
        resolve({ success: true, status: 'approved' });
      }, 1000);
    });
  },
  denyRequest: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Pedido ${id} negado.`);
        resolve({ success: true, status: 'denied' });
      }, 1000);
    });
  }
};

// --- Componente CSVUploader (Auxiliar da ImportScreen) ---
function CSVUploader() {
  const [fileName, setFileName] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setFileName(file.name);
  };

  return (
    <div 
      onClick={() => fileInputRef.current.click()}
      className={`
        relative group cursor-pointer 
        flex flex-col items-center justify-center 
        w-full h-40 rounded-2xl 
        border-2 border-dashed transition-all duration-300 bg-white
        ${fileName 
          ? 'border-[#1ABC9C] bg-teal-50' 
          : 'border-gray-400 hover:border-[#1ABC9C] hover:bg-gray-50'}
      `}
    >
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".csv" className="hidden" />
      
      {fileName ? (
        <>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#1ABC9C] mb-2">
             <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
             <polyline points="14 2 14 8 20 8"></polyline>
             <path d="M8 13h8"></path>
             <path d="M8 17h8"></path>
             <path d="M10 9h4"></path>
          </svg>
          
          <p className="text-[#1ABC9C] font-semibold text-center px-4 truncate w-full text-sm">{fileName}</p>
          
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-2 bg-white px-2 py-1 rounded-full shadow-sm border border-gray-100">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[#1ABC9C]">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span className="font-medium text-[#1ABC9C]">Pronto para enviar</span>
          </div>
        </>
      ) : (
        <>
          <div className="bg-teal-50 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform">
             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#1ABC9C]">
               <circle cx="12" cy="12" r="10"></circle>
               <line x1="2" y1="12" x2="22" y2="12"></line>
               <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
             </svg>
          </div>
          <p className="text-gray-500 font-medium text-lg">Import CSV</p>
          <p className="text-gray-400 text-xs mt-1">Clique ou arraste o arquivo aqui</p>
        </>
      )}
    </div>
  );
}

// --- Componente ImportScreen (ADICIONADO E ADAPTADO) ---
const ImportScreen = ({ onBack }) => {
  const [currentView, setCurrentView] = useState('ubs'); 
  
  const config = currentView === 'ubs' 
    ? { 
        title: 'Import UBSs', 
        subtitle: 'UBSs', 
        buttonText: 'Carregar UBSs', 
        data: MOCK_DATA_UBS, 
        columns: ['Unidade', 'Bairro', 'Telefone', 'Horário'] 
      }
    : { 
        title: 'Import Admins UBSs', 
        subtitle: 'Admins', 
        buttonText: 'Carregar Admin', 
        data: MOCK_DATA_ADMINS, 
        columns: ['Nome', 'Cargo', 'Email', 'Status'] 
      };

  return (
    <div className="flex flex-col h-screen bg-gray-50 items-center w-full z-50 relative">
      {/* --- HEADER --- */}
      <div className="w-full bg-white shadow-sm px-4 py-4 relative flex items-center justify-center">
        
        <button 
          onClick={onBack} 
          className="absolute left-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
          title="Voltar"
        >
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <path d="M19 12H5M12 19l-7-7 7-7"/>
           </svg>
        </button>

        <h1 className="text-xl font-bold text-gray-900 text-center">
          {config.title}
        </h1>
      </div>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <div className="flex-1 flex flex-col px-6 overflow-hidden w-full max-w-2xl">
        
        {/* Botões de Troca de Tela */}
        <div className="flex justify-center gap-3 py-4">
            <button 
              onClick={() => setCurrentView('ubs')} 
              className={`text-sm font-medium px-4 py-1.5 rounded-full border transition-colors ${currentView === 'ubs' ? 'bg-teal-50 border-[#1ABC9C] text-[#1ABC9C]' : 'border-gray-300 text-gray-500 hover:bg-gray-100'}`}
            >
              UBSs
            </button>
            <button 
              onClick={() => setCurrentView('admins')} 
              className={`text-sm font-medium px-4 py-1.5 rounded-full border transition-colors ${currentView === 'admins' ? 'bg-teal-50 border-[#1ABC9C] text-[#1ABC9C]' : 'border-gray-300 text-gray-500 hover:bg-gray-100'}`}
            >
              Admins
            </button>
        </div>

        {/* Área de Upload */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center py-2 w-full">
          <h2 className="text-lg font-bold text-gray-800 mb-3 text-center w-full">{config.subtitle}</h2>
          
          <div className="w-full">
            <CSVUploader />
          </div>

          <div className="mt-6 w-full max-w-md mx-auto">
            <p className="text-sm font-bold text-gray-700 mb-2 text-center">Ação</p>
            <button className="w-full bg-[#1ABC9C] hover:bg-[#16a085] transition-colors text-white font-semibold text-lg py-3 rounded-xl shadow-md active:scale-95 transform duration-150 flex justify-center items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              {config.buttonText}
            </button>
          </div>
        </div>

        <div className="h-px bg-gray-200 w-full my-6"></div>

        {/* Tabela de Dados */}
        <div className="flex-1 flex flex-col overflow-hidden pb-6 w-full">
          <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">{config.subtitle} Tabela</h3>
          
          <div className="flex-1 border border-gray-300 rounded-lg bg-white overflow-auto scrollbar-thin scrollbar-thumb-gray-300 shadow-sm">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                <tr>
                  {config.columns.map((col, idx) => (
                    <th key={idx} className="px-4 py-3 border-b border-gray-200 font-bold text-center">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {config.data.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    {Object.values(item).map((val, vIdx) => (
                      <td key={vIdx} className="px-4 py-3 text-gray-600 text-center">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- AppointmentRequestScreen ---
const AppointmentRequestScreen = ({ onBack }) => {
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [data, setData] = useState(null);
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);
  const [actionResult, setActionResult] = useState(null); 

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await AppointmentService.getAppointmentRequest(123);
      setData(result);
    } catch (error) {
      console.error("Erro ao carregar dados", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (type) => {
    if (!data) return;
    setProcessing(true);
    try {
      if (type === 'approve') {
        await AppointmentService.approveRequest(data.id);
        setActionResult('approved');
      } else {
        await AppointmentService.denyRequest(data.id);
        setActionResult('denied');
      }
    } catch (error) {
      alert("Erro ao processar solicitação");
    } finally {
      setProcessing(false);
    }
  };

  const primaryColorClass = "bg-[#1ABC9C]";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1ABC9C]"></div>
      </div>
    );
  }

  if (actionResult) {
    return (
      <div className="flex flex-col h-screen bg-white font-sans z-50 relative">
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className={`p-4 rounded-full mb-4 ${actionResult === 'approved' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {actionResult === 'approved' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {actionResult === 'approved' ? 'Agendamento Permitido!' : 'Agendamento Negado'}
          </h2>
          <p className="text-gray-500 mb-8">A ação foi registrada no sistema com sucesso.</p>
          
          <button 
            onClick={() => { setActionResult(null); loadData(); }}
            className="w-full py-4 rounded-xl text-white font-bold shadow-lg bg-[#1ABC9C] active:scale-95 transition-transform"
          >
            Voltar para Lista
          </button>
          <button 
            onClick={onBack}
            className="w-full py-4 mt-2 text-gray-500 font-semibold"
          >
            Sair
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans w-full mx-auto shadow-2xl overflow-hidden z-50 relative">
      <header className="bg-white px-4 py-4 flex items-center gap-3 sticky top-0 z-10 shadow-sm">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-900">Pedidos de agendamento</h1>
      </header>

      <main className="flex-1 p-5 flex flex-col gap-6 overflow-y-auto bg-white">
        <section>
          <h2 className="text-sm font-bold text-black mb-3">Pedidos</h2>
          
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => setIsInfoExpanded(!isInfoExpanded)}
              className={`w-full ${primaryColorClass} text-white px-5 py-4 rounded-xl flex justify-between items-center shadow-sm active:opacity-90 transition-all`}
            >
              <span className="font-medium text-[15px]">Pedidos e Informações do paciente</span>
              {isInfoExpanded ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              )}
            </button>

            {isInfoExpanded && data && (
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm animate-fadeIn mt-1 space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-50">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold">Paciente</p>
                    <p className="text-gray-800 font-medium">{data.patientName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pb-3 border-b border-gray-50">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold">Data Sugerida</p>
                    <p className="text-gray-800 font-medium">{data.date} às {data.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold">Motivo</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{data.reason}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="mt-2">
          <h2 className="text-sm font-bold text-black mb-3">Permitir</h2>
          
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => handleAction('approve')}
              disabled={processing}
              className={`w-full ${primaryColorClass} text-white font-medium text-[15px] py-4 rounded-xl shadow-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 flex justify-center items-center gap-2`}
            >
              {processing ? 'Processando...' : 'Permitir'}
            </button>

            <button 
              onClick={() => handleAction('deny')}
              disabled={processing}
              className={`w-full ${primaryColorClass} text-white font-medium text-[15px] py-4 rounded-xl shadow-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50`}
            >
              Negar
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

// --- Tela de Configurações ---
const SettingsScreen = () => {
  const { info } = useUserStore();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleConfirmLogout = () => {
    window.location.reload();
  };

  const handleConfirmDelete = () => {
    alert("Sua conta foi excluída permanentemente.");
    window.location.reload(); 
  };

  const ToggleSwitch = ({ enabled, onToggle }) => (
    <button 
      onClick={onToggle}
      className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none ${
        enabled ? 'bg-teal-500' : 'bg-gray-300'
      }`}
    >
      <div 
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
          enabled ? 'translate-x-6' : 'translate-x-0'
        }`} 
      />
    </button>
  );

  return (
    <>
      <div className={`flex-1 bg-gray-50 p-4 pb-24 overflow-y-auto h-full rounded-xl ${showLogoutModal || showDeleteModal ? 'blur-sm pointer-events-none' : ''}`}>
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800">Configurações</h2>
        </div>

        <div className="relative mb-6">
          <input 
            type="text" 
            placeholder="Buscar configurações..." 
            className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
          />
        </div>

        <div className="flex items-center p-4 bg-white rounded-2xl shadow-sm mb-6">
          <img
            src={logoEmpresa} 
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover mr-4"
          />
          <div className="flex-1">
            <h3 className="font-bold text-gray-800">{info.nome || "Usuário"}</h3>
            <p className="text-sm text-gray-500">{info.email || "email@exemplo.com"}</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Item: Notificações */}
          <div className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-xl cursor-pointer transition">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gray-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <span className="font-medium text-gray-700">Notificações</span>
            </div>
            <ToggleSwitch enabled={notificationsEnabled} onToggle={() => setNotificationsEnabled(!notificationsEnabled)} />
          </div>

          {/* Botão: Sair da conta */}
          <div 
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center justify-between p-3 hover:bg-red-50 rounded-xl cursor-pointer transition group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-red-100 rounded-full group-hover:bg-red-200 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <span className="font-medium text-red-500">Sair da conta</span>
            </div>
          </div>

          <div 
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center justify-between p-3 hover:bg-red-100 rounded-xl cursor-pointer transition group mt-2"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-red-200 rounded-full group-hover:bg-red-300 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <span className="font-bold text-red-700">Deletar conta</span>
            </div>
          </div>
        </div>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowLogoutModal(false)}
          ></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden z-10 transform transition-all scale-100 p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Sair da conta</h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              Tem certeza que deseja sair da sua conta? Você precisará fazer login novamente para acessar.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowLogoutModal(false)} 
                className="flex-1 px-4 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition focus:ring-2 focus:ring-gray-200"
              >
                Cancelar
              </button>
              <button 
                onClick={handleConfirmLogout} 
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition shadow-lg shadow-red-200 focus:ring-2 focus:ring-red-500"
              >
                Sim, sair
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowDeleteModal(false)}
          ></div>
          
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden z-10 transform transition-all scale-100 p-6 text-center border-t-4 border-red-600">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">Excluir Conta</h3>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              Tem certeza absoluta? Esta ação é <span className="font-bold text-red-600">irreversível</span>.
            </p>
            <p className="text-gray-400 text-xs mb-8">
              Todos os seus dados, agendamentos e histórico serão apagados permanentemente.
            </p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleConfirmDelete} 
                className="w-full px-4 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition shadow-lg shadow-red-200 focus:ring-2 focus:ring-red-500 uppercase tracking-wide"
              >
                Sim, excluir minha conta
              </button>
              <button 
                onClick={() => setShowDeleteModal(false)} 
                className="w-full px-4 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition focus:ring-2 focus:ring-gray-200"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- Demais Telas (Agendamento, Medicamentos, etc) ---
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const AgendamentoScreen = () => {
  const [vacinas, setVacinas] = useState([]);
  const [ubsList, setUbsList] = useState([]);
  const [selectedVacina, setSelectedVacina] = useState('');
  const [selectedUBS, setSelectedUBS] = useState('');
  const [nomePaciente, setNomePaciente] = useState('');
  const [faixaEtaria, setFaixaEtaria] = useState('');
  const [selectedDay, setSelectedDay] = useState(null);

  const agendar = async (e) =>{
    e.preventDefault()
    await AgendamentoService.agendar({
      tipoDePaciente: faixaEtaria.toUpperCase(), 
      ubsId: selectedUBS.id,
      atendimentoId:"",
      horario: selectedDay
    })
  }
  
  const diasDisponiveis = [15, 1, 22, 23, 29, 30];
  useEffect(() => {
    VacinaService.vacinas()
      .then(data => setVacinas(data))
      .catch(console.log);

    setUbsList(locations.map(l => l.name));
  }, []);
  return (
  const diasDisponiveis = [1, 5, 6, 8, 9, 12, 13,16 ,17, 19, 20, 22, 23, 26, 27];

  const handleDayClick = (day) => {
    // Apenas permite clicar se o dia estiver na lista de dias disponíveis
    if (diasDisponiveis.includes(day)) {
        // Se o dia clicado já estiver selecionado, desseleciona (null).
        // Caso contrário, seleciona o novo dia.
        setSelectedDay(day === selectedDay ? null : day);
    }
  };

  useEffect(() => {
    VacinaService.vacinas()
      .then(data => setVacinas(data))
      .catch(console.error); // Alterado para console.error para melhor rastreio

    // Garante que locations foi passado
    if (locations) {
      setUbsList(locations.map(l => l.name));
    }
  }, [VacinaService, locations]);

  const faixas = [
    { label: 'Adulto', value: 'Adulto', colorClass: 'bg-gray-200' },
    { label: 'Idoso', value: 'Idoso', colorClass: 'bg-gray-200' },
    { label: 'Criança', value: 'Criança', colorClass: 'bg-gray-200' }, 
];
return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${FundoLogin})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-white opacity-80 z-10"></div>

      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-2xl z-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Agendar Vacinação</h2>
        <p className="text-red-400 text-sm mb-6">
          Importante: você será notificado se o seu agendamento for aceito
        </p>

        {/* ... (Campos de Tipo da vacina e Locais disponíveis mantidos) ... */}
        
        <label className="block text-gray-700 text-sm mb-1">Tipo da vacina</label>
        <input
          type="text"
          list="listaVacinas"
          value={selectedVacina}
          onChange={e => setSelectedVacina(e.target.value)}
          placeholder="Digite aqui..."
          className="w-full p-3 mb-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500"
        />
        <datalist id="listaVacinas">
          {vacinas.map(v => (
            <option key={v.nomeVacina} value={v.nomeVacina} />
          ))}
        </datalist>

        <label className="block text-gray-700 text-sm mb-1">Locais disponíveis</label>
        <select
          className="w-full p-3 mb-6 border rounded-lg shadow-sm bg-teal-500 text-white text-lg font-semibold"
          value={selectedUBS}
          onChange={e => setSelectedUBS(e.target.value)}
        >
          <option value="">Selecione</option>
        {ubsList.map(u => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
        
        {/* Lógica de renderização dos dias atualizada */}
        <label className="block text-gray-700 text-sm mb-2">Dias para o agendamento</label>
        <div className="grid grid-cols-7 gap-2 mb-6 text-center">
          {Array.from({ length: 30 }, (_, i) => i + 1).map(day => {
            const isDisponivel = diasDisponiveis.includes(day);
            const isSelected = day === selectedDay; // Verifica se este dia foi selecionado
            
            // Lógica de Classes para estilização
            let bg = "bg-gray-200 text-gray-400"; // Padrão (Fechado/Indisponível)
            let cursor = "cursor-not-allowed";
            let hover = "";
            let ring = "";

            if (isDisponivel) {
                cursor = "cursor-pointer"; // Dia clicável
                if (isSelected) {
                    bg = "bg-teal-600 text-white"; // Selecionado
                    ring = "ring-2 ring-teal-500 ring-offset-2"; // Anel de destaque
                } else {
                    bg = "bg-teal-300 text-gray-800"; // Disponível, não selecionado
                    hover = "hover:bg-teal-400";
                }
            }
            
            return (
              <div
                key={day}
                className={`p-2 rounded-full text-sm font-medium transition-all ${bg} ${cursor} ${hover} ${ring}`}
                onClick={() => handleDayClick(day)} // Adiciona o evento de clique
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* Exibe qual dia foi selecionado (Opcional, mas útil para debug/visualização) */}
        {selectedDay && (
            <p className="text-teal-600 font-semibold mb-4 text-center">Dia escolhido: **{selectedDay}**</p>
        )}
        
        {/* A legenda foi mantida, mas as cores precisam ser ajustadas para refletir o código */}
        <div className="flex justify-around mb-6 text-xs">
          <div className="flex items-center space-x-1">
            <span className="w-3 h-3 bg-gray-200 rounded-full"></span>
            <span>Fechado</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-3 h-3 bg-teal-300 rounded-full"></span>
            <span>Disponível</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-3 h-3 bg-teal-600 rounded-full"></span>
            <span>Selecionado</span>
          </div>
        </div>
                {/* A legenda foi mantida, mas as cores precisam ser ajustadas para refletir o código */}
<label className="block text-gray-700 text-sm mb-2">Faixa etária do paciente</label>
<div className="flex justify-around mb-6 text-xs">
    {faixas.map(faixa => {
        const isSelected = faixaEtaria === faixa.value;
        const bgClass = isSelected ? 'bg-teal-600' : faixa.colorClass;
        const ringClass = isSelected ? 'ring-2 ring-teal-600 ring-offset-2' : '';

        return (
            <label 
                key={faixa.value}
                className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-all ${isSelected ? 'shadow-md' : 'hover:bg-gray-50'}`}
            >
                <input
                    type="radio"
                    name="faixaEtaria"
                    value={faixa.value}
                    checked={isSelected}
                    onChange={e => setFaixaEtaria(e.target.value)}
                    className="hidden" 
                />
                
                <span 
                    className={`w-3 h-3 rounded-full block ${bgClass} ${ringClass}`}
                ></span>
                
                <span className={`text-sm font-medium ${isSelected ? 'text-teal-600 font-bold' : 'text-gray-700'}`}>
                    {faixa.label}
                </span>
            </label>
        );
    })}
</div>

        {/* ... (Campos de Nome do paciente e Faixa etária mantidos) ... */}
        
        <label className="block text-gray-700 text-sm mb-1">Nome do paciente</label>
        <input
          type="text"
          value={nomePaciente}
          onChange={e => setNomePaciente(e.target.value)}
          placeholder="Lucas"
          className="w-full p-3 mb-4 border rounded-lg shadow-sm"
        />

        <label className="block text-gray-700 text-sm mb-1">Faixa etária</label>
        <input
          type="text"
          value={faixaEtaria}
          onChange={e => setFaixaEtaria(e.target.value)}
          placeholder="Ex: 18+"
          className="w-full p-3 mb-4 border rounded-lg shadow-sm"
        />

        <button onClick={agendar} 
          className="w-full bg-teal-500 text-white p-3 rounded-lg font-semibold text-lg shadow hover:bg-teal-600 disabled:bg-gray-400"
          // Exemplo: Desabilita se o dia não foi selecionado
          disabled={!selectedDay} 
        >
          Enviar Agendamento 
        </button>
      </div>
    </div>
  );
};

const MedicamentosConsultation = () => {
  const [allMedicamentos, setallMedicamentos] = useState([])
  const [filteredMedicamentos, setFilteredMedicamentos] = useState([])
  
  useEffect(() => {
    MedicamentoService.medicamentos().then(setallMedicamentos).catch(console.log)
  }, [])
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedicamentos, setSelectedMedicamentos] = useState(null)

  const handleSearch = (medicamentoName) => {
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
      <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-2xl z-50"> 
        <h2 className={`text-3xl font-extrabold ${TEXT_COLOR_CLASSES} mb-8 text-center`}>
          💊 Consulta de Medicamentos
        </h2>
     
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Digite o nome do medicamento..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedMedicamentos(null);
              setFilteredMedicamentos(allMedicamentos.filter(medicamentos =>
                medicamentos.nome?.toLowerCase().includes(e.target.value.toLowerCase())))
            }}
            className={`w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 ${FOCUS_BORDER_CLASSES} transition-all text-lg`}
          />

          {searchTerm && filteredMedicamentos.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-xl z-10 max-h-60 overflow-y-auto">
              {filteredMedicamentos.map((medicamentos) => (
                <div
                  key={medicamentos.nome}
                  onClick={() => handleSearch(medicamentos.nome)} 
                  className="px-5 py-3 cursor-pointer hover:bg-teal-50 transition-colors border-b border-gray-100 last:border-b-0 text-gray-800"
                >
                  {medicamentos.nome}
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedMedicamentos ? (
          <div className="p-6 space-y-4 transition-all duration-500 bg-teal-50 border-l-4 border-teal-500 rounded-lg shadow-md">
            <h3 className={`text-2xl font-bold ${TEXT_COLOR_CLASSES}`}>
              {selectedMedicamentos.nome} 
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
      <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-2xl z-50"> 

        <h2 className={`mb-8 text-3xl font-extrabold text-center ${TEXT_COLOR_CLASSES}`}>
          💉 Consulta de Vacinas
        </h2>

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

        {selectedVaccine ? (
          <div className="p-6 space-y-4 transition-all duration-500 bg-teal-50 border-l-4 border-teal-500 rounded-lg shadow-md">
            <h3 className={`text-2xl font-bold ${TEXT_COLOR_CLASSES} border-b border-teal-200 pb-2`}>
              {selectedVaccine.nomeVacina}
            </h3>
            <ul className="list-none p-0 space-y-3 text-gray-700">
              <li className="text-gray-600 text-sm italic">
                {selectedVaccine.descVacina}
              </li>
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

const locations = [
  { lat: 34.052235, lng: -118.243683, name: 'Location A' },
  { lat: 34.052235, lng: -118.253683, name: 'Location B' },
  { lat: 34.062235, lng: -118.243683, name: 'Location C' },
];

function MyMapComponent() {
  const mapId = "YOUR_MAP_ID";

  return (
    <div className="w-full max-w-4xl pt-4">
      <div
        style={{ height: '500px', width: '100%' }}
        className="rounded-lg overflow-hidden border border-gray-200 shadow-lg"
      >
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <Map
            center={{ lat: 34.052235, lng: -118.243683 }}
            zoom={12}
            mapId={mapId}
          >
            {locations.map((location, index) => (
              <Marker key={index} position={{ lat: location.lat, lng: location.lng }}>
                <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
              </Marker>
            ))}
          </Map>
        </APIProvider>
      </div>

      <div className="mt-6 p-4 bg-teal-50 border-l-4 border-teal-500 rounded-lg shadow-sm">
        <p className="text-sm text-gray-700 font-semibold">
          <span className={`inline-block w-3 h-3 rounded-full ${PRIMARY_COLOR_CLASSES} mr-2`}></span>
          Os marcadores no mapa indicam as Unidades Básicas de Saúde (UBS).
        </p>
      </div>
    </div>
  );
}

const UBSConsultation = () => {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${FundoLogin})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
    >
      <div className="absolute inset-0 bg-white opacity-80 z-10"></div>
      <div className="w-full max-w-4xl p-8 bg-white rounded-xl shadow-2xl z-20 text-center">
        <h2 className={`mb-6 text-3xl font-extrabold ${TEXT_COLOR_CLASSES} border-b-2 border-teal-100 pb-3 mx-auto max-w-lg`}>
          🗺️ Consulta de UBS
        </h2>
        <p className="text-lg text-gray-700 mb-8 font-light">
          Localize as Unidades Básicas de Saúde (UBS) próximas a você para um atendimento rápido e eficaz.
        </p>
        <MyMapComponent />
      </div>
    </div>
  );
};

// --- Tela Principal (Home + Navegação) ---
const HomeScreen = ({ userName, userProfilePic, vaccineBanner, exerciseReminder, meditationReminder, skinCareReminder, onVaccinesClick, onUBSClick, onToggleSidebar, onMedicamentosClick, onAgendamentosClick, onSettingsClick, onRequestAgendamentosClick, onImportClick }) => {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
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
          <div>
            <img
              alt="Foto de Perfil"
              src={userProfilePic || logoEmpresa}
              className="w-12 h-13 rounded-full object-cover"
            />
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Início</h2>
          <div className="flex space-x-2 mb-4 overflow-x-auto">
            <button className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
              Comunicados
            </button>
            <button onClick={onUBSClick} className="bg-white text-gray-600 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
              UBS
            </button>
            <button onClick={onVaccinesClick} className="bg-white text-gray-600 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
              Vacinas
            </button>
            <button onClick={onMedicamentosClick} className="bg-white text-gray-600 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
              Medicamentos
            </button>
            <button onClick={onAgendamentosClick} className="bg-white text-gray-600 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
              Agendamentos
            </button>
            <button onClick={onRequestAgendamentosClick} className="bg-white text-gray-600 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
              Aceitar agendamentos
            </button>
            {/* NOVO BOTÃO DE IMPORTAR */}
            <button onClick={onImportClick} className="bg-white text-gray-600 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
              Importar Dados
            </button>
          </div>
          <div className="flex gap-4 mb-4">
            <img src={vaccineBanner || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1qPbHfbLtsi7viAqVMVCM8EgOw4DgtjNU-Q&s'} className="rounded-xl" />
            <img src={vaccineBanner || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmTCP0r2-cD_47UZHDFc12Jes58yWY20lBXw&s'} className="rounded-xl" />
            <img src={vaccineBanner || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZfFHuI_apORowKihPiVGMcc9x-lZHPoG2-g&s'} className="rounded-xl" />
            <img src={vaccineBanner || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ_b-kcjtdgEnDS1DOasxU5DDqx1QgR8gj-g&s'} className="rounded-xl" />
            <img src={vaccineBanner || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWNgfA4Ly65DaeegQHzxzDkL6oVY2Bs9xzKA&s'} className="rounded-xl" />
          </div>
          <div className="flex justify-between items-center mb-4">
          </div>
     
          <div>
            <div className="flex justify-between items-center mb-8 mt-10">
              <h2 className="text-xl font-bold text-gray-800">Lembretes</h2>
            </div>
            <div className="flex space-x-4 overflow-x-auto pb-8">
              <div className="flex-shrink-0 w-80 bg-blue-100 rounded-lg shadow-sm overflow-hidden text-center">
                <p className="p-3 text-sm font-semibold text-gray-800">Se exercite!!</p>
                <img src={exerciseReminder || 'https://cdn.borainvestir.b3.com.br/2023/06/30145447/atividades-fisicas-e-dinheiro-900x540.jpeg'} alt="Exercite-se" className="w-full h-auto" />
              </div>
              <div className="flex-shrink-0 w-80 bg-gray-100 rounded-lg shadow-sm overflow-hidden text-center">
                <p className="p-3 text-sm font-semibold text-gray-800">Cuide do seu corpo</p>
                <img src={meditationReminder || 'https://vivaassim.com.br/img/posts/2022/04/07042022-cuidados-essenciais-para-manter-a-saude-em-dia-e-prevenir-doencas-1.jpg'} alt="Meditação" className="w-full h-auto" />
              </div>
              <div className="flex-shrink-0 w-80 bg-orange-100 rounded-lg shadow-sm overflow-hidden text-center">
                <p className="p-3 text-sm font-semibold text-gray-800">Cuide da sua pele</p>
                <img src={skinCareReminder || 'https://avidaplena.com.br/wp-content/uploads/2023/07/Libbs_A_Vida_Plena_Cuidados_gerais_com_pele_780x450.png'} alt="Cuidados com a pele" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Tab Bar Inferior */}
      <nav className="fixed bottom-0 left-0 w-full bg-white flex justify-around items-center p-3 shadow-top">
 
        <button 
          onClick={onSettingsClick} 
          className="flex flex-col items-center text-gray-500"
        >
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
          <button onClick={() => handleSidebarItemClick('home')} className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Início
          </button>
          <button onClick={() => handleSidebarItemClick('vacinas')} className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2-14h-4a2 2 0 00-2 2v14a2 2 0 002 2h4a2 2 0 002-2V4a2 2 0 00-2-2z" />
            </svg>
            Vacinas
          </button>
          <button onClick={() => handleSidebarItemClick('ubs')} className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
            UBS
          </button>
          <button onClick={() => handleSidebarItemClick('medicamentos')} className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
            Medicamentos
          </button>
          <button onClick={() => handleSidebarItemClick('agendamentos')} className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
            Agendamentos
          </button>
        </nav>
      </div>

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
            onAgendamentosClick={() => setCurrentView('agendamentos')}
            onSettingsClick={() => setCurrentView('settings')}
            onRequestAgendamentosClick={() => setCurrentView('solicitacoes')}
            onImportClick={() => setCurrentView('import')}
          />
        ) : currentView === 'solicitacoes' ? (
          <AppointmentRequestScreen onBack={handleBackToHome} />
        ) : currentView === 'import' ? (
          <ImportScreen onBack={handleBackToHome} />
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
                <div>
                  <img
                    alt="Foto de Perfil"
                    src={logoEmpresa}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
              </div>
            </header>
             
            {currentView === 'vacinas' ? (
              <VaccineConsultation />
            ) : currentView === 'medicamentos' ? (
              <MedicamentosConsultation />
            ) : currentView === 'agendamentos' ? (
              <AgendamentoScreen />
            ) : currentView === 'settings' ? (
              <SettingsScreen /> 
            ) : (
              <UBSConsultation />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeApp;