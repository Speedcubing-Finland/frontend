import PropTypes from 'prop-types';

function EventTag({ name, color }) {
  return (
    <span
      className="px-2.5 py-1.5 rounded-md text-white text-sm font-medium shadow-sm"
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
