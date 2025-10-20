import { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm'; // Import LoginForm
import MemberCsvChecker from '../components/MemberCsvChecker';

function Admin() {
  const [submissions, setSubmissions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('isAuthenticated')) {
      setIsAuthenticated(true); // Check if the user is authenticated
    }
  }, []);

  const handleLogin = (status) => {
    setIsAuthenticated(status); // Update authentication status
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false); // Clear authentication flag
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/submissions`)
        .then((response) => response.json())
        .then((data) => setSubmissions(data))
        .catch((error) => console.error('Error fetching submissions:', error));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      // Try to fetch members, but don't break if it fails
      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/members`)
        .then((res) => {
          if (!res.ok || res.headers.get('content-type')?.includes('text/html')) {
            // Server returned HTML instead of JSON - endpoint doesn't exist
            console.warn('Members endpoint not available in production yet');
            setMembers([]);
            return [];
          }
          return res.json();
        })
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
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index }),
    })
      .then((response) => {
        if (response.ok) {
          setSubmissions((prev) => prev.filter((_, i) => i !== index));
          alert('Submission approved successfully!');
        } else {
          alert('Error approving submission.');
        }
      })
      .catch((error) => console.error('Error approving submission:', error));
  };

  const handleReject = (index) => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reject`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index }),
    })
      .then((response) => {
        if (response.ok) {
          setSubmissions((prev) => prev.filter((_, i) => i !== index));
          alert('Submission rejected successfully!');
        } else {
          alert('Error rejecting submission.');
        }
      })
      .catch((error) => console.error('Error rejecting submission:', error));
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
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
