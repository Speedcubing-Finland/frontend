import { motion } from 'framer-motion';
import { FaHistory, FaLightbulb, FaShoppingCart, FaExternalLinkAlt } from 'react-icons/fa';
import kuutiostoreLogo from '../../assets/infopage/kuutiostore_logo-C4YUgNj6.webp';
import vanhaKuutio from '../../assets/infopage/vanhaKuutio-DbJwt25s.webp';

function Info() {
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
            Tietoa speedcubingista
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
          >
            Opi Rubikin kuution historiasta, ratkaisumenetelmistä ja kuinka valita oikea kuutio.
          </motion.p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 px-6 bg-white border-b">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="#historia" className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors group">
            <FaHistory className="text-3xl text-brand-secondary mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-semibold text-gray-800">Historia</div>
            <div className="text-sm text-gray-500">Kuution tarina</div>
          </a>
          <a href="#ratkaiseminen" className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors group">
            <FaLightbulb className="text-3xl text-brand-secondary mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-semibold text-gray-800">Ratkaiseminen</div>
            <div className="text-sm text-gray-500">Näin pääset alkuun</div>
          </a>
          <a href="#kuution-valinta" className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors group">
            <FaShoppingCart className="text-3xl text-brand-secondary mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-semibold text-gray-800">Kuution valinta</div>
            <div className="text-sm text-gray-500">Vinkkejä ostajalle</div>
          </a>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Historia Section */}
          <motion.div 
            id="historia"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-md overflow-hidden scroll-mt-24"
          >
            <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-6">
              <div className="flex items-center gap-3">
                <FaHistory className="text-2xl text-white" />
                <h2 className="text-2xl font-bold text-white">Historia</h2>
              </div>
            </div>
            <div className="p-8">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="lg:w-2/3">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Rubikin kuution keksi unkarilainen arkkitehti <strong>Ernő Rubik</strong> vuonna 1974. 
                    Kuutiosta tuli 1980-luvulla maailmanlaajuinen ilmiö, ja siitä lähtien se on pysynyt maailman tunnetuimpana 
                    pulmapelinä.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Vuonna 1982 järjestettiin ensimmäiset Rubikin kuution maailmanmestaruuskilpailut, joihin osallistui 19 kilpailijaa.
                    Kilpailut voitti yhdysvaltalainen <strong>Minh Thai</strong>, joka ratkaisi kuution 22,95 sekunnissa.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Seuraavat MM-kilpailut järjestettiin vasta vuonna 2003, jonka jälkeen MM-kilpailuja on järjestetty 
                    joka toinen vuosi. Vuonna 2004 perustettiin kansainvälinen kattojärjestö{' '}
                    <a 
                      href="https://www.worldcubeassociation.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-secondary hover:underline font-medium"
                    >
                      World Cube Association (WCA)
                    </a>
                    , jonka sääntöjä ja ohjeistuksia jokaisen virallisen kilpailun tulee nykyisin noudattaa.
                  </p>
                </div>
                <div className="lg:w-1/3">
                  <img
                    src={vanhaKuutio}
                    alt="Rubikin kuution historia"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Ratkaiseminen Section */}
          <motion.div 
            id="ratkaiseminen"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-md overflow-hidden scroll-mt-24"
          >
            <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-6">
              <div className="flex items-center gap-3">
                <FaLightbulb className="text-2xl text-white" />
                <h2 className="text-2xl font-bold text-white">Ohjeita ratkaisemiseen</h2>
              </div>
            </div>
            <div className="p-8">
              <p className="text-gray-600 leading-relaxed mb-6">
                Yleinen harhaluulo on, että Rubikin kuution ratkaiseminen olisi todella vaikeaa. 
                Todellisuudessa sen ratkaisemiseen on useita eri metodeja eri taitotasoille.
              </p>
              
              {/* Methods Grid */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-green-500">
                  <h3 className="font-semibold text-gray-800 mb-2">🌱 Aloittelijoiden metodi</h3>
                  <p className="text-sm text-gray-600">Layer-by-Layer - helpoin tapa oppia ratkaisemaan kuutio ensimmäistä kertaa.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <h3 className="font-semibold text-gray-800 mb-2">⚡ CFOP</h3>
                  <p className="text-sm text-gray-600">Cross, F2L, OLL, PLL - ylivoimaisesti suosituin nopeusratkontametodi.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-purple-500">
                  <h3 className="font-semibold text-gray-800 mb-2">🎯 Roux</h3>
                  <p className="text-sm text-gray-600">Vaihtoehtoinen metodi, joka minimoi kuution kääntämisen.</p>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">
                Ensimmäistä kertaa ratkaisua opetellessa kannattaa aloittaa <strong>aloittelijoiden metodista</strong>. 
                Mikäli tämän jälkeen haluat vielä tulla nopeammaksi ratkojaksi, kannattaa siirtyä nopeampiin metodeihin. 
                Netistä löytyy lukuisia opetusvideoita ja oppaita, joiden avulla pääset alkuun.
              </p>
            </div>
          </motion.div>

          {/* Kuution valinta Section */}
          <motion.div 
            id="kuution-valinta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-md overflow-hidden scroll-mt-24"
          >
            <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-6">
              <div className="flex items-center gap-3">
                <FaShoppingCart className="text-2xl text-white" />
                <h2 className="text-2xl font-bold text-white">Kuution valinta</h2>
              </div>
            </div>
            <div className="p-8">
              <div className="flex flex-col lg:flex-row items-start gap-8">
                <div className="lg:w-2/3">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Aloittelijan kannattaa valita laadukas, mutta edullinen kuutio. 
                    <strong> Kilpakäyttöön soveltuvia kuutioita saa jo noin 10-20 eurolla.</strong>
                  </p>
                  
                  {/* Key Features */}
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold text-gray-800 mb-3">🧲 Tärkeimmät ominaisuudet:</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-brand-secondary mt-1">✓</span>
                        <span><strong>Magneettisuus</strong> - auttaa sivuja pysähtymään oikeaan kohtaan</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-secondary mt-1">✓</span>
                        <span><strong>Säätöominaisuudet</strong> - muokkaa kääntyvyyttä itsellesi sopivaksi</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-secondary mt-1">✓</span>
                        <span><strong>Sulavuus</strong> - vähentää tökkimistä ja säästää aikaa</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-4">
                    Kilpakäyttöön soveltuvia kuutioita saa ostettua Suomessa esimerkiksi{' '}
                    <a 
                      href="https://kuutiostore.fi/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-secondary hover:underline font-medium"
                    >
                      Kuutiostore.fi
                    </a>{' '}
                    verkkokaupasta. Kuutiostoren valikoima on laaja ja keskittyy kilpakäyttöön suunnattuihin kuutioihin.
                  </p>

                  {/* Discount Code */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🎁</span>
                      <div>
                        <p className="text-gray-800 font-medium">Alennuskoodi Speedcubing Finlandin jäsenille:</p>
                        <p className="text-gray-600">
                          Käytä koodia <code className="bg-white px-2 py-1 rounded font-mono font-bold text-brand-secondary">scf5</code> ja saat 
                          <strong className="text-green-600"> 5% alennusta</strong> normaalihintaisista tuotteista!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-1/3">
                  <a 
                    href="https://kuutiostore.fi/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow group"
                  >
                    <img
                      src={kuutiostoreLogo}
                      alt="Kuutiostore logo"
                      className="w-full mb-4"
                    />
                    <div className="flex items-center justify-center gap-2 text-brand-secondary group-hover:underline">
                      <span>Vieraile verkkokaupassa</span>
                      <FaExternalLinkAlt className="text-sm" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-brand-primary to-brand-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-4"
          >
            Valmiina aloittamaan?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/90 text-lg mb-8"
          >
            Liity Speedcubing Finlandin jäseneksi ja osallistu kilpailuihin!
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a 
              href="/join" 
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Liity jäseneksi
            </a>
            <a 
              href="/competitions" 
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              Tulevat kilpailut
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Info;
