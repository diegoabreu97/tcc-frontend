import React, { useState, useEffect } from 'react';
import MedicamentoService from '../../../src/features/splash/services/MedicamentoService'

const MedicamentosConsultation = () => { 

   const [allMedicamentos, setallMedicamentos] = useState([])
   const [filteredMedicamentos, setFilteredMedicamentos] = useState([])
  useEffect(() => {
  MedicamentoService.medicamentos().then(setallMedicamentos).catch(console.log)

  }, [])
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedicamentos, setSelectedMedicamentos ] = useState(null)
  
  

  const handleSearch = (medicamentoName) => {

    const medicamentos = allMedicamentos.find(v => v.nomeMedicamento.toLowerCase() === medicamentoName.toLowerCase());
    setSelectedMedicamentos(medicamentos);
    setSearchTerm(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Consulta de Medicamentos</h2>
        
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
                    medicamentos.nomeMedicamento.toLowerCase().includes(e.target.value.toLowerCase())))// Limpa a vacina selecionada ao digitar
            }}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          
          {/* Navbar dropdown que só aparece se houver um termo de busca e resultados */}
          {searchTerm && filteredMedicamentos.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
              {filteredMedicamentos.map((medicamentos) => (
                <div
                  key={medicamentos.name}
                  onClick={() => handleSearch(medicamentos.nomeMedicamento)}
                  className="px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  {medicamentos.nomeMedicamento}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Exibição das informações da vacina */}
        {selectedMedicamentos ? (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-700">{selectedMedicamentos.nomeMedicamento}</h3>
            
            <p className="text-gray-600">{selectedMedicamentos.description}</p>
            
            <ul className="list-none space-y-2 text-gray-600">
              <li><strong className="text-gray-800">Faixa Etária:</strong> {selectedMedicamentos.ageGroup}</li>
              <li><strong className="text-gray-800">Intervalo entre Doses:</strong> {selectedMedicamentos.doseInterval}</li>
              <li><strong className="text-gray-800">Número de Doses:</strong> {selectedMedicamentos.doses}</li>
              <li><strong className="text-gray-800">Quantidade:</strong> {selectedMedicamentos.quantity}</li>
            </ul>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            {searchTerm ? "Nenhum medicamento foi encontrado." : "Pesquise por uma vacina para ver os detalhes."}
          </p>
        )}
      </div>
    </div>
  );
};

export default MedicamentosConsultation;