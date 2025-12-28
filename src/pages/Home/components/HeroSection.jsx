import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Animated floating cube component
const FloatingCube = ({ delay, size, position }) => (
  <motion.div
    className="absolute opacity-20"
    style={{
      ...position,
      width: size,
      height: size,
    }}
    animate={{
      y: [0, -20, 0],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect
        x="10"
        y="10"
        width="80"
        height="80"
        rx="8"
        fill="none"
        stroke="white"
        strokeWidth="3"
      />
      <line x1="36" y1="10" x2="36" y2="90" stroke="white" strokeWidth="2" />
      <line x1="64" y1="10" x2="64" y2="90" stroke="white" strokeWidth="2" />
      <line x1="10" y1="36" x2="90" y2="36" stroke="white" strokeWidth="2" />
      <line x1="10" y1="64" x2="90" y2="64" stroke="white" strokeWidth="2" />
    </svg>
  </motion.div>
);

function HeroSection() {
  return (
    <section className="hero-section">
      {/* Animated gradient background */}
      <div className="hero-gradient" />
      
      {/* Floating cube decorations */}
      <FloatingCube delay={0} size="80px" position={{ top: '15%', left: '10%' }} />
      <FloatingCube delay={1} size="60px" position={{ top: '60%', left: '5%' }} />
      <FloatingCube delay={2} size="100px" position={{ top: '20%', right: '8%' }} />
      <FloatingCube delay={1.5} size="50px" position={{ top: '70%', right: '15%' }} />
      <FloatingCube delay={0.5} size="70px" position={{ bottom: '20%', left: '20%' }} />
      
      {/* Main content */}
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="hero-badge">
            🏆 Suomen virallinen speedcubing-yhdistys
          </span>
        </motion.div>
        
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Speedcubing
          <span className="hero-title-highlight"> Finland</span>
        </motion.h1>
        
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          Liity Suomen kasvavaan speedcubing-yhteisöön. 
          Kilpailuja, tapahtumia ja intohimoa pulmapeleihin.
        </motion.p>
        
        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <Link to="/join" className="hero-btn-primary">
            Liity jäseneksi
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link to="/competitions" className="hero-btn-secondary">
            Tulevat kilpailut
          </Link>
        </motion.div>
      </div>
      
      {/* Scroll indicator - positioned relative to hero section */}
      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
