import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { FaChevronDown, FaChevronRight, FaFileDownload, FaPen, FaSearch, FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import { formatDate, formatDateTime } from '../../../utilities/dates';
import { downloadCsv, today } from '../../../utilities/csv';

const COLUMNS = [
  { key: 'first_name', label: 'Etunimi', type: 'text' },
  { key: 'last_name', label: 'Sukunimi', type: 'text' },
  { key: 'city', label: 'Kaupunki', type: 'text' },
  { key: 'email', label: 'Sähköposti', type: 'text' },
  { key: 'birth_date', label: 'Syntymäaika', type: 'date' },
  { key: 'wca_id', label: 'WCA ID', type: 'text' },
  { key: 'approved_at', label: 'Liittynyt', type: 'date' },
  { key: 'edited_at', label: 'Muokattu', type: 'datetime' },
  { key: 'competition_emails', label: 'Kilpailuviestit', type: 'bool' },
];

/** Empty values always sort last, whichever direction is active. */
const compareValues = (a, b, type) => {
  // Checked before the empty-value rule: 0 is a real value here, not "missing"
  if (type === 'bool') return Number(a ? 1 : 0) - Number(b ? 1 : 0);

  const left = a ?? '';
  const right = b ?? '';
  if (!left && !right) return 0;
  if (!left) return 1;
  if (!right) return -1;
  if (type === 'date' || type === 'datetime') {
    return new Date(`${left}`.replace(' ', 'T')) - new Date(`${right}`.replace(' ', 'T'));
  }
  return `${left}`.localeCompare(`${right}`, 'fi');
};

function MembersTable({ members, onEdit, isLoading }) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [sort, setSort] = useState({ key: 'last_name', direction: 'asc' });

  const toggleSort = (key) => {
    setSort((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' }
    );
  };

  const visibleMembers = useMemo(() => {
    const column = COLUMNS.find((c) => c.key === sort.key) || COLUMNS[1];
    const sorted = [...members].sort((a, b) => {
      const result = compareValues(a[column.key], b[column.key], column.type);
      return sort.direction === 'asc' ? result : -result;
    });

    const term = search.trim().toLowerCase();
    if (!term) return sorted;

    return sorted.filter((member) =>
      [member.first_name, member.last_name, member.email, member.city, member.wca_id]
        .filter(Boolean)
        .some((value) => `${value}`.toLowerCase().includes(term))
    );
  }, [members, search, sort]);

  // Exports exactly what is on screen: the current search and sort order
  const handleExport = () => {
    downloadCsv(
      `speedcubing-finland-jasenet-${today()}.csv`,
      ['Etunimi', 'Sukunimi', 'Sähköposti', 'Kaupunki', 'Syntymäaika', 'WCA ID', 'Liittynyt', 'Kilpailuviestit'],
      visibleMembers.map((member) => [
        member.first_name || '',
        member.last_name || '',
        member.email || '',
        member.city || '',
        formatDate(member.birth_date),
        member.wca_id || '',
        formatDate(member.approved_at),
        member.competition_emails ? 'Kyllä' : 'Ei',
      ])
    );
  };

  const renderCell = (member, column) => {
    const value = member[column.key];
    if (column.type === 'date') return formatDate(value);
    if (column.type === 'datetime') return formatDateTime(value);
    if (column.type === 'bool') return value ? 'Kyllä' : 'Ei';
    return value || '—';
  };

  return (
    <section className="mb-8 rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="flex items-center gap-2 text-xl font-bold text-slate-900"
          aria-expanded={isOpen}
        >
          {isOpen ? <FaChevronDown className="text-sm text-slate-500" /> : <FaChevronRight className="text-sm text-slate-500" />}
          Jäsenrekisteri
          <span className="text-sm font-normal text-slate-500">({members.length})</span>
        </button>

        {isOpen && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleExport}
              disabled={visibleMembers.length === 0}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              title="Lataa näkyvät jäsenet CSV-tiedostona"
            >
              <FaFileDownload className="text-sm" />
              Vie CSV ({visibleMembers.length})
            </button>

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
        )}
      </div>

      {isOpen && (
        <>
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
                    {COLUMNS.map((column) => {
                      const isSorted = sort.key === column.key;
                      const Icon = !isSorted ? FaSort : sort.direction === 'asc' ? FaSortUp : FaSortDown;
                      return (
                        <th key={column.key} className="px-4 py-3 text-left">
                          <button
                            type="button"
                            onClick={() => toggleSort(column.key)}
                            className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide ${
                              isSorted ? 'text-slate-900' : 'text-slate-500'
                            } hover:text-slate-900`}
                          >
                            {column.label}
                            <Icon className="text-[10px]" />
                          </button>
                        </th>
                      );
                    })}
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Toiminnot
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {visibleMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-slate-50">
                      {COLUMNS.map((column) => (
                        <td
                          key={column.key}
                          className={`px-4 py-3 text-sm ${
                            column.key === 'edited_at' ? 'text-slate-500' : 'text-slate-700'
                          }`}
                        >
                          {renderCell(member, column)}
                        </td>
                      ))}
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
        </>
      )}
    </section>
  );
}

MembersTable.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default MembersTable;
