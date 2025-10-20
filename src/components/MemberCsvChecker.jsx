import React, { useState } from 'react';
import Papa from 'papaparse';

function MemberCsvChecker({ members }) {
  const [notMembers, setNotMembers] = useState([]);
  const [noWcaIdButEmailMatch, setNoWcaIdButEmailMatch] = useState([]);
  const [foundByWca, setFoundByWca] = useState([]);
  const [csvCompetitors, setCsvCompetitors] = useState([]);
  const [error, setError] = useState('');
  const [showFoundByWca, setShowFoundByWca] = useState(false);
  const [showEmailMatches, setShowEmailMatches] = useState(false);
  const [showNotMembers, setShowNotMembers] = useState(false);
  const [membersError, setMembersError] = useState('');

  const handleDrop = (e) => {
    e.preventDefault();
    setError('');
    setMembersError('');
    
    if (!members || members.length === 0) {
      setMembersError('Cannot compare: No members data available. The backend may not be properly deployed or connected.');
      return;
    }
    
    const file = e.dataTransfer.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCsvCompetitors(results.data);
        compareWithMembers(results.data);
      },
      error: (err) => setError('CSV parsing error: ' + err.message),
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  function normalize(str) {
    return (str || '').toString().trim().toLowerCase();
  }

  const compareWithMembers = (competitors) => {
    console.log('=== COMPARISON START ===');
    console.log('Total members from DB:', members.length);
    console.log('Total competitors from CSV:', competitors.length);
    console.log('Sample members:', members.slice(0, 3));
    console.log('Sample competitors:', competitors.slice(0, 3));
    
    const membersByWca = {};
    const membersByEmail = {};
    
    // Build lookup tables from database members
    members.forEach((m) => {
      if (m.wca_id && m.wca_id !== 'null' && m.wca_id.trim() !== '') {
        const normalizedWcaId = normalize(m.wca_id);
        membersByWca[normalizedWcaId] = m;
      }
      if (m.email && m.email.trim() !== '') {
        const normalizedEmail = normalize(m.email);
        membersByEmail[normalizedEmail] = m;
      }
    });
    
    console.log('Total WCA IDs in lookup:', Object.keys(membersByWca).length);
    console.log('Sample WCA lookup keys:', Object.keys(membersByWca).slice(0, 10));
    console.log('Total emails in lookup:', Object.keys(membersByEmail).length);
    
    const notMembersList = [];
    const noWcaIdButEmailMatchList = [];
    const foundByWcaList = [];
    let foundByWcaCount = 0;
    let foundByEmailCount = 0;
    
    competitors.forEach((c, index) => {
      const wcaId = normalize(c['WCA ID']);
      const email = normalize(c['Email']);
      
      if (index < 5) { // Log first 5 for debugging
        console.log(`Competitor ${index + 1}: ${c.Name}`);
        console.log(`  Original WCA ID: "${c['WCA ID']}" -> Normalized: "${wcaId}"`);
        console.log(`  Original Email: "${c['Email']}" -> Normalized: "${email}"`);
      }
      
      if (wcaId && wcaId !== 'null' && wcaId !== '' && membersByWca[wcaId]) {
        // Found by WCA ID
        foundByWcaCount++;
        foundByWcaList.push({ ...c });
        if (index < 5) console.log(`  ✅ FOUND by WCA ID: ${wcaId}`);
        return;
      } else if (email && email !== '' && membersByEmail[email]) {
        // Found by email only (no WCA ID match)
        foundByEmailCount++;
        if (index < 5) console.log(`  📧 FOUND by email only: ${email}`);
        noWcaIdButEmailMatchList.push({ ...c });
      } else {
        // Not found at all
        if (index < 5) console.log(`  ❌ NOT FOUND: WCA "${wcaId}", Email "${email}"`);
        notMembersList.push({ ...c });
      }
    });
    
    console.log('=== COMPARISON RESULTS ===');
    console.log(`Found by WCA ID: ${foundByWcaCount}`);
    console.log(`Found by email only: ${foundByEmailCount}`);
    console.log(`Not found at all: ${notMembersList.length}`);
    console.log('=== END COMPARISON ===');
    
    setFoundByWca(foundByWcaList);
    setNotMembers(notMembersList);
    setNoWcaIdButEmailMatch(noWcaIdButEmailMatchList);
  };

  return (
    <div className="mb-6">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-400 rounded p-6 text-center mb-4 bg-gray-50 hover:bg-gray-100 cursor-pointer"
        style={{ minHeight: 100 }}
      >
        <p className="text-lg font-semibold">Drag and drop a WCA competitor CSV here</p>
        <p className="text-sm text-gray-600 mt-2">Compare competitors with Speedcubing Finland members</p>
      </div>
      
      {(error || membersError) && (
        <div className="text-red-600 bg-red-50 p-3 rounded mb-4">
          {error || membersError}
        </div>
      )}

      {(foundByWca.length > 0 || noWcaIdButEmailMatch.length > 0 || notMembers.length > 0) && (
        <div className="space-y-4">
          {/* Summary */}
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-bold text-lg mb-2">Comparison Summary</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-green-100 p-3 rounded">
                <div className="text-2xl font-bold text-green-700">{foundByWca.length}</div>
                <div className="text-sm text-green-600">Members (WCA ID)</div>
              </div>
              <div className="bg-yellow-100 p-3 rounded">
                <div className="text-2xl font-bold text-yellow-700">{noWcaIdButEmailMatch.length}</div>
                <div className="text-sm text-yellow-600">Email Match Only</div>
              </div>
              <div className="bg-red-100 p-3 rounded">
                <div className="text-2xl font-bold text-red-700">{notMembers.length}</div>
                <div className="text-sm text-red-600">Not Members</div>
              </div>
            </div>
          </div>

          {/* Members found by WCA ID */}
          {foundByWca.length > 0 && (
            <div className="border-2 border-green-300 rounded">
              <button
                onClick={() => setShowFoundByWca(!showFoundByWca)}
                className="w-full p-4 bg-green-100 hover:bg-green-200 text-left font-semibold text-green-800 flex justify-between items-center"
              >
                <span>✅ Members ({foundByWca.length})</span>
                <span>{showFoundByWca ? '▲' : '▼'}</span>
              </button>
              {showFoundByWca && (
                <div className="p-4 bg-green-50">
                  <div className="grid gap-2 max-h-60 overflow-y-auto">
                    {foundByWca.map((c, i) => (
                      <div key={i} className="bg-white p-2 rounded border text-sm">
                        <strong>{c.Name}</strong> ({c['WCA ID']}) - {c.Email}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Email matches only */}
          {noWcaIdButEmailMatch.length > 0 && (
            <div className="border-2 border-yellow-300 rounded">
              <button
                onClick={() => setShowEmailMatches(!showEmailMatches)}
                className="w-full p-4 bg-yellow-100 hover:bg-yellow-200 text-left font-semibold text-yellow-800 flex justify-between items-center"
              >
                <span>📧 Email Match Only ({noWcaIdButEmailMatch.length})</span>
                <span>{showEmailMatches ? '▲' : '▼'}</span>
              </button>
              {showEmailMatches && (
                <div className="p-4 bg-yellow-50">
                  <div className="grid gap-2 max-h-60 overflow-y-auto">
                    {noWcaIdButEmailMatch.map((c, i) => (
                      <div key={i} className="bg-white p-2 rounded border text-sm">
                        <strong>{c.Name}</strong> ({c['WCA ID'] || 'No WCA ID'}) - {c.Email}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Not members */}
          {notMembers.length > 0 && (
            <div className="border-2 border-red-300 rounded">
              <button
                onClick={() => setShowNotMembers(!showNotMembers)}
                className="w-full p-4 bg-red-100 hover:bg-red-200 text-left font-semibold text-red-800 flex justify-between items-center"
              >
                <span>❌ Not Members ({notMembers.length})</span>
                <span>{showNotMembers ? '▲' : '▼'}</span>
              </button>
              {showNotMembers && (
                <div className="p-4 bg-red-50">
                  <div className="grid gap-2 max-h-60 overflow-y-auto">
                    {notMembers.map((c, i) => (
                      <div key={i} className="bg-white p-2 rounded border text-sm">
                        <strong>{c.Name}</strong> ({c['WCA ID'] || 'No WCA ID'}) - {c.Email}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MemberCsvChecker;
