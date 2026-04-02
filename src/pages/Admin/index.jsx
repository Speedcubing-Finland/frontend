import { useCallback, useEffect, useState } from 'react';
import { FaCheckCircle, FaSignOutAlt, FaUsers, FaUserClock } from 'react-icons/fa';
import LoginForm from './components/LoginForm';
import MemberCsvChecker from './components/MemberCsvChecker';
import { isAuthenticated as checkAuth, logout, api } from '../../utilities/api';

function Admin() {
  const [submissions, setSubmissions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [members, setMembers] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [processingIds, setProcessingIds] = useState([]);
  const [isApprovingAll, setIsApprovingAll] = useState(false);
  const [bulkProgress, setBulkProgress] = useState({ completed: 0, total: 0 });
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    if (checkAuth()) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (status) => {
    setIsAuthenticated(status);
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  const fetchSubmissions = useCallback(async () => {
    const data = await api.get('/api/admin/submissions');
    setSubmissions(Array.isArray(data) ? data : []);
  }, []);

  const fetchMembers = useCallback(async () => {
    const data = await api.get('/api/admin/members');
    setMembers(Array.isArray(data) ? data : []);
  }, []);

  const loadAdminData = useCallback(async () => {
    setIsLoadingData(true);
    try {
      await Promise.all([fetchSubmissions(), fetchMembers()]);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setStatusMessage({
        type: 'error',
        text: 'Tietojen lataus epäonnistui. Tarkista backend-yhteys ja kokeile uudelleen.',
      });
      setSubmissions([]);
      setMembers([]);
    } finally {
      setIsLoadingData(false);
    }
  }, [fetchMembers, fetchSubmissions]);

  useEffect(() => {
    if (isAuthenticated) {
      loadAdminData();
    }
  }, [isAuthenticated, loadAdminData]);

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const markIdAsProcessing = (id) => {
    setProcessingIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const clearIdFromProcessing = (id) => {
    setProcessingIds((prev) => prev.filter((processingId) => processingId !== id));
  };

  const handleApprove = async (id) => {
    markIdAsProcessing(id);

    try {
      await api.post('/api/admin/approve', { id });
      setSubmissions((prev) => prev.filter((submission) => submission.id !== id));
      await fetchMembers();
      setStatusMessage({ type: 'success', text: 'Hakemus hyväksytty onnistuneesti.' });
    } catch (error) {
      console.error('Error approving submission:', error);
      setStatusMessage({
        type: 'error',
        text: `Hyväksyntä epäonnistui: ${error.message || 'Tuntematon virhe'}`,
      });
    } finally {
      clearIdFromProcessing(id);
    }
  };

  const handleReject = async (id) => {
    markIdAsProcessing(id);

    try {
      await api.post('/api/admin/reject', { id });
      setSubmissions((prev) => prev.filter((submission) => submission.id !== id));
      setStatusMessage({ type: 'success', text: 'Hakemus hylätty.' });
    } catch (error) {
      console.error('Error rejecting submission:', error);
      setStatusMessage({
        type: 'error',
        text: `Hylkäys epäonnistui: ${error.message || 'Tuntematon virhe'}`,
      });
    } finally {
      clearIdFromProcessing(id);
    }
  };

  const handleApproveAll = async () => {
    if (submissions.length === 0 || isApprovingAll) return;

    const confirmed = window.confirm(
      `Hyväksytäänkö kaikki ${submissions.length} odottavaa hakemusta?`
    );

    if (!confirmed) return;

    setIsApprovingAll(true);
    setStatusMessage(null);
    setBulkProgress({ completed: 0, total: submissions.length });

    const failed = [];
    const currentSubmissions = [...submissions];

    for (let index = 0; index < currentSubmissions.length; index += 1) {
      const submission = currentSubmissions[index];
      try {
        await api.post('/api/admin/approve', { id: submission.id });
      } catch (error) {
        failed.push({
          id: submission.id,
          reason: error.message || 'Tuntematon virhe',
        });
      } finally {
        setBulkProgress({ completed: index + 1, total: currentSubmissions.length });
      }
    }

    await loadAdminData();

    if (failed.length === 0) {
      setStatusMessage({
        type: 'success',
        text: `Kaikki ${currentSubmissions.length} hakemusta hyväksyttiin.`,
      });
    } else {
      setStatusMessage({
        type: 'warning',
        text: `${currentSubmissions.length - failed.length} hyväksytty, ${failed.length} epäonnistui. Virhe-esimerkki: ${failed[0].reason}`,
      });
    }

    setIsApprovingAll(false);
    setBulkProgress({ completed: 0, total: 0 });
  };

  return (
    <div className="min-h-screen bg-slate-50 px-2 pb-8 pt-2 sm:px-4 sm:pt-4 lg:px-6">
      <div className="mx-auto w-full max-w-[1500px]">
      <section className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-light px-6 py-8 text-white shadow-lg">
        <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full border border-white/30" />
        <div className="absolute -bottom-10 left-10 h-28 w-28 rounded-lg border border-white/20 rotate-12" />

        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="mt-2 text-white/90">
              Hallitse jäsenhakemuksia, vertaile CSV-listoja ja päivitä jäsenrekisteriä.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-2 font-semibold text-white hover:bg-white/20"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </section>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 text-slate-600">
            <FaUserClock className="text-xl text-brand-secondary" />
            <span>Odottaa käsittelyä</span>
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900">{submissions.length}</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 text-slate-600">
            <FaUsers className="text-xl text-brand-secondary" />
            <span>Jäsenet rekisterissä</span>
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-900">{members.length}</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 text-slate-600">
            <FaCheckCircle className="text-xl text-emerald-600" />
            <span>Bulk-hyväksyntä</span>
          </div>
          <button
            onClick={handleApproveAll}
            disabled={isApprovingAll || submissions.length === 0}
            className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
          >
            {isApprovingAll ? 'Hyväksytään...' : 'Hyväksy kaikki hakemukset'}
          </button>
          {isApprovingAll && (
            <p className="mt-2 text-sm text-slate-600">
              Edistyminen: {bulkProgress.completed}/{bulkProgress.total}
            </p>
          )}
        </div>
      </div>

      {statusMessage && (
        <div
          className={`mb-6 rounded-lg px-4 py-3 text-sm font-medium ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-700'
              : statusMessage.type === 'warning'
                ? 'bg-amber-50 text-amber-700'
                : 'bg-red-50 text-red-700'
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      <MemberCsvChecker members={members} />

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold text-slate-900">Odottaa käsittelyä</h2>
          <button
            onClick={loadAdminData}
            disabled={isLoadingData || isApprovingAll}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoadingData ? 'Päivitetään...' : 'Päivitä lista'}
          </button>
        </div>

        <div className="overflow-x-auto">
          {isLoadingData ? (
            <div className="flex items-center justify-center px-6 py-10">
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-brand-secondary border-t-transparent" />
            </div>
          ) : submissions.length === 0 ? (
            <p className="px-6 py-10 text-center text-slate-500">
              Ei odottavia hakemuksia.
            </p>
          ) : (
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Etunimi</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Sukunimi</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Kaupunki</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Sähköposti</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Syntymäaika</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">WCA ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Toiminnot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {submissions.map((submission) => {
                  const isRowProcessing = processingIds.includes(submission.id) || isApprovingAll;

                  return (
                    <tr key={submission.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm text-slate-700">{submission.first_name}</td>
                      <td className="px-4 py-3 text-sm text-slate-700">{submission.last_name}</td>
                      <td className="px-4 py-3 text-sm text-slate-700">{submission.city}</td>
                      <td className="px-4 py-3 text-sm text-slate-700">{submission.email}</td>
                      <td className="px-4 py-3 text-sm text-slate-700">{submission.birth_date}</td>
                      <td className="px-4 py-3 text-sm font-medium text-slate-800">{submission.wca_id || '—'}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <button
                            className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
                            onClick={() => handleApprove(submission.id)}
                            disabled={isRowProcessing}
                          >
                            Hyväksy
                          </button>
                          <button
                            className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
                            onClick={() => handleReject(submission.id)}
                            disabled={isRowProcessing}
                          >
                            Hylkää
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>
      <div className="h-8" />
      </div>
    </div>
  );
}

export default Admin;
