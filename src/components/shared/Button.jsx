import PropTypes from 'prop-types';

function Button({ onClick, children, type = 'button', className = '' }) {
  return (
    <button
      type={type}
      className={`button ${className}`} // Apply the general button styles
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
};

export default Button;
