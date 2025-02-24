import ParagraphBox from '../components/ParagraphBox';
import placeholder from '../assets/placeholder.png'; // Placeholder image
import kuutiostoreLogo from '../assets/kuutiostore_logo.png'; // Kuutiostore logo

function Info() {
  return (
    <div className="mt-8 space-y-8">
      {/* Historia Section */}
      <ParagraphBox title="Historia">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-2/3">
            <p>
              Rubikin kuution keksi unkarilainen arkkitehti Ernő Rubik vuonna 1974. 
              Kuutiosta tuli 1980-luvulla maailmanlaajuinen ilmiö, ja siitä lähtien se on pysynyt maailman tunnetuimpana 
              pulmapelinä. Vuonna 1982 järjestettiin ensimmäiset Rubikin kuution maailmanmestaruuskilpailut, joihin osallistui 19 kilpailijaa.
              Kilpailut voitti yhdysvaltalainen Minh Thai, joka ratkaisi kuution 22,95 sekunnissa. Seuraavat MM-kilpailut järjestettiinkin vasta 
              vuonna 2003, jonka jälkeen MM-kilpailuja on järjestetty tasaisesti joka toinen vuosi. Vuonna 2004 perustettiin kansainvälinen kattojärjestö World Cube Association (WCA),
              jonka sääntöjä ja ohjeistuksia jokaisen virallisen kilpailun tulee nykyisin noudattaa.   

            </p>
          </div>
          <img
            src={placeholder}
            alt="Rubikin kuution historia"
            className="md:w-1/3 w-full rounded shadow"
          />
        </div>
      </ParagraphBox>

      {/* Ohjeita ratkaisemiseen Section */}
      <ParagraphBox title="Ohjeita ratkaisemiseen">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-2/3">
            <p>
              Yleinen harhaluulo on, että Rubikin kuution ratkaiseminen olisi todella vaikeaa. Todellisuudessa sen ratkaisemiseen on useita eri metodeja eri taitotasoille. Yleisimpiä metodeja ovat aloittelijoiden metodi, 
              CFOP (Cross, F2L, OLL, PLL), sekä Roux. Ensimmäistä kertaa ratkaisua opetellessa kannattaa aloittaa aloittelijoiden metodista, eli Layer-by-Layer metodista.  Mikäli tämän jälkeen haluat vielä tulla nopeammaksi ratkojaksi, kannattaa siirtyä nopeampiin
              metodeihin. Edellämainituista metodeista CFOP, on ylivoimaisesti suosituin nopeusratkontaan käytetty metodi. Netistä löytyy lukuisia opetusvideoita ja oppaita, joiden avulla pääset alkuun.

            </p>
          </div>
          <img
            src={placeholder}
            alt="Ratkaisuopas"
            className="md:w-1/3 w-full rounded shadow"
          />
        </div>
      </ParagraphBox>

      {/* Kuution valinta Section */}
      <ParagraphBox title="Kuution valinta">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-2/3">
            <p>
              Aloittelijan kannattaa valita laadukas, mutta edullinen kuutio. Kilpakäyttöön soveltuvia kuutioita saa jo noin 10-20 eurolla. Tärkeimpänä ominaisuutena
              kilpakäyttöön soveltuvissa kuutiossa verrattuna tavalliseen Rubik's-merkkiseen kuutioon on magneettisuus. Magneettisuus kuutiossa auttaa kuutiota käännellessä
              sen sivuja pysähtymään juuri oikeaan kohtaan, mikä vähentää kuution tökkimistä ja auttaa näin säästämään aikaa ratkaisussa. Lisäksi kilpakäyttöön soveltuvissa kuutioissa
              on usein myös erilaisia säätöominaisuuksia, joiden avulla kuution kääntyvyyttä voi muokata itselleen sopivaksi. Kilpakäyttöön soveltuvia kuutiota saa ostettua Suomessa esimerkiksi <a href="https://kuutiostore.fi/" target="_blank" rel="noopener noreferrer">kuutiostore.fi</a> verkkokaupasta. 
              Kuutiostoren valikoima on laaja, ja se keskittyy kilpakäyttöön suunnattuihin kuutioihin. Käyttämällä koodia "scf5" saat myös 5% alennusta
              verkkokaupan normaalihintaisista tuotteista.
            </p>
          </div>
          <img
            src={kuutiostoreLogo}
            alt="Kuution valinta"
            className="md:w-1/3 w-full rounded shadow"
          />
        </div>
      </ParagraphBox>
    </div>
  );
}

export default Info;
