import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaTrophy, FaUsers, FaCube, FaGraduationCap } from 'react-icons/fa';

const features = [
  {
    icon: FaTrophy,
    title: 'Kilpailut',
    description: 'Osallistu virallisiin WCA-kilpailuihin ympäri Suomea. Kilpailuja järjestetään useita kertoja vuodessa.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: FaUsers,
    title: 'Yhteisö',
    description: 'Liity kasvavaan speedcubing-yhteisöön. Tapaa samanhenkisiä harrastajia ja jaa intohimosi.',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: FaCube,
    title: '17 Lajia',
    description: 'Kilpaile 17 virallisessa WCA-lajissa. Lajivalikoima on laaja, joten löydät varmasti suosikkisi.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: FaGraduationCap,
    title: 'Oppiminen',
    description: 'Opi uusia tekniikoita ja kehity harrastajana. Yksi parhaista tavoista kehittyä on kysyä vinkkejä kokeneemmilta ratkojilta.',
    color: 'from-cyan-500 to-cyan-600',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="feature-card"
    >
      <div className={`feature-icon-wrapper bg-gradient-to-br ${feature.color}`}>
        <feature.icon className="feature-icon" />
      </div>
      <h3 className="feature-title">{feature.title}</h3>
      <p className="feature-description">{feature.description}</p>
    </motion.div>
  );
}

function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section className="features-section" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="features-header"
      >
        <span className="features-eyebrow">Miksi Speedcubing Finland?</span>
        <h2 className="features-title">Kaikki mitä tarvitset speedcubingiin</h2>
        <p className="features-subtitle">
          Olemme yhdistys, joka tuo speedcubing-harrastajat yhteen ja järjestää virallisia kilpailuja Suomessa.
        </p>
      </motion.div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="features-grid"
      >
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} index={index} />
        ))}
      </motion.div>
    </section>
  );
}

export default FeaturesSection;
