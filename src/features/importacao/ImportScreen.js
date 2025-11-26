import React, { useState, useRef } from 'react';
// Removido useNavigate para evitar erro de contexto (Router)
// O código agora usa window.history.back() que é nativo e funciona em qualquer lugar.

// Dados de exemplo
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

export default function ImportScreen() {
  // Estado para controlar a visualização (UBS ou Admins)
  const [currentView, setCurrentView] = useState('ubs'); 
  
  // Configuração dinâmica dos textos e dados
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

  // Função segura para voltar a página
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      console.log("Sem histórico para voltar");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 items-center">
      
      {/* --- HEADER --- */}
      <div className="w-full bg-white shadow-sm px-4 py-4 relative flex items-center justify-center">
        
        {/* Botão Voltar (Usa histórico nativo) */}
        <button 
          onClick={handleBack} 
          className="absolute left-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
          title="Voltar"
        >
           {/* Ícone Seta Esquerda (SVG Nativo) */}
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <path d="M19 12H5M12 19l-7-7 7-7"/>
           </svg>
        </button>

        {/* Título Centralizado */}
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
              {/* Ícone Upload (SVG Nativo) */}
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
                    {/* Renderiza apenas valores de string, evitando erro de objetos */}
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
}

// Componente para o Upload de CSV
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
          {/* Ícone Planilha (SVG Nativo) */}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#1ABC9C] mb-2">
             <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
             <polyline points="14 2 14 8 20 8"></polyline>
             <path d="M8 13h8"></path>
             <path d="M8 17h8"></path>
             <path d="M10 9h4"></path>
          </svg>
          
          <p className="text-[#1ABC9C] font-semibold text-center px-4 truncate w-full text-sm">{fileName}</p>
          
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-2 bg-white px-2 py-1 rounded-full shadow-sm border border-gray-100">
            {/* Ícone Check (SVG Nativo) */}
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
             {/* Ícone Globo (SVG Nativo) */}
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