import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaBullhorn, FaPen, FaPlus, FaTrash } from 'react-icons/fa';
import { api } from '../../../utilities/api';
import { formatDateTime, toDateTimeInputValue } from '../../../utilities/dates';

const EMPTY_FORM = {
  type: 'news',
  title: '',
  body: '',
  meeting_at: '',
  location: '',
};

const TYPE_LABELS = {
  meeting_invitation: 'Kokouskutsu',
  news: 'Tiedote',
};

function AnnouncementsPanel({ onStatus }) {
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.get('/api/admin/announcements');
      setAnnouncements(Array.isArray(data) ? data : []);
    } catch (error) {
      onStatus({ type: 'error', text: `Tiedotteiden lataus epäonnistui: ${error.message}` });
    } finally {
      setIsLoading(false);
    }
  }, [onStatus]);

  useEffect(() => {
    load();
  }, [load]);

  const setField = (name) => (event) => setForm((prev) => ({ ...prev, [name]: event.target.value }));

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  // <input type="datetime-local"> gives 2026-11-15T18:00; MySQL wants a space and seconds
  const payloadFromForm = () => ({
    ...form,
    meeting_at: form.meeting_at ? `${form.meeting_at.replace('T', ' ')}:00` : '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    try {
      if (editingId) {
        await api.put(`/api/admin/announcements/${editingId}`, payloadFromForm());
        onStatus({ type: 'success', text: 'Tiedote päivitetty.' });
      } else {
        await api.post('/api/admin/announcements', payloadFromForm());
        onStatus({ type: 'success', text: 'Luonnos tallennettu. Muista julkaista se.' });
      }
      resetForm();
      await load();
    } catch (error) {
      onStatus({ type: 'error', text: `Tallennus epäonnistui: ${error.message}` });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (announcement) => {
    setEditingId(announcement.id);
    setForm({
      type: announcement.type,
      title: announcement.title,
      body: announcement.body,
      meeting_at: toDateTimeInputValue(announcement.meeting_at),
      location: announcement.location || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePublish = async (announcement) => {
    const when = announcement.type === 'meeting_invitation'
      ? `Julkaistaanko kokouskutsu "${announcement.title}" sivustolle nyt?\n\nJulkaisupäivä tallentuu pysyvästi eikä sitä voi muuttaa jälkikäteen.`
      : `Julkaistaanko tiedote "${announcement.title}" sivustolle nyt?`;
    if (!window.confirm(when)) return;

    try {
      await api.post(`/api/admin/announcements/${announcement.id}/publish`, {});
      onStatus({ type: 'success', text: 'Julkaistu sivustolle.' });
      await load();
    } catch (error) {
      onStatus({ type: 'error', text: `Julkaisu epäonnistui: ${error.message}` });
    }
  };

  const handleDelete = async (announcement) => {
    if (!window.confirm(`Poistetaanko "${announcement.title}" pysyvästi?`)) return;
    try {
      await api.delete(`/api/admin/announcements/${announcement.id}`);
      onStatus({ type: 'success', text: 'Tiedote poistettu.' });
      await load();
    } catch (error) {
      onStatus({ type: 'error', text: `Poisto epäonnistui: ${error.message}` });
    }
  };

  const isInvitation = form.type === 'meeting_invitation';

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <FaBullhorn className="text-brand-secondary" />
            {editingId ? 'Muokkaa tiedotetta' : 'Uusi tiedote'}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Kokouskutsu näkyy etusivulla ja sivuston yläbannerissa kokouspäivään asti.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Tyyppi
              <select
                value={form.type}
                onChange={setField('type')}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-brand-secondary focus:outline-none focus:ring-1 focus:ring-brand-secondary"
              >
                <option value="news">Tiedote</option>
                <option value="meeting_invitation">Kokouskutsu</option>
              </select>
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Otsikko <span className="text-red-600">*</span>
              <input
                type="text"
                value={form.title}
                onChange={setField('title')}
                required
                maxLength={200}
                placeholder="esim. Kutsu syyskokoukseen 2026"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-brand-secondary focus:outline-none focus:ring-1 focus:ring-brand-secondary"
              />
            </label>

            {isInvitation && (
              <>
                <label className="block text-sm font-medium text-slate-700">
                  Kokouksen ajankohta <span className="text-red-600">*</span>
                  <input
                    type="datetime-local"
                    value={form.meeting_at}
                    onChange={setField('meeting_at')}
                    required
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-brand-secondary focus:outline-none focus:ring-1 focus:ring-brand-secondary"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Paikka <span className="text-red-600">*</span>
                  <input
                    type="text"
                    value={form.location}
                    onChange={setField('location')}
                    required
                    maxLength={200}
                    placeholder="esim. Kokoustila X, Helsinki tai Teams-linkki"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-brand-secondary focus:outline-none focus:ring-1 focus:ring-brand-secondary"
                  />
                </label>
              </>
            )}
          </div>

          <label className="block text-sm font-medium text-slate-700">
            Sisältö <span className="text-red-600">*</span>
            {isInvitation && (
              <span className="ml-1 font-normal text-slate-500">(esityslista, käsiteltävät asiat)</span>
            )}
            <textarea
              value={form.body}
              onChange={setField('body')}
              required
              rows={8}
              placeholder={isInvitation
                ? 'Esityslista:\n1. Kokouksen avaus\n2. Laillisuuden ja päätösvaltaisuuden toteaminen\n...'
                : 'Tiedotteen teksti'}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm text-slate-900 focus:border-brand-secondary focus:outline-none focus:ring-1 focus:ring-brand-secondary"
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-secondary px-4 py-2 font-semibold text-white hover:opacity-90 disabled:opacity-60"
            >
              <FaPlus className="text-sm" />
              {isSaving ? 'Tallennetaan...' : editingId ? 'Tallenna muutokset' : 'Tallenna luonnos'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Peruuta
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-xl font-bold text-slate-900">Tiedotteet</h2>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center px-6 py-10">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-brand-secondary border-t-transparent" />
          </div>
        ) : announcements.length === 0 ? (
          <p className="px-6 py-10 text-center text-slate-500">Ei tiedotteita.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {announcements.map((announcement) => (
              <li key={announcement.id} className="px-5 py-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        announcement.type === 'meeting_invitation'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {TYPE_LABELS[announcement.type]}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        announcement.published_at ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {announcement.published_at ? 'Julkaistu' : 'Luonnos'}
                      </span>
                    </div>
                    <h3 className="mt-2 font-semibold text-slate-900">{announcement.title}</h3>
                    <p className="mt-1 whitespace-pre-line text-sm text-slate-600 line-clamp-3">
                      {announcement.body}
                    </p>
                    <dl className="mt-2 space-y-0.5 text-xs text-slate-500">
                      {announcement.meeting_at && (
                        <div>Kokous: {formatDateTime(announcement.meeting_at)} — {announcement.location}</div>
                      )}
                      {announcement.published_at && (
                        <div>Julkaistu: {formatDateTime(announcement.published_at)}</div>
                      )}
                      {announcement.expires_at && (
                        <div>Näkyy sivustolla: {formatDateTime(announcement.expires_at)} asti</div>
                      )}
                      {announcement.edited_at && (
                        <div>Muokattu: {formatDateTime(announcement.edited_at)}</div>
                      )}
                    </dl>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    {!announcement.published_at && (
                      <button
                        type="button"
                        onClick={() => handlePublish(announcement)}
                        className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-emerald-700"
                      >
                        Julkaise
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleEdit(announcement)}
                      className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <FaPen className="text-xs" />
                      Muokkaa
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(announcement)}
                      className="inline-flex items-center gap-2 rounded-md border border-red-300 px-3 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-50"
                    >
                      <FaTrash className="text-xs" />
                      Poista
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

AnnouncementsPanel.propTypes = {
  onStatus: PropTypes.func.isRequired,
};

export default AnnouncementsPanel;
