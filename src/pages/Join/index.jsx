import { motion } from 'framer-motion';
import { FaUserPlus, FaCheckCircle, FaTicketAlt, FaEnvelope, FaShieldAlt } from 'react-icons/fa';
import JoinForm from './components/JoinForm';

function Join() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-light overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-lg rotate-12"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-white rounded-lg -rotate-12"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 border-2 border-white rounded-lg rotate-45"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Liity jäseneksi
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
          >
            Tule osaksi suomalaista speedcubing-yhteisöä! Jäseneksi liittyminen on helppoa ja ilmaista.
          </motion.p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 px-6 bg-white border-b">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-start gap-4 p-4"
          >
            <div className="bg-green-100 p-3 rounded-full">
              <FaCheckCircle className="text-2xl text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Ilmainen jäsenyys</h3>
              <p className="text-sm text-gray-600">Liittyminen ei maksa mitään</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-start gap-4 p-4"
          >
            <div className="bg-blue-100 p-3 rounded-full">
              <FaTicketAlt className="text-2xl text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Alennuksia</h3>
              <p className="text-sm text-gray-600">Alennus kilpailuiden osallistumismaksuista</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-start gap-4 p-4"
          >
            <div className="bg-purple-100 p-3 rounded-full">
              <FaEnvelope className="text-2xl text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Tiedotteet</h3>
              <p className="text-sm text-gray-600">Tiedot tulevista kilpailuista sähköpostiisi</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            
            {/* Info Column */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FaUserPlus className="text-2xl text-brand-secondary" />
                  <h2 className="text-xl font-bold text-gray-800">Miksi liittyä?</h2>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-secondary mt-1">✓</span>
                    <span>Alennukset kilpailuiden osallistumismaksuista</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-secondary mt-1">✓</span>
                    <span>Tiedot tulevista kilpailuista ja tapahtumista</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-secondary mt-1">✓</span>
                    <span>Voit liittyä, vaikka et olisi vielä kilpaillut</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-secondary mt-1">✓</span>
                    <span>Tuet suomalaista speedcubing-toimintaa</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <FaShieldAlt className="text-xl text-brand-secondary" />
                  <h3 className="font-semibold text-gray-800">Tietosuoja</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Jäsentietojasi ei jaeta kolmansille osapuolille. Tietoja käytetään ainoastaan 
                  jäsenrekisterin ylläpitoon sekä kilpailutoiminnan kehittämiseen.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">
                  Mikäli haluat poistaa tai muokata tietojasi, ota yhteyttä hallitukseen.
                </p>
              </div>

              <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
                <p className="text-sm text-gray-700">
                  <strong>💡 Vinkki:</strong> Jos et ole vielä kilpaillut, jätä WCA ID -kenttä tyhjäksi. 
                  Saat oman WCA ID:n ensimmäisen kilpailun jälkeen.
                </p>
              </div>
            </motion.div>

            {/* Form Column */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <JoinForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Join;
