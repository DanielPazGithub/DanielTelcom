// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:3333'; // URL base do seu backend

// Função para registrar o usuário
export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,  // Altere o nome do campo para "username"
      email,
      password,   // Altere o nome do campo para "password"
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Retorna a resposta do servidor
  } catch (error) {
    throw error; // Lança o erro para ser tratado no componente
  }
};

// Função para autenticar o usuário
export const authenticateUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/authenticate`, {
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Retorna a resposta do servidor (token, por exemplo)
  } catch (error) {
    throw error; // Lança o erro para ser tratado no componente
  }
};

export const getAuthenticatedData = async () => {
  try {
    // Recupera o token armazenado no localStorage
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    // Envia a requisição com o token no cabeçalho
    const response = await axios.get(`${API_URL}/app`, {
      headers: {
        Authorization: `Bearer ${token}`, // Inclui o token JWT no cabeçalho
      },
    });

    return response.data; // Retorna a resposta do servidor
  } catch (error) {
    console.error('Erro na requisição autenticada:', error);
    throw error; // Lança o erro para ser tratado no componente
  }
};
