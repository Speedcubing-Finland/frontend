import JoinForm from './components/JoinForm';
import ParagraphBox from '../Info/components/ParagraphBox';

function Join() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Use ParagraphBox for the introduction text */}
      <ParagraphBox title="Liity jäseneksi">
        Liity mukaan Speedcubing Finlandiin ja tule osaksi suomalaista speedcubing-yhteisöä! Jäseneksi liittyminen on helppoa ja ilmaista. 
        Jäsenenä saat alennusta kilpailuiden osallistumismaksuista, sekä tiedot tulevista kilpailuista ja tapahtumista sähköpostiisi. Voit liittyä 
        jäseneksi täyttämällä alla olevan lomakkeen. Voit myös liittyä jäseneksi, vaikka et olisi vielä osallistunut yhteenkään kilpailuun. Jätä
        siinä tapauksessa WCA ID -kenttä tyhjäksi.
        <p className="mt-8">
          Jäsentietojasi ei jaeta kolmansille osapuolille. Jäsentietoja käytetään ainoastaan Speedcubing 
          Finlandin jäsenrekisterin ylläpitoon, sekä kilpailutoiminnan ja jäsenpalveluiden kehittämiseen. Mikäli sinulle tulee tarve 
          poistaa tai muokata jäsentietojasi, voit ottaa yhteyttä yhdistyksen hallitukseen. 
        </p>
      </ParagraphBox>

      {/* Join form */}
      <JoinForm />
    </div>
  );
}

export default Join;
