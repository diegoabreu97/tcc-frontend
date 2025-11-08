import React, { useState } from 'react';


const allMedicamentos= [
  { name: 'BCG', description: 'Protege contra formas graves de tuberculose.', ageGroup: 'Recém-nascidos', doseInterval: 'Dose única', doses: 1, quantity: 1 },
  { name: 'Hepatite B', description: 'Previne contra a infecção pelo vírus da Hepatite B.', ageGroup: 'Recém-nascidos, adolescentes e adultos', doseInterval: '0, 1 e 6 meses', doses: 3, quantity: 1 },
  { name: 'Tríplice Viral', description: 'Protege contra sarampo, caxumba e rubéola.', ageGroup: 'Crianças a partir de 12 meses', doseInterval: '12 meses e 15 meses', doses: 2, quantity: 1 },
  { name: 'Febre Amarela', description: 'Protege contra a febre amarela.', ageGroup: 'Crianças a partir de 9 meses, adultos', doseInterval: 'Dose única', doses: 1, quantity: 1 },
];

const MedicamentosConsultation = () => {
  // Estado para armazenar o valor do input de busca
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado para armazenar a vacina selecionada para exibição
  const [selectedMedicamento, setSelectedMedicamento] = useState(null);

  // Filtra as vacinas com base no termo de busca (para a navbar dropdown)
  const filteredMedicamentos = allMedicamentos.filter(medicamentos =>
    medicamentos.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (medicamentoName) => {
    const medicamento = allMedicamentos.find(v => v.name.toLowerCase() === medicamentoName.toLowerCase());
    setSelectedMedicamento(medicamento);
    setSearchTerm(medicamentoName); // Atualiza o input com o nome da vacina selecionada
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
              setSelectedMedicamento(null); // Limpa a vacina selecionada ao digitar
            }}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          
          {/* Navbar dropdown que só aparece se houver um termo de busca e resultados */}
          {searchTerm && filteredMedicamentos.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
              {filteredMedicamentos.map((medicamento) => (
                <div
                  key={medicamento.name}
                  onClick={() => handleSearch(medicamento.name)}
                  className="px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  {medicamento.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Exibição das informações da vacina */}
        {selectedMedicamento ? (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-700">{selectedMedicamento.name}</h3>
            
            <p className="text-gray-600">{selectedMedicamento.description}</p>
            
            <ul className="list-none space-y-2 text-gray-600">
              <li><strong className="text-gray-800">Faixa Etária:</strong> {selectedMedicamento.ageGroup}</li>
              <li><strong className="text-gray-800">Intervalo entre Doses:</strong> {selectedMedicamento.doseInterval}</li>
              <li><strong className="text-gray-800">Número de Doses:</strong> {selectedMedicamento.doses}</li>
              <li><strong className="text-gray-800">Quantidade:</strong> {selectedMedicamento.quantity}</li>
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