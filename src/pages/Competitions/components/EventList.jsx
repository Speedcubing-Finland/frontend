import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

function EventTag({ event }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const containerRef = useRef(null);
  
  // Close tooltip when clicking outside (for mobile)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowTooltip(false);
      }
    };
    
    if (showTooltip) {
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTooltip]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
        className="px-3 py-1.5 rounded-md text-white font-semibold text-sm cursor-pointer transition-all hover:scale-105 hover:shadow-md"
        style={{ backgroundColor: event.color }}
      >
        {event.name}
      </button>
      
      {/* Tooltip */}
      {showTooltip && (
        <div 
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 p-3 bg-white rounded-lg shadow-xl border border-gray-200 min-w-[200px] max-w-[250px]"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <div className="font-semibold text-gray-800 mb-1">{event.name}</div>
          <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>
          <a 
            href={`https://www.worldcubeassociation.org/results/rankings/${event.id}/single`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-xs text-brand-secondary hover:underline"
          >
            Katso WCA-tulokset →
          </a>
          {/* Arrow */}
          <div 
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45"
          ></div>
        </div>
      )}
    </div>
  );
}

EventTag.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

function EventList({ events }) {
  return (
    <div className="flex flex-wrap gap-3">
      {events.map((event) => (
        <EventTag key={event.id} event={event} />
      ))}
    </div>
  );
}

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EventList;
