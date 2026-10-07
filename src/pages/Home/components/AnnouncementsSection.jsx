import { FaBullhorn, FaMapMarkerAlt, FaRegCalendarAlt } from 'react-icons/fa';
import { useAnnouncements } from '../../../utilities/useAnnouncements';
import { formatDate, formatDateTime } from '../../../utilities/dates';

function AnnouncementsSection() {
  const announcements = useAnnouncements();
  if (announcements.length === 0) return null;

  return (
    <section id="tiedotteet" className="mx-auto w-full max-w-5xl px-4 py-12">
      <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-brand-primary sm:text-3xl">
        <FaBullhorn className="text-brand-secondary" />
        Ajankohtaista
      </h2>

      <div className="space-y-6">
        {announcements.map((announcement) => {
          const isInvitation = announcement.type === 'meeting_invitation';

          return (
            <article
              key={announcement.id}
              className={`rounded-xl border p-6 shadow-sm ${
                isInvitation ? 'border-amber-300 bg-amber-50' : 'border-slate-200 bg-white'
              }`}
            >
              {isInvitation && (
                <span className="mb-3 inline-block rounded-full bg-amber-200 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-900">
                  Kokouskutsu
                </span>
              )}

              <h3 className={`text-xl font-bold ${isInvitation ? 'text-amber-900' : 'text-slate-900'}`}>
                {announcement.title}
              </h3>

              {isInvitation && (
                <dl className="mt-3 space-y-1 text-sm font-medium text-amber-900">
                  <div className="flex items-center gap-2">
                    <FaRegCalendarAlt className="text-amber-700" />
                    {formatDateTime(announcement.meeting_at)}
                  </div>
                  {announcement.location && (
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-amber-700" />
                      {announcement.location}
                    </div>
                  )}
                </dl>
              )}

              <div
                className={`mt-4 whitespace-pre-line leading-relaxed ${
                  isInvitation ? 'text-amber-900' : 'text-slate-700'
                }`}
              >
                {announcement.body}
              </div>

              <p className="mt-4 text-xs text-slate-500">
                Julkaistu {formatDate(announcement.published_at)}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default AnnouncementsSection;
