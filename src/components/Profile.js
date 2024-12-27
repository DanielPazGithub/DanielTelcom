// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthenticatedData } from '../services/authService';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      setErro('Você precisa estar logado para acessar esta página.');
      navigate('/');
    } else {
      const loadUserData = async () => {
        try {
          const data = await getAuthenticatedData();
          setUserData(data);
        } catch (error) {
          setErro('Erro ao carregar os dados');
          console.error(error);
        }
      };

      loadUserData();
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authType');
    navigate('/');
  };

  return (
    <div className="profile-container">
      {erro && <p className="error">{erro}</p>}
      {userData ? (
        <div>
          <h2>Bem-vindo, {userData.full_name}</h2>
          <button onClick={logout}>Sair</button>
        </div>
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
};

export default Profile;
