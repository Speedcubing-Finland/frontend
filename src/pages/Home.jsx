import InfoSection from '../components/InfoSection';
import placeholder from '../assets/placeholder.png';

function Home() {
  return (
    <div>
      {/* Section 1: Image on the right (default) */}
      <InfoSection
        title="Mitä on speedcubing?"
        text={`Speedcubing on harrastus, jossa pyritään ratkaisemaan Rubikin kuutioita ja
                sen kaltaisia pulmapelejä mahdollisimman nopeasti. Speedcubing on vielä
                suhteellisen tuntematon harrastus, mutta sen suosio kasvaa jatkuvasti. Speedcubing Finland on yhdistys, joka
                järjestää kilpailuja speedcubing harrastajille Suomessa. Yhdistyksen jäseneksi liittyminen on ilmaista, 
                ja jäseneksi voi liittyä kuka tahansa speedcubingista kiinnostunut. Jäsenenä saat muun muassa alennsuta kilpailumaksuista.
                `}
        imageSrc={placeholder}
        imageAlt="Speedcubing example"
        buttonLabel="Liity jäseneksi"
        buttonLink="/join"
      />

      {/* Section 2: Image on the left */}
      <InfoSection
        title="Kilpailut Suomessa"
        text="Suomessa on ollut aktiivista kilpailutoimintaa vuodesta 2007 lähtien. Nykyisin kilpailuja järjsetetään
              jo useita kertoja vuodessa eri puolilla Suomea. Kilpailut ovat avoimia kaikille harrastajille, ja niihin
              voi osallistua hyvin matalalla kynnyksellä. Kilpailuissa kilpaillaan 17 virallisessa kansainvälisen kattojärjsetön
              World Cube Associationin tunnustaamassa lajissa. Kaiken tarvittavan tiedon kilpailuista löydät kilpailut-sivulta."
        imageSrc={placeholder}
        imageAlt="Kilpailu example"
        buttonLabel="Lisää kilpailuista"
        buttonLink="/competitions"
        imageLeft // Reverses the layout
      />

      {/* Section 3: Image on the right again */}
      <InfoSection
        title="Miten aloittaa?"
        text="Speedcubing on erinomainen harrastus kaikille iästä ja taustasta riippumatta. Aloittaminen on helppoa 
              ja edullista. Speedcubingin aloittamiseen tarvitset vain yhden Rubikin kuution.
              Ohjeita Rubikin kuution ratkaisuun, sekä muita vinkkejä ja neuvoja esimerkiski kilapilukäyttöön sovelutvien kuutioiden valintaan löydät tietoa-sivulta."
        imageSrc={placeholder}
        imageAlt="A person solving Rubik's cube"
        buttonLabel="Lue lisää"
        buttonLink="/info"
      />

      {/* Section 4: Another arrangement - image on the left again, for variety */}
      <InfoSection
        title="Ota yhteyttä"
        text="Tältä nettisivulta löydät tietoa kilpailujen järjestämisestä, sekä yleistä tietoa speedcubingista 
              ja sen harrastamisen aloittamisesta. Mikäli sinulla jää kysyttävää, ota rohkeasti yhteyttä!
              Voit kysyä neuvoa ja apua kaikissa speedcubingiin liittyvissä kysymyksissä, tai pyytää apua ja tarkempia ohjeita kilpailujen järjestämiseen.
              Usein kysyttyihin kysymyksiin löydät vastauksia myös tietoa-sivulta."
        imageSrc={placeholder}
        imageAlt="Ota yhteyttä"
        buttonLabel="Ota yhteyttä"
        buttonLink="/contact"
        imageLeft
      />
    </div>
  );
}

export default Home;
