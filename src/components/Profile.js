import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuthenticatedData } from '../services/authService';
import Map from './Map';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [location, setLocation] = useState(null); 
  const [locations, setLocations] = useState([]); 
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3333';

  const locationSent = useRef(false);

  const sendLocationToBackend = useCallback(async (latitude, longitude) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${BACKEND_URL}/location`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ latitude, longitude }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar localização');
      }

      setStatus('Localização enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar localização:', error.message);
      setStatus('Erro ao enviar localização.');
    }
  }, [BACKEND_URL]);

  // Função para buscar as localizações salvas
  const fetchUserLocations = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${BACKEND_URL}/locations`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const locationsData = await response.json();
        setLocations(locationsData); 
      } else {
        throw new Error('Erro ao carregar localizações');
      }
    } catch (error) {
      setError('Erro ao carregar as localizações');
      console.error(error);
    }
  }, [BACKEND_URL]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      setError('Você precisa estar logado para acessar esta página.');
      navigate('/');
      return;
    }
  
    const loadUserData = async () => {
      try {
        const data = await getAuthenticatedData();
        setUserData(data);
  
        // Carregar as localizações salvas
        fetchUserLocations();
  
        if (!locationSent.current && !location) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              };
              setLocation(userLocation);
              sendLocationToBackend(userLocation.latitude, userLocation.longitude);
              locationSent.current = true;
            },
            (geoError) => {
              console.error('Erro ao obter a localização:', geoError.message);
              setError('Não foi possível obter a localização.');
            }
          );
        }
      } catch (authError) {
        setError('Erro ao carregar os dados');
        console.error(authError);
      }
    };
  
    loadUserData();
  }, [navigate, sendLocationToBackend, location, fetchUserLocations, BACKEND_URL]); // Incluímos o BACKEND_URL nas dependências

  const logout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Sistema de Monitoramento e Predição de Desastres</h1>
      </header>

      <div className="dashboard">
        <Link to="/fire" className="dashboard-card fire">
          <h2>Incêndios Ativos</h2>
          <p>{userData ? userData.activeFires : '-'}</p>
        </Link>
        <Link to="/flood" className="dashboard-card flood">
          <h2>Regiões com Enchentes</h2>
          <p>{userData ? userData.floodAreas : '-'}</p>
        </Link>
        <Link to="/deforestation" className="dashboard-card deforestation">
          <h2>Áreas Desmatadas</h2>
          <p>{userData ? userData.deforestationAreas : '-'}</p>
        </Link>
        <Link to="/teams" className="dashboard-card teams">
          <h2>Equipes em Campo</h2>
          <p>{userData ? userData.teamsInField : '-'}</p>
        </Link>
      </div>

      <div className="profile-content">
        {error && <p className="error">{error}</p>}
        {status && <p className="status">{status}</p>}
        {userData && location && (
          <>
            <h2>Bem-vindo, {userData.full_name}</h2>
            {/* Passando todas as localizações para o componente de mapa */}
            <Map locations={[...locations, location]} />
            <button className="logout-button" onClick={logout}>
              Sair
            </button>
          </>
        )}
      </div>

      <footer className="footer">
        <p>Desenvolvido por: Daniel Paz</p>
      </footer>
    </div>
  );
};

export default Profile;
