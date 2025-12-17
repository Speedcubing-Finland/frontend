import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import MemberCsvChecker from './components/MemberCsvChecker';
import { isAuthenticated as checkAuth, logout, api } from '../../utilities/api';

function Admin() {
  const [submissions, setSubmissions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (checkAuth()) {
      setIsAuthenticated(true); // Check if the user is authenticated
    }
  }, []);

  const handleLogin = (status) => {
    setIsAuthenticated(status); // Update authentication status
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false); // Clear authentication flag
  };

  useEffect(() => {
    if (isAuthenticated) {
      api.get('/api/admin/submissions')
        .then((data) => setSubmissions(data))
        .catch((error) => console.error('Error fetching submissions:', error));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      api.get('/api/admin/members')
        .then((data) => {
          console.log('Members fetched successfully:', data?.length || 0);
          setMembers(data || []);
        })
        .catch((err) => {
          console.error('Error fetching members:', err);
          setMembers([]); // Set empty array so the component doesn't break
        });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />; // Display login form if not authenticated
  }

  const handleApprove = (index) => {
    api.post('/api/admin/approve', { index })
      .then(() => {
        setSubmissions((prev) => prev.filter((_, i) => i !== index));
        alert('Submission approved successfully!');
      })
      .catch((error) => {
        console.error('Error approving submission:', error);
        alert('Error approving submission.');
      });
  };

  const handleReject = (index) => {
    api.post('/api/admin/reject', { index })
      .then(() => {
        setSubmissions((prev) => prev.filter((_, i) => i !== index));
        alert('Submission rejected successfully!');
      })
      .catch((error) => {
        console.error('Error rejecting submission:', error);
        alert('Error rejecting submission.');
      });
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <button 
        onClick={handleLogout} 
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 my-4"
      >
        Logout
      </button>
      <h1 className="text-2xl font-bold text-center my-4">Admin Page</h1>
      <MemberCsvChecker members={members} />
      {/* Add scrollable wrapper for the table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Etunimi</th>
              <th className="border p-2">Sukunimi</th>
              <th className="border p-2">Kaupunki</th>
              <th className="border p-2">Sähköposti</th>
              <th className="border p-2">Syntymäaika</th>
              <th className="border p-2">WCA ID</th>
              <th className="border p-2">Toiminnot</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr key={index} className="even:bg-gray-100">
                <td className="border p-2">{submission.firstName}</td>
                <td className="border p-2">{submission.lastName}</td>
                <td className="border p-2">{submission.city}</td>
                <td className="border p-2">{submission.email}</td>
                <td className="border p-2">{submission.birthDate}</td>
                <td className="border p-2">{submission.wcaId || '—'}</td>
                <td className="border p-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
                    onClick={() => handleApprove(index)}
                  >
                    Hyväksy
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleReject(index)}
                  >
                    Hylkää
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
