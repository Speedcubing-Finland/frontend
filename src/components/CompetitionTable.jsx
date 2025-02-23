import PropTypes from 'prop-types';
import wcaEvents from '../data/wcaEvents';
import EventTag from './EventTag'; // Import the EventTag component

function CompetitionTable({ competitions }) {
  // Get today's date
  const today = new Date();

  // Filter out past competitions
  const upcomingCompetitions = competitions.filter(
    (competition) => new Date(competition.end_date) >= today
  );

  // Sort competitions by start date
  const sortedCompetitions = [...upcomingCompetitions].sort(
    (a, b) => new Date(a.start_date) - new Date(b.start_date)
  );

  return (
    <div className="overflow-x-auto"> {/* Make the table scrollable */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nimi</th>
            <th className="border p-2">Sijainti</th>
            <th className="border p-2">Ajankohta</th>
            <th className="border p-2">Lajit</th>
            <th className="border p-2">Rekisteröityminen</th>
          </tr>
        </thead>
        <tbody>
          {sortedCompetitions.map((competition) => {
            const isSingleDay =
              competition.start_date === competition.end_date;

            return (
              <tr key={competition.id} className="even:bg-gray-100">
                <td className="border p-2">
                  <a
                    href={`https://www.worldcubeassociation.org/competitions/${competition.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-color underline hover:no-underline"
                  >
                    {competition.name}
                  </a>
                </td>
                <td className="border p-2">{competition.city}</td>
                <td className="border p-2">
                  {isSingleDay
                    ? new Date(competition.start_date).toLocaleDateString()
                    : `${new Date(competition.start_date).toLocaleDateString()} - ${new Date(competition.end_date).toLocaleDateString()}`}
                </td>
                <td className="border p-2">
                  <div className="flex flex-wrap gap-2">
                    {competition.event_ids.map((eventId) => {
                      const event = wcaEvents.find((e) => e.id === eventId);
                      return (
                        <EventTag
                          key={eventId}
                          name={event?.name || eventId}
                          color={event?.color || '#ccc'}
                        />
                      );
                    })}
                  </div>
                </td>
                <td className="border p-2">
                  {new Date(competition.registration_open).toLocaleDateString()} -{' '}
                  {new Date(competition.registration_close).toLocaleDateString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

CompetitionTable.propTypes = {
  competitions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      start_date: PropTypes.string.isRequired,
      end_date: PropTypes.string.isRequired,
      event_ids: PropTypes.arrayOf(PropTypes.string).isRequired,
      registration_open: PropTypes.string.isRequired,
      registration_close: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CompetitionTable;
