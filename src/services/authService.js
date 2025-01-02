// src/services/authService.js
import axios from 'axios';

const API_URL = 'https://backend-geolocalizacao-lovat.vercel.app';

export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

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
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAuthenticatedData = async () => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    const response = await axios.get(`${API_URL}/app`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro na requisição autenticada:', error);
    throw error;
  }
};

export const authenticateAdmin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/admin/authenticate`, {
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

