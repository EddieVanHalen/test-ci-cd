import { useState } from 'react';
import './App.css';

export default function AuthApp() {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    userId: '',
    nickname: '',
    password: ''
  });
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:80/Auth/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.userId),
      });

      if (!response.ok) throw new Error('Login failed');
      
      const data = await response.json();
      setUser(data);
      setError('');
    } catch (err) {
      setError('Ошибка входа. Проверьте ID пользователя.');
      setUser(null);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:80/Auth/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: formData.nickname,
          password: formData.password
        }),
      });

      if (!response.ok) throw new Error('Registration failed');
      
      const data = await response.json();
      setUser(data);
      setError('');
      setActiveTab('login');
    } catch (err) {
      setError('Ошибка регистрации. Попробуйте снова.');
      setUser(null);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setFormData({
      userId: '',
      nickname: '',
      password: ''
    });
  };

  return (
    <div className="auth-container">
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          Вход
        </button>
        <button
          className={`tab ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          Регистрация
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {user ? (
        <div className="user-profile">
          <h2>Добро пожаловать, {user.nickname}!</h2>
          <p><strong>ID:</strong> {user.id}</p>
          <button className="logout-btn" onClick={handleLogout}>Выйти</button>
        </div>
      ) : (
        <div className="auth-form">
          {activeTab === 'login' ? (
            <form onSubmit={handleLogin}>
              <h2>Вход в систему</h2>
              <div className="form-group">
                <label>ID пользователя</label>
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Войти</button>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <h2>Регистрация</h2>
              <div className="form-group">
                <label>Никнейм</label>
                <input
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Пароль</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Зарегистрироваться</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
