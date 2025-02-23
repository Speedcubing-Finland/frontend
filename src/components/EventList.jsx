import PropTypes from 'prop-types';

function EventList({ events }) {
  return (
    <div className="event-list flex flex-wrap gap-3">
      {events.map((event, index) => (
        <span
          key={index}
          className={`event-tag px-3 py-1 rounded text-white font-semibold`}
          style={{ backgroundColor: event.color }}
        >
          {event.name}
        </span>
      ))}
    </div>
  );
}

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EventList;
