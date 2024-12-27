import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    try {
      const response = await authenticateUser(email, password);
      const { token } = response;

      localStorage.setItem('authToken', token);
      localStorage.setItem('authType', 'bearer');

      navigate('/profile');
    } catch (error) {
      setErro('Erro ao fazer login');
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
      <p>
        Não tem uma conta? <a href="/register">Registrar</a>
      </p>
    </div>
  );
};

export default Login;
