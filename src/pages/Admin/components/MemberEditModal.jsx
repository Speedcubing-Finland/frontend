import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toDateInputValue } from '../../../utilities/dates';

const FIELDS = [
  { name: 'first_name', label: 'Etunimi', type: 'text', required: true },
  { name: 'last_name', label: 'Sukunimi', type: 'text', required: true },
  { name: 'city', label: 'Kaupunki', type: 'text', required: true },
  { name: 'email', label: 'Sähköposti', type: 'email', required: true },
  { name: 'birth_date', label: 'Syntymäaika', type: 'date', required: true },
  { name: 'wca_id', label: 'WCA ID', type: 'text', required: false },
];

function MemberEditModal({ member, onSave, onClose }) {
  const [form, setForm] = useState({
    first_name: member.first_name || '',
    last_name: member.last_name || '',
    city: member.city || '',
    email: member.email || '',
    birth_date: toDateInputValue(member.birth_date),
    wca_id: member.wca_id || '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleChange = (name) => (event) => {
    setForm((prev) => ({ ...prev, [name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      await onSave(member.id, form);
    } catch (err) {
      setError(`Tallennus epäonnistui: ${err.message || 'Tuntematon virhe'}`);
      setIsSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
        <div className="border-b border-slate-200 px-5 py-4">
          <h3 className="text-lg font-bold text-slate-900">Muokkaa jäsentä</h3>
          <p className="mt-1 text-sm text-slate-500">
            {member.first_name} {member.last_name}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FIELDS.map((field) => (
              <label key={field.name} className="block text-sm font-medium text-slate-700">
                {field.label}
                {field.required && <span className="text-red-600"> *</span>}
                <input
                  type={field.type}
                  value={form[field.name]}
                  onChange={handleChange(field.name)}
                  required={field.required}
                  disabled={isSaving}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-brand-secondary focus:outline-none focus:ring-1 focus:ring-brand-secondary disabled:bg-slate-100"
                />
              </label>
            ))}
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
            >
              Peruuta
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-lg bg-brand-secondary px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? 'Tallennetaan...' : 'Tallenna'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

MemberEditModal.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.string,
    email: PropTypes.string,
    birth_date: PropTypes.string,
    wca_id: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MemberEditModal;
