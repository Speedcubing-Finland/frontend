import PropTypes from 'prop-types'; // Import PropTypes
import { useState } from 'react';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Get credentials from .env using import.meta.env
    const storedUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const storedPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (username === storedUsername && password === storedPassword) {
      localStorage.setItem('isAuthenticated', 'true');
      onLogin(true);
    } else {
      setErrorMessage('Invalid credentials');
    }
  };

  return (
    <div className="form-container max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-semibold">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            placeholder="admin"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            placeholder="password"
          />
        </div>
        <div className="text-center">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired, // Ensure onLogin is passed as a function
};

export default LoginForm;
