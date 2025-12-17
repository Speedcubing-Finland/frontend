import PropTypes from 'prop-types';
import LinkButton from '../../../components/shared/LinkButton';

function InfoSection({
  title,
  text,
  buttonLabel = '',
  buttonLink = '',
  imageSrc,
  imageAlt,
  imageLeft = false,
}) {
  // Switch order on medium+ screens if imageLeft is true
  const orderClasses = imageLeft
    ? 'md:flex-row-reverse'
    : 'md:flex-row';

  return (
    <div className={`flex flex-col ${orderClasses} items-start gap-8 mt-8`}>
      {/* Image Block */}
      <div className="md:w-1/2 px-4">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="max-w-[450px] w-full h-auto rounded shadow"
        />
      </div>

      {/* Text Block */}
      <div className="md:w-1/2 px-4">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700 mb-4">{text}</p>

        {/* Add a small gap above the link */}
        {buttonLabel && buttonLink && (
          <div className="mt-10">
            <LinkButton to={buttonLink}>{buttonLabel}</LinkButton>
          </div>
        )}
      </div>
    </div>
  );
}

InfoSection.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string,
  buttonLink: PropTypes.string,
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  imageLeft: PropTypes.bool,
};

export default InfoSection;
