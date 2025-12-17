import PropTypes from 'prop-types';

function EventTag({ name, color }) {
  return (
    <span
      className="event-tag px-2 py-1 rounded text-white"
      style={{ backgroundColor: color }}
    >
      {name}
    </span>
  );
}

EventTag.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default EventTag;
