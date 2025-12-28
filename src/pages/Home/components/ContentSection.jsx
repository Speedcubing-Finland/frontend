import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ContentSection({ 
  title, 
  text, 
  imageSrc, 
  imageAlt, 
  buttonLabel, 
  buttonLink, 
  imageLeft = false,
  index = 0
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const imageVariants = {
    hidden: { opacity: 0, x: imageLeft ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  
  const textVariants = {
    hidden: { opacity: 0, x: imageLeft ? 50 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
  };
  
  return (
    <section 
      ref={ref}
      className={`content-section ${index % 2 === 1 ? 'content-section-alt' : ''}`}
    >
      <div className={`content-wrapper ${imageLeft ? 'content-wrapper-reverse' : ''}`}>
        {/* Image */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="content-image-wrapper"
        >
          <div className="content-image-container">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="content-image"
            />
            <div className="content-image-overlay" />
          </div>
        </motion.div>
        
        {/* Text Content */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="content-text"
        >
          <h2 className="content-title">{title}</h2>
          <p className="content-description">{text}</p>
          {buttonLabel && buttonLink && (
            <Link to={buttonLink} className="content-button">
              {buttonLabel}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}

ContentSection.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string,
  buttonLink: PropTypes.string,
  imageLeft: PropTypes.bool,
  index: PropTypes.number,
};

export default ContentSection;
