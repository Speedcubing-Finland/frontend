import PropTypes from 'prop-types';

function MeetingInvitation({ 
  title = "🍂 Kutsu Speedcubing Finlandin Syyskokoukseen",
  date = "18. lokakuuta 2025",
  location = "Kirkkonummen koulukeskus, SM-kilpailujen yhteydessä",
  eligibility = "Kaikki yhdistyksen jäsenet",
  description = "Tervetuloa Speedcubing Finlandin syyskokoukseen!",
  showAgenda = false,
  agendaItems = [
    "Toimintakertomus",
    "Tilinpäätös ja toiminnantarkastajan lausunto", 
    "Vastuuvapauden myöntäminen hallitukselle",
    "Toimintasuunnitelma ja talousarvio",
    "Muut kokouksessa käsiteltävät asiat"
  ],
  notice = "Kokoukseen osallistuminen edellyttää voimassa olevaa jäsenyyttä. Tarkemmat kokoustiedot ja paikka ilmoitetaan myöhemmin sähköpostitse jäsenille.",
  joinButtonText = "Liity jäseneksi",
  joinButtonLink = "/join",
  contactButtonText = "Kysymyksiä kokouksesta?",
  contactButtonLink = "/contact",
  bgGradient = "from-blue-500 to-blue-700"
}) {
  return (
    <div className={`bg-gradient-to-r ${bgGradient} text-white mx-4 my-6 rounded-lg shadow-lg`}>
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-3">{title}</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg mb-4">
            {description}
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
            {showAgenda ? (
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div>
                  <h3 className="text-lg font-semibold mb-2">📅 Kokoustiedot</h3>
                  <p className="mb-1 text-sm"><strong>Aika:</strong> {date}</p>
                  <p className="mb-1 text-sm"><strong>Paikka:</strong> {location}</p>
                  <p className="mb-1 text-sm"><strong>Osallistumisoikeus:</strong> {eligibility}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">📋 Esityslista</h3>
                  <ul className="space-y-0.5">
                    {agendaItems.map((item, index) => (
                      <li key={index} className="text-sm">• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-3">📅 Kokoustiedot</h3>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Aika:</strong> {date}</p>
                  <p className="text-sm"><strong>Paikka:</strong> {location}</p>
                  <p className="text-sm"><strong>Osallistumisoikeus:</strong> {eligibility}</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={joinButtonLink}
              className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors text-sm"
            >
              {joinButtonText}
            </a>
            <a
              href={contactButtonLink}
              className="bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-900 transition-colors text-sm"
            >
              {contactButtonText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

MeetingInvitation.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  location: PropTypes.string,
  eligibility: PropTypes.string,
  description: PropTypes.string,
  showAgenda: PropTypes.bool,
  agendaItems: PropTypes.arrayOf(PropTypes.string),
  notice: PropTypes.string,
  joinButtonText: PropTypes.string,
  joinButtonLink: PropTypes.string,
  contactButtonText: PropTypes.string,
  contactButtonLink: PropTypes.string,
  bgGradient: PropTypes.string
};

export default MeetingInvitation;
