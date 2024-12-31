import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateAdmin } from '../services/authService';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const loginAdmin = async (email, password) => {
    try {
      const response = await authenticateAdmin(email, password);
      const { token } = response;

      localStorage.setItem('authToken', token);
      localStorage.setItem('authType', 'bearer');

      navigate('/admin-dashboard');
    } catch (error) {
      setErro('Erro ao fazer login como admin');
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginAdmin(email, password);
  };

  return (
    <div className="login-container">
      <h2>Login de Administrador</h2>
      {erro && <p className="error">{erro}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login como Admin</button>
      </form>
      
    </div>
  );
};

export default AdminLogin;
