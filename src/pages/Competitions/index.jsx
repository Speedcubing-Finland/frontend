import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaTrophy, FaCalendarAlt, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
import EventList from './components/EventList';
import CompetitionTable from './components/CompetitionTable';
import { fetchUpcomingCompetitions } from '../../utilities/wcaApi';
import wcaEvents from '../../data/wcaEvents';

function Competitions() {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCompetitions = async () => {
      const data = await fetchUpcomingCompetitions();
      setCompetitions(data);
      setLoading(false);
    };

    loadCompetitions();
  }, []);

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
            Kilpailut
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
          >
            Osallistu virallisiin WCA-kilpailuihin Suomessa. Kilpailut ovat avoimia kaikille harrastajille.
          </motion.p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 px-6 bg-white border-b">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4">
            <FaTrophy className="text-3xl text-brand-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">
              {loading ? (
                <svg className="inline-block w-6 h-6 animate-spin text-brand-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                competitions.length
              )}
            </div>
            <div className="text-sm text-gray-600">Tulevia kilpailuja</div>
          </div>
          <div className="text-center p-4">
            <FaCalendarAlt className="text-3xl text-brand-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">17</div>
            <div className="text-sm text-gray-600">Virallista lajia</div>
          </div>
          <div className="text-center p-4">
            <FaUsers className="text-3xl text-brand-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">Avoin</div>
            <div className="text-sm text-gray-600">Kaikille harrastajille</div>
          </div>
          <div className="text-center p-4">
            <FaMapMarkerAlt className="text-3xl text-brand-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">Suomi</div>
            <div className="text-sm text-gray-600">Ympäri maata</div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* About Competitions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-md p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Yleistä kilpailuista</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed">
              <p>
                Kaikki Speedcubing Finlandin järjestämät kilpailut ovat avoimia kaikille harrastajille. 
                Kilpailuja järjestetään Suomessa useita kertoja vuodessa. Kaikki Suomessa järjestettävät 
                kilpailut noudattavat kansainvälisen kattojärjestön{' '}
                <a href="https://www.worldcubeassociation.org/" target="_blank" rel="noopener noreferrer" className="text-brand-secondary hover:underline font-medium">
                  World Cube Associationin
                </a>{' '}
                sääntöjä, ja kaikki kilpailuissa tehdyt tulokset rekisteröidään WCA:n{' '}
                <a href="https://www.worldcubeassociation.org/results/rankings/333/single" target="_blank" rel="noopener noreferrer" className="text-brand-secondary hover:underline font-medium">
                  tuloskantaan.
                </a>
              </p>
              <p>
                Kilpailuissa kilpaillaan 17 virallisessa lajissa. Kaikissa kilpailuissa ei kuitenkaan 
                järjestetä kaikkia lajeja, vaan kilpailun järjestäjä päättää kilpailussa järjestettävät lajit.
              </p>
            </div>
          </motion.div>

          {/* Events Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-md p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">WCA:n viralliset lajit</h2>
            <p className="text-gray-600 mb-6">
              WCA tunnustaa 17 virallista lajia. Klikkaa tai pidä kursori lajin päällä nähdäksesi kuvaus.
            </p>
            <EventList events={wcaEvents} />
          </motion.div>

          {/* When to Compete */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-md p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Milloin kilpailemaan?</h2>
            <div className="text-gray-600 space-y-4 leading-relaxed">
              <p>
                Kilpailuihin osallistuminen on erinomainen tapa kehittää taitojasi ja tutustua muihin 
                harrastajiin. Kilpailuihin voi osallistua kuka tahansa, joka osaa ratkaista kuution 
                vähintään yhdessä WCA:n tunnustamassa lajissa.
              </p>
              <p>
                Suosituimpia lajeja tavallisen 3x3x3 kuution lisäksi aloittelijoiden keskuudessa ovat 
                esimerkiksi <strong>2x2x2</strong>, <strong>Pyraminx</strong> ja <strong>Skewb</strong>. 
                Näissä lajeissa ei useimmiten ole tiukkoja aikarajoja.
              </p>
              <p>
                Ennen ensimmäistä kilpailuasi tulee luoda tili WCA:n sivuille ja tutustua sääntöihin. 
                Säännöt löytyvät suomenkielisinä{' '}
                <a href="https://www.worldcubeassociation.org/regulations/translations/finnish/" target="_blank" rel="noopener noreferrer" className="text-brand-secondary hover:underline font-medium">
                  täältä.
                </a>
              </p>
            </div>
          </motion.div>

          {/* Competition Calendar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-md p-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Kilpailukalenteri</h2>
              <a 
                href="https://www.worldcubeassociation.org/competitions?region=Finland" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-secondary hover:underline text-sm mt-2 md:mt-0"
              >
                Näytä kaikki WCA:n sivuilla →
              </a>
            </div>
            <p className="text-gray-600 mb-6">
              Klikkaamalla kilpailun nimeä pääset kilpailusivulle, jossa voit rekisteröityä ja lukea lisätietoja.
            </p>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-4 border-brand-secondary border-t-transparent rounded-full mx-auto"></div>
                <p className="text-gray-500 mt-4">Ladataan kilpailuja...</p>
              </div>
            ) : competitions.length > 0 ? (
              <CompetitionTable competitions={competitions} />
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FaCalendarAlt className="text-4xl mx-auto mb-4 opacity-50" />
                <p>Ei tulevia kilpailuja tällä hetkellä.</p>
              </div>
            )}
          </motion.div>

          {/* Organize Competition CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl shadow-lg p-8 text-white"
          >
            <h2 className="text-2xl font-bold mb-4">Haluaisitko järjestää kilpailut?</h2>
            <div className="space-y-4 text-white/90 leading-relaxed">
              <p>
                Mikäli olet kiinnostunut järjestämään speedcubing-kilpailut, ota yhteyttä johonkin Suomen 
                kolmesta WCA:n valtuuttamasta delegaatista. Delegaatit auttavat kilpailun järjestämisessä 
                ja varmistavat, että kilpailu noudattaa WCA:n sääntöjä.
              </p>
              <p>
                Vähimmillään kilpailun järjestäminen vaatii vain kilpailupaikan hankkimista. Kaikki 
                tarvittava kalusto löytyy Speedcubing Finlandilta.
              </p>
            </div>
            <Link 
              to="/contact" 
              className="inline-block mt-6 px-6 py-3 bg-white text-brand-secondary font-semibold rounded-full hover:shadow-lg transition-all hover:-translate-y-1"
            >
              Ota yhteyttä delegaatteihin
            </Link>
          </motion.div>

        </div>
      </section>
    </div>
  );
}

export default Competitions;
