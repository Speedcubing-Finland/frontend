import { motion } from 'framer-motion';
import { FaEnvelope, FaUsers, FaGlobe, FaFileInvoice, FaExternalLinkAlt } from 'react-icons/fa';

function Contact() {
  const boardMembers = [
    { name: 'Tomi Ronkainen', role: 'Puheenjohtaja' },
    { name: 'Niko Ronkainen', role: 'Varapuheenjohtaja' },
    { name: 'Timo Norrkniivilä', role: 'Rahastonhoitaja' },
    { name: 'Arttu Puttonen', role: 'Sihteeri' },
    { name: 'Jarno Viljanen', role: 'Jäsen' },
  ];

  const delegates = [
    { name: 'Niko Ronkainen', email: 'nronkainen@worldcubeassociation.org' },
    { name: 'Tomi Ronkainen', email: 'tronkainen@worldcubeassociation.org' },
    { name: 'Olli Vikstedt', email: 'ovikstedt@worldcubeassociation.org' },
  ];

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
            Ota yhteyttä
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
          >
            Meille voi olla yhteydessä kaikissa yhdistykseen ja kilpailuihin liittyvissä asioissa.
          </motion.p>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-8 px-6 bg-white border-b">
        <div className="max-w-5xl mx-auto">
          <motion.a 
            href="mailto:hallitus@speedcubingfinland.fi"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-4 p-6 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl text-white hover:opacity-90 transition-opacity"
          >
            <FaEnvelope className="text-3xl" />
            <div className="text-center md:text-left">
              <div className="text-sm opacity-80">Yleiset yhteydenotot</div>
              <div className="text-xl md:text-2xl font-bold">hallitus@speedcubingfinland.fi</div>
            </div>
          </motion.a>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Board Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-6">
                <div className="flex items-center gap-3">
                  <FaUsers className="text-2xl text-white" />
                  <h2 className="text-xl font-bold text-white">Hallitus 2025</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  Kaikissa yhdistyksen toimintaan liittyvissä kysymyksissä voit ottaa yhteyttä hallitukseen.
                </p>
                <ul className="space-y-3">
                  {boardMembers.map((member, index) => (
                    <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-800">{member.name}</span>
                      <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">{member.role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Delegates Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-6">
                <div className="flex items-center gap-3">
                  <FaGlobe className="text-2xl text-white" />
                  <h2 className="text-xl font-bold text-white">WCA-delegaatit</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  Kilpailuihin tai kilpailujen järjestämiseen liittyvissä asioissa voit ottaa yhteyttä 
                  suoraan johonkin Suomen WCA-delegaatista.
                </p>
                <ul className="space-y-3">
                  {delegates.map((delegate, index) => (
                    <li key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-800 mb-1">{delegate.name}</div>
                      <a 
                        href={`mailto:${delegate.email}`}
                        className="text-sm text-brand-secondary hover:underline break-all"
                      >
                        {delegate.email}
                      </a>
                    </li>
                  ))}
                </ul>
                <a 
                  href="https://www.worldcubeassociation.org/delegates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-sm text-brand-secondary hover:underline"
                >
                  Lisätietoja WCA-delegaateista
                  <FaExternalLinkAlt className="text-xs" />
                </a>
              </div>
            </motion.div>

          </div>

          {/* Billing Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-8 bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-6">
              <div className="flex items-center gap-3">
                <FaFileInvoice className="text-2xl text-white" />
                <h2 className="text-xl font-bold text-white">Laskutustiedot</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                Yhdistys ottaa laskuja vastaan sähköpostitse. Laskutuksen yhteystiedot:
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Vastaanottaja</div>
                  <div className="font-semibold text-gray-800">Speedcubing Finland ry</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Y-tunnus</div>
                  <div className="font-semibold text-gray-800">3501504-2</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Sähköposti</div>
                  <a 
                    href="mailto:hallitus@speedcubingfinland.fi"
                    className="font-semibold text-brand-secondary hover:underline"
                  >
                    hallitus@speedcubingfinland.fi
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}

export default Contact;
