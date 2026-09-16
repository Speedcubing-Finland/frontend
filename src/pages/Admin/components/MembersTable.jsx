import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { FaPen, FaSearch } from 'react-icons/fa';
import { formatDate, formatDateTime } from '../../../utilities/dates';

function MembersTable({ members, onEdit, isLoading }) {
  const [search, setSearch] = useState('');

  const visibleMembers = useMemo(() => {
    const sorted = [...members].sort((a, b) =>
      `${a.last_name || ''} ${a.first_name || ''}`.localeCompare(
        `${b.last_name || ''} ${b.first_name || ''}`,
        'fi'
      )
    );

    const term = search.trim().toLowerCase();
    if (!term) return sorted;

    return sorted.filter((member) =>
      [member.first_name, member.last_name, member.email, member.city, member.wca_id]
        .filter(Boolean)
        .some((value) => `${value}`.toLowerCase().includes(term))
    );
  }, [members, search]);

  return (
    <section className="mb-8 rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-slate-900">Jäsenrekisteri</h2>
        <div className="relative sm:w-72">
          <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Hae nimellä, sähköpostilla tai WCA ID:llä"
            className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-brand-secondary focus:outline-none focus:ring-1 focus:ring-brand-secondary"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex items-center justify-center px-6 py-10">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-brand-secondary border-t-transparent" />
          </div>
        ) : visibleMembers.length === 0 ? (
          <p className="px-6 py-10 text-center text-slate-500">
            {members.length === 0 ? 'Ei jäseniä rekisterissä.' : 'Ei hakua vastaavia jäseniä.'}
          </p>
        ) : (
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                {['Etunimi', 'Sukunimi', 'Kaupunki', 'Sähköposti', 'Syntymäaika', 'WCA ID', 'Liittynyt', 'Muokattu', 'Toiminnot'].map((heading) => (
                  <th
                    key={heading}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleMembers.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-700">{member.first_name}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{member.last_name}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{member.city}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{member.email}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{formatDate(member.birth_date)}</td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">{member.wca_id || '—'}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{formatDate(member.approved_at)}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{formatDateTime(member.edited_at)}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => onEdit(member)}
                      className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <FaPen className="text-xs" />
                      Muokkaa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {!isLoading && members.length > 0 && (
        <p className="border-t border-slate-200 px-5 py-3 text-sm text-slate-500">
          {search.trim()
            ? `${visibleMembers.length} / ${members.length} jäsentä`
            : `${members.length} jäsentä`}
        </p>
      )}
    </section>
  );
}

MembersTable.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      city: PropTypes.string,
      email: PropTypes.string,
      birth_date: PropTypes.string,
      wca_id: PropTypes.string,
      approved_at: PropTypes.string,
      edited_at: PropTypes.string,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default MembersTable;
