import { useEffect, useState } from 'react';
import ParagraphBox from '../components/ParagraphBox';
import EventList from '../components/EventList';
import CompetitionTable from '../components/CompetitionTable'; // Import the table component
import { fetchUpcomingCompetitions } from '../utilities/wcaApi'; // Import the API utility
import wcaEvents from '../data/wcaEvents'; // Import centralized WCA events data

function Competitions() {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const loadCompetitions = async () => {
      const data = await fetchUpcomingCompetitions();
      setCompetitions(data);
    };

    loadCompetitions();
  }, []);

  return (
    <div className="mt-8">
      <ParagraphBox title="Yleistä">
        <p>
          Kaikki Speedcubing Finlandin järjestämät kilpailut ovat avoimia kaikille harrastajille. Kilpailuja järjestetään Suomessa useita kertoja vuodessa. Kaikki Suomessa järjestettävät kilpailut
          noudattavat kansainvälisen kattojärjsetön{' '}
          <a href="https://www.worldcubeassociation.org/" target="_blank" rel="noopener noreferrer">World Cube Associationin</a>{' '}
          sääntöjä, ja kaikki kilpailuissa tehdyt tulokset ja ennätykset rekisteröidään WCA:n{' '}
          <a href="https://www.worldcubeassociation.org/results/rankings/333/single" target="_blank" rel="noopener noreferrer">tuloskantaan.</a>
        </p>
        <p className="mt-10">
          Kilpailuissa kilpaillaan 17 virallisessa lajissa. Kaikissa kilpailuissa ei kuitenkaan järjestetä kaikkia lajeja, vaan kilpailun järjestäjä päättää kilpailussa järjestettävät lajit. Kilpailukohtaiset
          lajit löytyvät kilpailun sivuilta. Linkit kilpailuihin alempana kohdassa kilpailukalenteri.
        </p>
        <p className="mt-10">Tässä lista kaikista WCA:n lajeista:</p>
        <EventList events={wcaEvents} />
      </ParagraphBox>

      <ParagraphBox title="Milloin kilpailemaan?">
        <p>
          Kilpailuihin osallistuminen on erinomainen tapa kehittää taitojasi ja tutustua muihin harrastajiin. Kilpailuihin voi osallistua kuka tahansa, joka osaa ratkaista kuution vähintään yhdessä WCA:n
          tunnustamassa lajissa. Suosituimipia lajeja tavallisen 3x3x3 kuution lisäksi aloittelijoiden keskuudessa ovat esimerkiksi 2x2x2, pyraminx ja skewb. Näissä lajeissa ei useimmiten ole
          tiukkoja aikarajoja, joten voit osallistua kilpailuihin hyvin matalalla kynnyksellä. Mikäli et vielä osaa
          ratkaista kuutiota, voit opetella ratkaisun helposti netistä löytyvien ohjeiden avulla. Tietoa-sivulta löytyy linkkejä ratkaisuohjeisiin, sekä vinkkejä kilpailukäyttöön soveltuvan kuution valintaan.
          Ennen ensimmäistä kilpailuasi tulee myös luoda tili WCA:n sivuille, sekä tutustua WCA:n sääntöihin. Säännöt löytyvät suomenkielisinä{' '}
          <a href="https://www.worldcubeassociation.org/regulations/translations/finnish/" target="_blank" rel="noopener noreferrer">tästä.</a>
        </p>
      </ParagraphBox>

      <ParagraphBox title="Kilpailukalenteri">
        <p className="mb-6">
          Tässä näet tulevat Suomessa järjestettävät speedcubing-kilpailut. Klikkaamalla kilpailun nimeä pääset kilpailusivulle, jossa
          voit rekisteröityä kilpailuun ja lukea lisätietoja kilpailusta. Mikäli haluat nähdä kaikki kilpailut maailmanlaajuisesti, 
          pääset tarkastelemaan niitä <a href="https://www.worldcubeassociation.org/competitions" target="_blank" rel="noopener noreferrer">tästä.</a>
        </p>
        <div className="mt-4"> {/* Add margin to separate the text and table */}
          <CompetitionTable competitions={competitions} />
        </div>
      </ParagraphBox>

      <ParagraphBox title="Haluaisitko järjestää kilpailut?">
        <p className="mb-10">
          Mikäli olet kiinnostunut järjestämään speedcubing-kilpailut, ota yhteyttä johonkin Suomen kolmesta WCA:n valtuuttamasta delegaatista.
          Delegaatit ovat kokeneita speedcubing-harrastajia, ja jokainen kilpailu vaatii vähintään yhden delegaatin läsnäolon. Delegaatit auttavat kilpailun
          järjestämisessä, ja varmistavat, että kilpailu noudattaa WCA:n sääntöjä. Delegaatit myös rekisteröivät kilpailun WCA:n sivuille, ja julkaisevat kilpailun. 
          Heidän yhteystiedot löydät Yhteystiedot-sivulta.
        </p>
        <p>
          Vähimmillään kilpailun järjestäminen vaatii vain kilpailupaikan hankkimista. Kilpailupaikkana voi toimia esimerkiksi koulun ruokala tai liikuntasali.
          Voit siis olla yhteydessä esimerkiksi omaan kouluusi, ja kysyä mahdollisuutta järjestää kilpailut siellä. Kaikki kilpailuihin vaadittava kalusto, ajanottolaitteet, sekuntikellot yms. 
          tarvikkeet löytyvät Speedcubing Finlandilta, joten kilpailun järjestäminen on helppoa. Kilpailupaikan maksimivuokrahinnasta 
          tulee neuvotella Speedcubing Finlandin hallituksen kanssa, joka hoitaa kaikki kustannukset kilpailun järjestämisestä.
        </p>
      </ParagraphBox>
    </div>
  );
}

export default Competitions;
