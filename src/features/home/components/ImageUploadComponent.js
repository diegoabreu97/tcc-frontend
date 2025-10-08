import React, { useState, useMemo } from 'react';
import axios from 'axios';
import api from '../../../shared/utils/api';

// URL de destino (pode ser configurada em um arquivo de variáveis de ambiente)
const UPLOAD_URL = '/v1/api/users/photo'; 
const FIELD_NAME = 'image'; // Nome do campo esperado pelo seu backend

const ImageUploadComponent = () => {
  // 1. Estados
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  // 2. Criação da URL de Pré-visualização
  const imageUrl = useMemo(() => {
    if (selectedFile) {
      // Cria uma URL de objeto para a pré-visualização
      return URL.createObjectURL(selectedFile);
    }
    return null;
  }, [selectedFile]);

  // 3. Handlers de Evento
  const handleFileChange = (event) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setUploadMessage(''); // Limpa a mensagem ao selecionar um novo arquivo
      setUploadProgress(0); // Reseta o progresso
    } else {
      setSelectedFile(null);
      setUploadMessage('Por favor, selecione um arquivo de imagem válido.');
    }
  };

  const handleClearImage = () => {
    setSelectedFile(null);
    setUploadMessage('');
    setUploadProgress(0);
  };

  // 4. Método de Envio (Integrando o Axios)
  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadMessage('Nenhuma imagem selecionada para envio.');
      return;
    }

    setLoading(true);
    setUploadMessage('Preparando envio...');
    setUploadProgress(0);

    const formData = new FormData();
    // Adiciona o arquivo. O nome do campo é 'photo' (FIELD_NAME).
    formData.append(FIELD_NAME, selectedFile, selectedFile.name);

    try {
      const response = await api.put(UPLOAD_URL, formData, {
        onUploadProgress: (progressEvent) => {
          // Atualiza o estado com o progresso
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });

      setUploadMessage(`Sucesso! Status ${response.status}. Servidor respondeu: ${JSON.stringify(response.data)}`);
      // Não limpa o arquivo para que o usuário possa ver o resultado, mas poderia: setSelectedFile(null);

    } catch (error) {
      let errorMsg = 'Erro desconhecido ao enviar.';
      if (error.response) {
        errorMsg = `Erro do Servidor (${error.response.status}): ${error.response.data.message || error.response.statusText}`;
      } else if (error.request) {
        errorMsg = 'Erro de conexão: Nenhuma resposta recebida.';
      }
      setUploadMessage(errorMsg);
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  // 5. Renderização
  return (
    <div className="max-w-xl mx-auto p-8 bg-gray-50 rounded-xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Envio de Foto de Perfil</h2>

      {/* Input de Arquivo */}
      <div className="mb-6">
        <label 
          htmlFor="image-upload" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Selecione uma Imagem (.jpg, .png, etc.)
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          // Estilização do input file com Tailwind
          className="block w-full text-sm text-gray-900 
                     border border-gray-300 rounded-lg cursor-pointer 
                     bg-white file:mr-4 file:py-2 file:px-4 
                     file:rounded-l-lg file:border-0 file:text-sm 
                     file:font-semibold file:bg-indigo-50 file:text-indigo-700 
                     hover:file:bg-indigo-100"
        />
      </div>

      {/* Pré-visualização e Botão de Remover */}
      {imageUrl ? (
        <div className="border-2 border-indigo-300 rounded-lg p-4 bg-white mb-6">
          <h3 className="text-lg font-medium mb-3 text-gray-700">Pré-visualização</h3>
          <div className="w-full h-56 overflow-hidden rounded-md shadow-lg mb-3">
            <img 
              src={imageUrl} 
              alt="Pré-visualização da imagem selecionada"
              className="w-full h-full object-cover" 
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Arquivo: **{selectedFile.name}**
          </p>

          <button
            onClick={handleClearImage}
            disabled={loading}
            className="mt-3 px-3 py-1 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50 transition duration-150"
          >
            {loading ? 'Aguarde...' : 'Remover Imagem'}
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center text-gray-500 mb-6">
          Nenhuma imagem selecionada.
        </div>
      )}

      {/* Botão de Envio e Barra de Progresso */}
      <button
        onClick={handleUpload}
        disabled={!selectedFile || loading}
        className={`w-full px-4 py-3 font-bold rounded-lg transition duration-300 
          ${selectedFile && !loading 
             ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md' 
             : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
      >
        {loading ? `Enviando... (${uploadProgress}%)` : 'Enviar Imagem para /users/photo'}
      </button>

      {/* Barra de Progresso (Visual) */}
      {loading && (
        <div className="w-full h-2 bg-indigo-100 rounded-full mt-2 overflow-hidden">
          <div
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}

      {/* Mensagem de Status */}
      {uploadMessage && (
        <p className={`mt-4 text-center text-sm p-2 rounded-md ${
          uploadMessage.includes('Sucesso') 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          **Status:** {uploadMessage}
        </p>
      )}

    </div>
  );
};

export default ImageUploadComponent;