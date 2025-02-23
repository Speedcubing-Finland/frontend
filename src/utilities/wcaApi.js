export const fetchUpcomingCompetitions = async () => {
    const country = 'FI'; // Finland
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const url = `https://www.worldcubeassociation.org/api/v0/competitions?country_iso2=${country}&start=${today}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch competitions');
      }
      const data = await response.json();
      return data; // Returns array of competitions
    } catch (error) {
      console.error('Error fetching WCA competitions:', error);
      return [];
    }
  };
  