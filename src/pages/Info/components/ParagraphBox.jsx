import PropTypes from 'prop-types';

function ParagraphBox({ title, children }) {
  return (
    <div className="page-paragraph">
      {title && <h3 className="paragraph-title">{title}</h3>}
      {/* Use div to wrap children instead of p */}
      <div>{children}</div>
    </div>
  );
}

ParagraphBox.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ParagraphBox;
