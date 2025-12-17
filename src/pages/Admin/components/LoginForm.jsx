import PropTypes from 'prop-types';
import { useState } from 'react';
import { login } from '../../../utilities/api';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      // Call the login API
      await login(username, password);
      onLogin(true);
    } catch (error) {
      setErrorMessage(error.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
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
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
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
