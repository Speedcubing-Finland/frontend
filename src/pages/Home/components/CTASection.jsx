import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section className="cta-section" ref={ref}>
      <div className="cta-background">
        <div className="cta-gradient" />
        
        {/* Animated shapes */}
        <motion.div
          className="cta-shape cta-shape-1"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="cta-shape cta-shape-2"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <motion.div
        className="cta-content"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="cta-title">Valmiina aloittamaan?</h2>
        <p className="cta-text">
          Liity Speedcubing Finlandin jäseneksi ja saat alennusta kilpailumaksuista, 
          pääsyn jäsentapahtumiin ja osaksi Suomen parasta speedcubing-yhteisöä.
        </p>
        
        <motion.div
          className="cta-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Link to="/join" className="cta-btn-primary">
            Liity jäseneksi - Ilmaiseksi!
          </Link>
          <Link to="/contact" className="cta-btn-secondary">
            Ota yhteyttä
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default CTASection;
