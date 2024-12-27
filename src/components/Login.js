import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../services/authService'; // Importa o serviço de autenticação

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  // Função para fazer login
  const loginUser = async (email, password) => {
    try {
      const response = await authenticateUser(email, password); // Chama o serviço de autenticação
      const { token } = response; // Supondo que a resposta tenha o token
  
      // Armazenar o token no localStorage
      localStorage.setItem('authToken', token);
  
      // (Opcional) Armazenar o tipo de autenticação
      localStorage.setItem('authType', 'bearer');
  
      // Redirecionar o usuário após o login com o navigate
      navigate('/profile'); // Redireciona para a página do perfil após o login
    } catch (error) {
      setErro('Erro ao fazer login');
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password); // Chama a função de login ao enviar o formulário
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {erro && <p className="error">{erro}</p>} {/* Exibe o erro se houver */}
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
