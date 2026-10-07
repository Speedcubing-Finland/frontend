import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaRegCalendarAlt } from 'react-icons/fa';
import { useAnnouncements } from '../../utilities/useAnnouncements';
import { formatDateTime } from '../../utilities/dates';

/**
 * Site-wide notice for an upcoming meeting.
 *
 * Meeting invitations are statutory, so this sits above everything else and
 * is not dismissible - it disappears by itself the day after the meeting.
 */
function AnnouncementBanner() {
  const announcements = useAnnouncements();
  const [isOpen, setIsOpen] = useState(false);

  const invitation = announcements.find((item) => item.type === 'meeting_invitation');
  if (!invitation) return null;

  return (
    <div className="border-b border-amber-300 bg-amber-50">
      <div className="mx-auto w-full max-w-[1500px] px-4 py-3">
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="flex w-full items-start gap-3 text-left"
          aria-expanded={isOpen}
        >
          <FaRegCalendarAlt className="mt-1 shrink-0 text-amber-700" />
          <span className="min-w-0 flex-1">
            <span className="block font-bold text-amber-900">{invitation.title}</span>
            <span className="block text-sm text-amber-800">
              {formatDateTime(invitation.meeting_at)}
              {invitation.location ? ` — ${invitation.location}` : ''}
            </span>
          </span>
          <span className="mt-1 shrink-0 text-amber-700">
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </button>

        {isOpen && (
          <div className="mt-3 whitespace-pre-line border-t border-amber-200 pt-3 text-sm text-amber-900">
            {invitation.body}
          </div>
        )}
      </div>
    </div>
  );
}

export default AnnouncementBanner;
