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
      className={`button ${className}`}
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
