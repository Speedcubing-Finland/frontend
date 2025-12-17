import PropTypes from 'prop-types';

function Title({ children }) {
  return (
    <div className="title-section">
      <h1 className="title-text">
        {children}
      </h1>
    </div>
  );
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Title;