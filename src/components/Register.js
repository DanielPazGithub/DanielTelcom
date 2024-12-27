// src/components/Auth/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService'; // Importa a função de registro

const Register = () => {
  const [username, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Chama o serviço para registrar o usuário
      await registerUser(username, email, password);
      navigate('/'); // Redireciona para a página de login após o registro
      alert('Registro bem-sucedido!');
    } catch (error) {
      setErro('Erro no registro. Tente novamente!');
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Registrar-se</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nome Completo:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
