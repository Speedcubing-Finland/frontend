import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Renders a link that looks like a button, for navigation in InfoSection, etc.
 * Does NOT affect your existing Button with onClick for forms.
 */
function LinkButton({ to, children, className = '' }) {
  return (
    <Link
      to={to}
      className={`inline-block bg-brandColor text-white font-bold py-2 px-4 rounded hover:bg-blue-700 active:bg-blue-900 hover:text-white transition-colors ${className}`}
      style={{ color: 'white' }} // Explicitly set text color to white
    >
      {children}
    </Link>
  );
}

LinkButton.propTypes = {
  to: PropTypes.string.isRequired, // The route/path to navigate to
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Removed defaultProps

export default LinkButton;
