// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook de navegação
import { getAuthenticatedData } from '../services/authService'; // Importa o serviço de dados protegidos

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [erro, setErro] = useState('');
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    // Função para verificar se o token está presente
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      // Se não tiver token, redireciona para a tela de login
      setErro('Você precisa estar logado para acessar esta página.');
      navigate('/'); // Redireciona para o login
    } else {
      // Se tiver token, tenta carregar os dados do usuário
      const loadUserData = async () => {
        try {
          const data = await getAuthenticatedData(); // Chama o serviço para buscar os dados
          setUserData(data); // Armazena os dados recebidos
        } catch (error) {
          setErro('Erro ao carregar os dados');
          console.error(error);
        }
      };

      loadUserData(); // Chama a função assim que o componente for montado
    }
  }, [navigate]);

  // Função para sair
  const logout = () => {
    // Remover o token do localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('authType'); // (Opcional) Limpar o tipo de autenticação, se necessário

    // Redirecionar para a página de login
    navigate('/'); // Redireciona para a página de login
  };

  return (
    <div className="profile-container">
      {erro && <p className="error">{erro}</p>} {/* Exibe erro, se houver */}
      {userData ? (
        <div>
          <h2>Bem-vindo, {userData.full_name}</h2>
          {/* Exibe outros dados do usuário */}
          <button onClick={logout}>Sair</button> {/* Botão de logout */}
        </div>
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
};

export default Profile;
