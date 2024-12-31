import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Map from './Map';

const DetailPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const titles = {
    fire: 'Incêndios Ativos',
    flood: 'Regiões com Enchentes',
    deforestation: 'Áreas Desmatadas',
    teams: 'Equipes em Campo',
  };

  const fixedLocation = {
    latitude: -23.55052, // Coordenadas de exemplo
    longitude: -46.633308,
  };

  const goBack = () => {
    navigate(-1); // Volta para a página anterior
  };

  return (
    <div className="app">
      <header className="header">
        <button className="back-button" onClick={goBack}>
          Voltar
        </button>
        <h1>{titles[type] || 'Detalhes'}</h1>
      </header>
      <div className="profile-content">
        <div className="map-container" style={{ height: '400px', width: '100%' }}>
          <Map latitude={fixedLocation.latitude} longitude={fixedLocation.longitude} />
        </div>
      </div>
      <footer className="footer">
        <p>Desenvolvido por: Daniel Paz</p>
      </footer>
    </div>
  );
};

export default DetailPage;
