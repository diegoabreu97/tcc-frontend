import React, { useState, useRef } from 'react';
import { Globe, Battery, Wifi, Signal, FileSpreadsheet, CheckCircle, UploadCloud } from 'lucide-react';

// Dados simulados para visualizar a tabela (Mock Data)
const MOCK_DATA_UBS = [
  { unidade: 'UBS Jardim das Flores', bairro: 'Jd. Flores', telefone: '(11) 9999-8888', horario: '07:00 às 17:00' },
  { unidade: 'UBS Centro', bairro: 'Centro', telefone: '(11) 3333-2222', horario: '08:00 às 18:00' },
  { unidade: 'UBS Vila Nova', bairro: 'Vila Nova', telefone: '(11) 4444-5555', horario: '07:00 às 19:00' },
  { unidade: 'UBS Parque Industrial', bairro: 'Industrial', telefone: '(11) 7777-6666', horario: '07:00 às 17:00' },
  { unidade: 'UBS São José', bairro: 'S. José', telefone: '(11) 2222-1111', horario: '08:00 às 17:00' },
];

const MOCK_DATA_ADMINS = [
  { nome: 'João da Silva', cargo: 'Gerente', email: 'joao@saude.gov.br', status: 'Ativo' },
  { nome: 'Maria Oliveira', cargo: 'Coord.', email: 'maria@saude.gov.br', status: 'Ativo' },
  { nome: 'Carlos Souza', cargo: 'Admin', email: 'carlos@saude.gov.br', status: 'Férias' },
  { nome: 'Ana Pereira', cargo: 'Analista', email: 'ana@saude.gov.br', status: 'Ativo' },
];

export default function App() {
  // Estado para controlar qual tela estamos vendo (UBS ou Admins)
  const [currentView, setCurrentView] = useState('ubs'); // 'ubs' ou 'admins'
  
  // Configurações baseadas na view atual
  const config = currentView === 'ubs' 
    ? { title: 'Import UBSs', subtitle: 'UBSs', buttonText: 'Carregar UBSs', data: MOCK_DATA_UBS, columns: ['Unidade', 'Bairro', 'Telefone', 'Horário'] }
    : { title: 'Import Admins UBSs', subtitle: 'Admins', buttonText: 'Carregar Admin', data: MOCK_DATA_ADMINS, columns: ['Nome', 'Cargo', 'Email', 'Status'] };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
      
      {/* Container Mobile (Simulando a tela do celular) */}
      <div className="w-full max-w-md bg-white h-[850px] shadow-2xl rounded-3xl overflow-hidden flex flex-col border border-gray-200 relative">
        
        {/* Barra de Status (Simulada) */}
        <div className="bg-white px-5 py-3 flex justify-between items-center text-xs font-bold text-gray-800">
          <span>9:41</span>
          <div className="flex gap-1.5 items-center">
            <Signal size={14} />
            <Wifi size={14} />
            <Battery size={16} />
          </div>
        </div>

        {/* Header do App */}
        <div className="px-6 py-2 pb-4 bg-white">
          <h1 className="text-2xl font-bold text-gray-900">{config.title}</h1>
        </div>

        {/* --- CONTEÚDO PRINCIPAL --- */}
        <div className="flex-1 flex flex-col px-6 overflow-hidden">
          
          {/* Seção Superior: Área de Importação Centralizada */}
          <div className="flex-1 flex flex-col justify-center py-4">
            <h2 className="text-lg font-bold text-gray-800 mb-3">{config.subtitle}</h2>
            
            <CSVUploader />

            <div className="mt-6">
              <p className="text-sm font-bold text-gray-700 mb-2">Ação</p>
              <button className="w-full bg-[#1ABC9C] hover:bg-[#16a085] transition-colors text-white font-semibold text-lg py-3.5 rounded-xl shadow-md active:scale-95 transform duration-150">
                {config.buttonText}
              </button>
            </div>
          </div>

          <div className="h-px bg-gray-200 w-full my-2"></div>

          {/* Seção Inferior: Tabela */}
          <div className="flex-[1.2] flex flex-col overflow-hidden pb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">{config.subtitle} Tabela</h3>
            
            <div className="flex-1 border border-gray-300 rounded-lg bg-gray-50 overflow-auto scrollbar-thin scrollbar-thumb-gray-300">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-200 text-gray-700 sticky top-0">
                  <tr>
                    {config.columns.map((col, idx) => (
                      <th key={idx} className="px-4 py-2 border-b border-gray-300 font-bold">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {config.data.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      {Object.values(item).map((val, vIdx) => (
                        <td key={vIdx} className="px-4 py-2.5 text-gray-600 border-r border-gray-100 last:border-0">{val}</td>
                      ))}
                    </tr>
                  ))}
                  {/* Linhas vazias para preencher visualmente se tiver poucos dados */}
                  {[...Array(5)].map((_, i) => (
                    <tr key={`empty-${i}`} className="bg-white h-10">
                      <td colSpan={4}></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Botão flutuante apenas para demonstração (trocar telas) */}
        <div className="absolute bottom-4 right-4 bg-gray-800 text-white text-xs px-3 py-1 rounded-full opacity-50 hover:opacity-100 transition-opacity cursor-pointer z-50" onClick={() => setCurrentView(currentView === 'ubs' ? 'admins' : 'ubs')}>
          Trocar Tela ({currentView})
        </div>

      </div>
    </div>
  );
}

// Componente Isolado para o Upload de CSV
function CSVUploader() {
  const [fileName, setFileName] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "text/csv") {
      setFileName(file.name);
    } else if (file) {
       alert("Por favor, solte um arquivo CSV.");
    }
  };

  return (
    <div 
      onClick={() => fileInputRef.current.click()}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`
        relative group cursor-pointer 
        flex flex-col items-center justify-center 
        w-full h-40 rounded-2xl 
        border-2 border-dashed transition-all duration-300
        ${fileName 
          ? 'border-[#1ABC9C] bg-teal-50' 
          : 'border-gray-400 bg-white hover:bg-gray-50 hover:border-gray-600'}
      `}
    >
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv"
        className="hidden" 
      />
      
      {fileName ? (
        <>
          <FileSpreadsheet size={48} className="text-[#1ABC9C] mb-2" />
          <p className="text-[#1ABC9C] font-semibold text-center px-4 truncate w-full">
            {fileName}
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
            <CheckCircle size={12} />
            <span>Arquivo pronto</span>
          </div>
        </>
      ) : (
        <>
          <div className="bg-teal-100 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
             <Globe size={32} className="text-[#1ABC9C]" />
          </div>
          <p className="text-gray-500 font-medium text-lg">Import CSV</p>
          <p className="text-gray-400 text-xs mt-1">Clique ou arraste o arquivo aqui</p>
        </>
      )}
    </div>
  );
}