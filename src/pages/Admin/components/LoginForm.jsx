import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaLock, FaUserShield } from 'react-icons/fa';
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
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-light px-6 py-16 text-white">
        <div className="absolute -left-6 top-8 h-28 w-28 rotate-12 rounded-lg border border-white/30" />
        <div className="absolute bottom-8 right-8 h-20 w-20 rounded-full border border-white/30" />

        <div className="relative mx-auto max-w-3xl text-center">
          <FaUserShield className="mx-auto mb-4 text-4xl text-white/90" />
          <h1 className="text-4xl font-bold">Admin Login</h1>
          <p className="mt-3 text-white/90">
            Kirjaudu hallintapaneeliin käsitelläksesi jäsenhakemuksia.
          </p>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="mx-auto w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
          {errorMessage && (
            <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="username" className="mb-2 block text-sm font-semibold text-slate-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 shadow-sm transition focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-light/40"
                placeholder="admin"
                autoComplete="username"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 shadow-sm transition focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-light/40"
                placeholder="password"
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-secondary px-4 py-3 font-semibold text-white transition hover:bg-brand-primary disabled:cursor-not-allowed disabled:bg-slate-400"
              disabled={isLoading}
            >
              <FaLock />
              {isLoading ? 'Kirjaudutaan...' : 'Kirjaudu'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
