import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthenticatedData } from '../services/authService';
import Map from './Map';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [location, setLocation] = useState(null);
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

      console.log('Localização enviada com sucesso!');
      setStatus('Localização enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar localização:', error.message);
      setStatus('Erro ao enviar localização.');
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
  }, [navigate, sendLocationToBackend, location]);

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authType');
    navigate('/');
  };

  return (
    <div className="profile-container">
      {error && <p className="error">{error}</p>}
      {status && <p className="status">{status}</p>}
      {userData ? (
        <div>
          <h2>Bem-vindo, {userData.full_name}</h2>
          {location ? (
            <Map latitude={location.latitude} longitude={location.longitude} />
          ) : (
            <p>Carregando localização...</p>
          )}
          <button onClick={logout}>Sair</button>
        </div>
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
};

export default Profile;
