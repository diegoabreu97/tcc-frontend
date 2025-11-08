import React, { useState } from 'react';

// Exemplo de dados de vacinas (você vai substituir por seus dados reais)
const allVaccines = [
  { name: 'BCG', description: 'Protege contra formas graves de tuberculose.', ageGroup: 'Recém-nascidos', doseInterval: 'Dose única', doses: 1, quantity: 1 },
  { name: 'Hepatite B', description: 'Previne contra a infecção pelo vírus da Hepatite B.', ageGroup: 'Recém-nascidos, adolescentes e adultos', doseInterval: '0, 1 e 6 meses', doses: 3, quantity: 1 },
  { name: 'Tríplice Viral', description: 'Protege contra sarampo, caxumba e rubéola.', ageGroup: 'Crianças a partir de 12 meses', doseInterval: '12 meses e 15 meses', doses: 2, quantity: 1 },
  { name: 'Febre Amarela', description: 'Protege contra a febre amarela.', ageGroup: 'Crianças a partir de 9 meses, adultos', doseInterval: 'Dose única', doses: 1, quantity: 1 },
];

const VaccineConsultation = () => {
  // Estado para armazenar o valor do input de busca
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado para armazenar a vacina selecionada para exibição
  const [selectedVaccine, setSelectedVaccine] = useState(null);

  // Filtra as vacinas com base no termo de busca (para a navbar dropdown)
  const filteredVaccines = allVaccines.filter(vaccine =>
    vaccine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (vaccineName) => {
    const vaccine = allVaccines.find(v => v.name.toLowerCase() === vaccineName.toLowerCase());
    setSelectedVaccine(vaccine);
    setSearchTerm(vaccineName); // Atualiza o input com o nome da vacina selecionada
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Consulta de Vacinas</h2>
        
        {/* Campo de busca com a navbar dropdown */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Digite o nome da vacina..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedVaccine(null); // Limpa a vacina selecionada ao digitar
            }}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          
          {/* Navbar dropdown que só aparece se houver um termo de busca e resultados */}
          {searchTerm && filteredVaccines.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
              {filteredVaccines.map((vaccine) => (
                <div
                  key={vaccine.name}
                  onClick={() => handleSearch(vaccine.name)}
                  className="px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  {vaccine.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Exibição das informações da vacina */}
        {selectedVaccine ? (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-700">{selectedVaccine.name}</h3>
            
            <p className="text-gray-600">{selectedVaccine.description}</p>
            
            <ul className="list-none space-y-2 text-gray-600">
              <li><strong className="text-gray-800">Faixa Etária:</strong> {selectedVaccine.ageGroup}</li>
              <li><strong className="text-gray-800">Intervalo entre Doses:</strong> {selectedVaccine.doseInterval}</li>
              <li><strong className="text-gray-800">Número de Doses:</strong> {selectedVaccine.doses}</li>
              <li><strong className="text-gray-800">Quantidade:</strong> {selectedVaccine.quantity}</li>
            </ul>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            {searchTerm ? "Nenhuma vacina encontrada." : "Pesquise por uma vacina para ver os detalhes."}
          </p>
        )}
      </div>
    </div>
  );
};

export default VaccineConsultation;