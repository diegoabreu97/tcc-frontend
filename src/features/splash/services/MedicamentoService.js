import api from "../../../shared/utils/api";

/**
 * Serviço de API para operações de Autenticação (Login e Registro).
 */
const MedicamentoService = {
  /**
   * Realiza o login de um usuário.
   * @param {object} loginData - As credenciais de login do usuário (email, password).
   * @returns {Promise<object>} - Uma Promise que resolve para os dados do usuário logado.
   */
  async medicamentos() {
    try {
      // Usa a instância 'api' para fazer a chamada. A baseURL já está configurada.
      const response = await api.get('/v1/api/medicamento');
      return response.data;
    } catch (error) {
      console.error('Erro no me:', error.response || error);

  
      throw new Error(error.response.data.message);
    }
  },

};

export default MedicamentoService;