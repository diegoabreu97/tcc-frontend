// src/services/appointment.service.js

// Simulação de dados (remover quando conectar com API real)
const MOCK_DATA = {
  id: 1,
  patientName: 'Maria Silva',
  date: '20/11/2023',
  time: '14:30',
  reason: 'Retorno de consulta cardiológica',
  status: 'pending'
};

const AppointmentService = {
  /**
   * Busca os detalhes do pedido de agendamento
   * @param {string|number} id - ID do agendamento
   */
  getAppointmentRequest: async (id) => {
    // Aqui entraria sua chamada real: axios.get(`/api/appointments/${id}`)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...MOCK_DATA, id });
      }, 800);
    });
  },

  /**
   * Aprova o agendamento
   * @param {string|number} id - ID do agendamento
   */
  approveRequest: async (id) => {
    // Aqui entraria sua chamada real: axios.post(`/api/appointments/${id}/approve`)
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Pedido ${id} aprovado.`);
        resolve({ success: true, status: 'approved' });
      }, 1000);
    });
  },

  /**
   * Nega o agendamento
   * @param {string|number} id - ID do agendamento
   */
  denyRequest: async (id) => {
    // Aqui entraria sua chamada real: axios.post(`/api/appointments/${id}/deny`)
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Pedido ${id} negado.`);
        resolve({ success: true, status: 'denied' });
      }, 1000);
    });
  }
};

export default AppointmentService;