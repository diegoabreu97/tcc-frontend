// src/pages/AppointmentRequestScreen.jsx
import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, ChevronUp, ChevronLeft, CheckCircle, XCircle, 
  User, Calendar, FileText, Wifi, Battery, Signal 
} from 'lucide-react';

// Importando o serviço criado acima
import AppointmentService from '../services/appointment.service'; 

// Componente de Status Bar (Opcional)
const StatusBar = () => (
  <div className="flex justify-between items-center px-6 py-3 bg-white text-black text-sm font-semibold select-none">
    <span>9:41</span>
    <div className="flex items-center gap-1.5">
      <Signal size={16} className="fill-current" />
      <Wifi size={16} />
      <Battery size={20} className="fill-current" />
    </div>
  </div>
);

export default function AppointmentRequestScreen() {
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [data, setData] = useState(null);
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);
  const [actionResult, setActionResult] = useState(null); // 'approved' | 'denied' | null

  // Carrega os dados ao montar a tela
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Chama o serviço
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

  // Cor principal (Verde Água)
  const primaryColorClass = "bg-[#1ABC9C]"; 

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1ABC9C]"></div>
      </div>
    );
  }

  // Tela de Sucesso após ação
  if (actionResult) {
    return (
      <div className="flex flex-col h-screen bg-white font-sans">
        <StatusBar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className={`p-4 rounded-full mb-4 ${actionResult === 'approved' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {actionResult === 'approved' ? <CheckCircle size={48} /> : <XCircle size={48} />}
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
        </div>
      </div>
    );
  }

  // Tela Principal
  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans max-w-md mx-auto shadow-2xl overflow-hidden">
      <StatusBar />
      
      <header className="bg-white px-4 py-4 flex items-center gap-3 sticky top-0 z-10">
        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Pedidos de agendamento</h1>
      </header>

      <main className="flex-1 p-5 flex flex-col gap-6 overflow-y-auto bg-white">
        
        {/* Accordion de Informações */}
        <section>
          <h2 className="text-sm font-bold text-black mb-3">Pedidos</h2>
          
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => setIsInfoExpanded(!isInfoExpanded)}
              className={`w-full ${primaryColorClass} text-white px-5 py-4 rounded-xl flex justify-between items-center shadow-sm active:opacity-90 transition-all`}
            >
              <span className="font-medium text-[15px]">Pedidos e Informações do paciente</span>
              {isInfoExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {isInfoExpanded && data && (
              <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm animate-fadeIn mt-1 space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-50">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold">Paciente</p>
                    <p className="text-gray-800 font-medium">{data.patientName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pb-3 border-b border-gray-50">
                   <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold">Data Sugerida</p>
                    <p className="text-gray-800 font-medium">{data.date} às {data.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                   <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                    <FileText size={20} />
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

        {/* Botões de Ação */}
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
}
