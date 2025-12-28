import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import wcaEvents from '../../../data/wcaEvents';
import EventTag from './EventTag';
import { FaExternalLinkAlt, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTimes } from 'react-icons/fa';

function EventsCell({ eventIds, isMobile = false }) {
  const [showAll, setShowAll] = useState(false);
  const visibleCount = isMobile ? 4 : 6;
  const hasMore = eventIds.length > visibleCount;
  const containerRef = useRef(null);
  
  // Close tooltip when clicking outside (for mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowAll(false);
      }
    };
    
    if (showAll) {
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAll]);
  
  return (
    <div className="relative" ref={containerRef}>
      <div className="flex flex-wrap gap-1.5">
        {eventIds.slice(0, visibleCount).map((eventId) => {
          const event = wcaEvents.find((e) => e.id === eventId);
          return (
            <EventTag
              key={eventId}
              name={event?.name || eventId}
              color={event?.color || '#ccc'}
            />
          );
        })}
        {hasMore && (
          <button
            // Desktop: hover, Mobile: click only
            onMouseEnter={() => !isMobile && setShowAll(true)}
            onMouseLeave={() => !isMobile && setShowAll(false)}
            onClick={() => setShowAll(!showAll)}
            className="px-2.5 py-1.5 text-sm bg-gray-200 text-gray-600 rounded-md font-medium hover:bg-gray-300 transition-colors cursor-pointer"
          >
            +{eventIds.length - visibleCount}
          </button>
        )}
      </div>
      
      {/* Tooltip showing all events - positioned ABOVE */}
      {showAll && hasMore && (
        <div 
          className="absolute z-50 bottom-full left-0 mb-2 p-4 bg-white rounded-xl shadow-2xl border border-gray-200 min-w-[250px] max-w-[300px]"
          onMouseEnter={() => !isMobile && setShowAll(true)}
          onMouseLeave={() => !isMobile && setShowAll(false)}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold text-gray-700">Kaikki lajit ({eventIds.length})</div>
            {/* Close button for mobile */}
            {isMobile && (
              <button 
                onClick={() => setShowAll(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <FaTimes className="text-sm" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {eventIds.map((eventId) => {
              const event = wcaEvents.find((e) => e.id === eventId);
              return (
                <EventTag
                  key={eventId}
                  name={event?.name || eventId}
                  color={event?.color || '#ccc'}
                />
              );
            })}
          </div>
          {/* Arrow pointer - now at bottom */}
          <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
        </div>
      )}
    </div>
  );
}

EventsCell.propTypes = {
  eventIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  isMobile: PropTypes.bool,
};

// Mobile card component
function CompetitionCard({ competition }) {
  const isSingleDay = competition.start_date === competition.end_date;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-4">
        <a
          href={`https://www.worldcubeassociation.org/competitions/${competition.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white font-semibold text-lg flex items-center gap-2 hover:underline"
        >
          {competition.name}
          <FaExternalLinkAlt className="text-sm opacity-70" />
        </a>
      </div>
      
      {/* Card Body */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-gray-600">
          <FaMapMarkerAlt className="text-brand-secondary" />
          <span>{competition.city}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600">
          <FaCalendarAlt className="text-brand-secondary" />
          <span>
            {isSingleDay
              ? new Date(competition.start_date).toLocaleDateString('fi-FI')
              : `${new Date(competition.start_date).toLocaleDateString('fi-FI')} - ${new Date(competition.end_date).toLocaleDateString('fi-FI')}`}
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600">
          <FaClock className="text-brand-secondary" />
          <span className="text-sm">
            Rekisteröinti: {new Date(competition.registration_open).toLocaleDateString('fi-FI')} - {new Date(competition.registration_close).toLocaleDateString('fi-FI')}
          </span>
        </div>
        
        {/* Events */}
        <div className="pt-2">
          <EventsCell eventIds={competition.event_ids} isMobile={true} />
        </div>
      </div>
    </div>
  );
}

CompetitionCard.propTypes = {
  competition: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
    event_ids: PropTypes.arrayOf(PropTypes.string).isRequired,
    registration_open: PropTypes.string.isRequired,
    registration_close: PropTypes.string.isRequired,
  }).isRequired,
};

function CompetitionTable({ competitions }) {
  // Get today's date
  const today = new Date();

  // Filter out past competitions
  const upcomingCompetitions = competitions.filter(
    (competition) => new Date(competition.end_date) >= today
  );

  // Sort competitions by start date
  const sortedCompetitions = [...upcomingCompetitions].sort(
    (a, b) => new Date(a.start_date) - new Date(b.start_date)
  );

  return (
    <>
      {/* Mobile: Card layout */}
      <div className="lg:hidden space-y-4">
        {sortedCompetitions.map((competition) => (
          <CompetitionCard key={competition.id} competition={competition} />
        ))}
      </div>

      {/* Desktop: Table layout */}
      <div className="hidden lg:block rounded-lg border border-gray-200 overflow-visible">
        <table className="w-full">
          <thead className="sticky top-0">
            <tr className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
              <th className="px-4 py-3 text-left font-semibold">Kilpailu</th>
              <th className="px-4 py-3 text-left font-semibold">Sijainti</th>
              <th className="px-4 py-3 text-left font-semibold">Ajankohta</th>
              <th className="px-4 py-3 text-left font-semibold">Lajit</th>
              <th className="px-4 py-3 text-left font-semibold">Rekisteröinti</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedCompetitions.map((competition, index) => {
              const isSingleDay = competition.start_date === competition.end_date;

              return (
                <tr 
                  key={competition.id} 
                  className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className="px-4 py-3">
                    <a
                      href={`https://www.worldcubeassociation.org/competitions/${competition.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-secondary hover:text-brand-primary font-medium flex items-center gap-2"
                    >
                      {competition.name}
                      <FaExternalLinkAlt className="text-sm opacity-60" />
                    </a>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {competition.city}
                  </td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                    {isSingleDay
                      ? new Date(competition.start_date).toLocaleDateString('fi-FI')
                      : `${new Date(competition.start_date).toLocaleDateString('fi-FI')} - ${new Date(competition.end_date).toLocaleDateString('fi-FI')}`}
                  </td>
                  <td className="px-4 py-3">
                    <EventsCell eventIds={competition.event_ids} />
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-sm">
                    {new Date(competition.registration_open).toLocaleDateString('fi-FI')} -{' '}
                    {new Date(competition.registration_close).toLocaleDateString('fi-FI')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

CompetitionTable.propTypes = {
  competitions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      start_date: PropTypes.string.isRequired,
      end_date: PropTypes.string.isRequired,
      event_ids: PropTypes.arrayOf(PropTypes.string).isRequired,
      registration_open: PropTypes.string.isRequired,
      registration_close: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CompetitionTable;
