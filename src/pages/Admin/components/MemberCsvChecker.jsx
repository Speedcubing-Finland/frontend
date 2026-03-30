import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Papa from 'papaparse';
import { FaCloudUploadAlt, FaFileDownload } from 'react-icons/fa';

function MemberCsvChecker({ members = [] }) {
  const [notMembers, setNotMembers] = useState([]);
  const [noWcaIdButEmailMatch, setNoWcaIdButEmailMatch] = useState([]);
  const [foundByWca, setFoundByWca] = useState([]);
  const [csvCompetitors, setCsvCompetitors] = useState([]);
  const [error, setError] = useState('');
  const [showFoundByWca, setShowFoundByWca] = useState(false);
  const [showEmailMatches, setShowEmailMatches] = useState(false);
  const [showNotMembers, setShowNotMembers] = useState(false);
  const [membersError, setMembersError] = useState('');
  const [csvFileName, setCsvFileName] = useState('');
  const fileInputRef = useRef(null);

  function normalize(str) {
    return (str || '').toString().trim().toLowerCase();
  }

  function pickFirstValue(row, keys) {
    for (const key of keys) {
      if (row[key] !== undefined && row[key] !== null && `${row[key]}`.trim() !== '') {
        return `${row[key]}`.trim();
      }
    }

    return '';
  }

  function getCompetitorName(row) {
    const fullName = pickFirstValue(row, ['Name', 'name', 'Competitor', 'Competitor Name']);
    if (fullName) return fullName;

    const firstName = pickFirstValue(row, ['First Name', 'first_name', 'Firstname', 'FirstName']);
    const lastName = pickFirstValue(row, ['Last Name', 'last_name', 'Lastname', 'LastName']);
    return `${firstName} ${lastName}`.trim() || 'Unknown';
  }

  function getCompetitorWcaId(row) {
    return pickFirstValue(row, ['WCA ID', 'Wca ID', 'WCAID', 'wca_id']);
  }

  function getCompetitorEmail(row) {
    return pickFirstValue(row, ['Email', 'email', 'E-mail', 'E-mail Address']);
  }

  function enrichCompetitor(row) {
    return {
      ...row,
      __displayName: getCompetitorName(row),
      __wcaId: getCompetitorWcaId(row),
      __email: getCompetitorEmail(row),
    };
  }

  const compareWithMembers = (competitors) => {
    const membersByWca = {};
    const membersByEmail = {};

    members.forEach((member) => {
      const wcaId = normalize(member.wca_id);
      const email = normalize(member.email);

      if (wcaId && wcaId !== 'null') {
        membersByWca[wcaId] = member;
      }

      if (email) {
        membersByEmail[email] = member;
      }
    });

    const foundByWcaList = [];
    const noWcaIdButEmailMatchList = [];
    const notMembersList = [];

    competitors.forEach((competitor) => {
      const enrichedCompetitor = enrichCompetitor(competitor);
      const wcaId = normalize(enrichedCompetitor.__wcaId);
      const email = normalize(enrichedCompetitor.__email);

      if (wcaId && wcaId !== 'null' && membersByWca[wcaId]) {
        foundByWcaList.push(enrichedCompetitor);
        return;
      }

      if (email && membersByEmail[email]) {
        noWcaIdButEmailMatchList.push(enrichedCompetitor);
        return;
      }

      notMembersList.push(enrichedCompetitor);
    });

    setFoundByWca(foundByWcaList);
    setNoWcaIdButEmailMatch(noWcaIdButEmailMatchList);
    setNotMembers(notMembersList);
  };

  const handleFile = (file) => {
    if (!file) return;

    setError('');
    setMembersError('');
    setFoundByWca([]);
    setNoWcaIdButEmailMatch([]);
    setNotMembers([]);
    setCsvCompetitors([]);
    setShowFoundByWca(false);
    setShowEmailMatches(false);
    setShowNotMembers(false);

    if (!members || members.length === 0) {
      setMembersError('Cannot compare: No members data available. Check backend connection first.');
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors && results.errors.length > 0) {
          setError(`CSV parsing error: ${results.errors[0].message}`);
          return;
        }

        if (!results.data || results.data.length === 0) {
          setError('CSV has no competitor rows to compare.');
          return;
        }

        setCsvFileName(file.name);
        setCsvCompetitors(results.data);
        compareWithMembers(results.data);
      },
      error: (parseError) => setError(`CSV parsing error: ${parseError.message}`),
    });
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleFile(event.dataTransfer.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileSelect = (event) => {
    handleFile(event.target.files?.[0]);
    event.target.value = '';
  };

  const exportNotMembers = () => {
    if (notMembers.length === 0) return;

    const exportRows = notMembers.map((competitor) => ({
      Name: competitor.__displayName || '',
      'WCA ID': competitor.__wcaId || '',
      Email: competitor.__email || '',
    }));

    const csvContent = Papa.unparse(exportRows);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateSuffix = new Date().toISOString().slice(0, 10);
    const sourceName = csvFileName ? csvFileName.replace(/\.csv$/i, '') : 'wca-competitors';

    link.href = downloadUrl;
    link.setAttribute('download', `${sourceName}-non-members-${dateSuffix}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  };

  const hasResults =
    foundByWca.length > 0 || noWcaIdButEmailMatch.length > 0 || notMembers.length > 0;

  return (
    <section className="mb-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 px-5 py-4">
        <h2 className="text-xl font-bold text-slate-900">CSV Membership Checker</h2>
        <p className="mt-1 text-sm text-slate-600">
          Vertaa kilpailijacsv automaattisesti jäsenrekisteriin.
        </p>
      </div>

      <div className="p-5">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-brand-secondary hover:bg-slate-100"
        >
          <FaCloudUploadAlt className="mx-auto mb-3 text-3xl text-brand-secondary" />
          <p className="text-base font-semibold text-slate-800">Vedä WCA-kilpailijacsv tähän</p>
          <p className="mt-1 text-sm text-slate-600">
            Tai valitse tiedosto manuaalisesti
          </p>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 rounded-lg bg-brand-secondary px-4 py-2 text-sm font-semibold text-white hover:bg-brand-primary"
          >
            Valitse CSV
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            onChange={handleFileSelect}
            className="hidden"
          />
          {csvFileName && (
            <p className="mt-3 text-sm text-slate-600">
              Viimeisin tiedosto: <span className="font-medium text-slate-800">{csvFileName}</span>
            </p>
          )}
        </div>

        {(error || membersError) && (
          <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error || membersError}
          </div>
        )}

        {hasResults && (
          <div className="mt-5 space-y-4">
            <div className="rounded-lg bg-slate-50 p-4">
              <h3 className="mb-3 text-lg font-bold text-slate-900">Yhteenveto</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-lg bg-emerald-100 p-3 text-center">
                  <div className="text-2xl font-bold text-emerald-700">{foundByWca.length}</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Jäsenet WCA ID:llä</div>
                </div>
                <div className="rounded-lg bg-amber-100 p-3 text-center">
                  <div className="text-2xl font-bold text-amber-700">{noWcaIdButEmailMatch.length}</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-amber-700">Email-osuma</div>
                </div>
                <div className="rounded-lg bg-red-100 p-3 text-center">
                  <div className="text-2xl font-bold text-red-700">{notMembers.length}</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-red-700">Ei jäsen</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Verrattu kilpailijoita yhteensä: {csvCompetitors.length}
              </p>
            </div>

            {foundByWca.length > 0 && (
              <div className="overflow-hidden rounded-lg border border-emerald-200">
                <button
                  type="button"
                  onClick={() => setShowFoundByWca(!showFoundByWca)}
                  className="flex w-full items-center justify-between bg-emerald-50 px-4 py-3 text-left font-semibold text-emerald-800 hover:bg-emerald-100"
                >
                  <span>Jäsenet (WCA ID) ({foundByWca.length})</span>
                  <span>{showFoundByWca ? '▲' : '▼'}</span>
                </button>

                {showFoundByWca && (
                  <div className="max-h-64 space-y-2 overflow-y-auto bg-white p-4">
                    {foundByWca.map((competitor, index) => (
                      <div key={index} className="rounded-md border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-slate-700">
                        <strong>{competitor.__displayName}</strong> ({competitor.__wcaId || 'No WCA ID'}) - {competitor.__email || 'No email'}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {noWcaIdButEmailMatch.length > 0 && (
              <div className="overflow-hidden rounded-lg border border-amber-200">
                <button
                  type="button"
                  onClick={() => setShowEmailMatches(!showEmailMatches)}
                  className="flex w-full items-center justify-between bg-amber-50 px-4 py-3 text-left font-semibold text-amber-800 hover:bg-amber-100"
                >
                  <span>Email-osumat ({noWcaIdButEmailMatch.length})</span>
                  <span>{showEmailMatches ? '▲' : '▼'}</span>
                </button>

                {showEmailMatches && (
                  <div className="max-h-64 space-y-2 overflow-y-auto bg-white p-4">
                    {noWcaIdButEmailMatch.map((competitor, index) => (
                      <div key={index} className="rounded-md border border-amber-100 bg-amber-50 px-3 py-2 text-sm text-slate-700">
                        <strong>{competitor.__displayName}</strong> ({competitor.__wcaId || 'No WCA ID'}) - {competitor.__email || 'No email'}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {notMembers.length > 0 && (
              <div className="overflow-hidden rounded-lg border border-red-200">
                <div className="flex flex-col gap-2 border-b border-red-100 bg-red-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() => setShowNotMembers(!showNotMembers)}
                    className="flex items-center justify-between font-semibold text-red-800 sm:w-auto"
                  >
                    <span>Ei jäsenet ({notMembers.length})</span>
                    <span className="ml-3">{showNotMembers ? '▲' : '▼'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={exportNotMembers}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
                  >
                    <FaFileDownload />
                    Vie ei-jäsenet CSV
                  </button>
                </div>

                {showNotMembers && (
                  <div className="max-h-64 space-y-2 overflow-y-auto bg-white p-4">
                    {notMembers.map((competitor, index) => (
                      <div key={index} className="rounded-md border border-red-100 bg-red-50 px-3 py-2 text-sm text-slate-700">
                        <strong>{competitor.__displayName}</strong> ({competitor.__wcaId || 'No WCA ID'}) - {competitor.__email || 'No email'}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

MemberCsvChecker.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      wca_id: PropTypes.string,
      email: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    })
  ),
};

export default MemberCsvChecker;
