import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import StatsSection from './components/StatsSection';
import ContentSection from './components/ContentSection';
import CTASection from './components/CTASection';

// Images
import otaYhteytta from '../../assets/frontpage/IMG_5716-CbtBewlV.webp';
import kilpailutSuomessa from '../../assets/frontpage/IMG_5617-DH1gps98.webp';
import kuinkaAloittaa from '../../assets/frontpage/IMG_5639-1-RgRQpNac.webp';
import mitaOnSpeedcubing from '../../assets/frontpage/IMG_5479-DfWxHl0Z.webp';

function Home() {
  return (
    <div className="home-page">
      {/* Full-screen animated hero */}
      <HeroSection />
      
      {/* Features grid with animated cards */}
      <FeaturesSection />
      
      {/* Animated statistics */}
      <StatsSection />
      
      {/* Content sections with alternating layouts */}
      <ContentSection
        title="Mitä on speedcubing?"
        text="Speedcubing on harrastus, jossa pyritään ratkaisemaan Rubikin kuutioita ja sen kaltaisia pulmapelejä mahdollisimman nopeasti. Speedcubing on vielä suhteellisen tuntematon harrastus, mutta sen suosio kasvaa jatkuvasti. Speedcubing Finland on yhdistys, joka järjestää kilpailuja speedcubing-harrastajille Suomessa."
        imageSrc={mitaOnSpeedcubing}
        imageAlt="Speedcubing example"
        buttonLabel="Liity jäseneksi"
        buttonLink="/join"
        index={0}
      />
      
      <ContentSection
        title="Kilpailut Suomessa"
        text="Suomessa on ollut aktiivista kilpailutoimintaa vuodesta 2007 lähtien. Nykyisin kilpailuja järjestetään jo useita kertoja vuodessa eri puolilla Suomea. Kilpailut ovat avoimia kaikille harrastajille, ja niihin voi osallistua hyvin matalalla kynnyksellä."
        imageSrc={kilpailutSuomessa}
        imageAlt="Kilpailu example"
        buttonLabel="Lisää kilpailuista"
        buttonLink="/competitions"
        imageLeft
        index={1}
      />
      
      <ContentSection
        title="Miten aloittaa?"
        text="Speedcubing on erinomainen harrastus kaikille iästä ja taustasta riippumatta. Aloittaminen on helppoa ja edullista. Speedcubingin aloittamiseen tarvitset vain yhden Rubikin kuution. Ohjeita ratkaisuun, kuution valintaan ja muita vinkkejä löydät tietoa-sivulta."
        imageSrc={kuinkaAloittaa}
        imageAlt="A person solving Rubik's cube"
        buttonLabel="Lue lisää"
        buttonLink="/info"
        index={2}
      />
      
      <ContentSection
        title="Ota yhteyttä"
        text="Tältä nettisivulta löydät tietoa kilpailujen järjestämisestä, sekä yleistä tietoa speedcubingista ja sen harrastamisen aloittamisesta. Mikäli sinulla jää kysyttävää, ota rohkeasti yhteyttä!"
        imageSrc={otaYhteytta}
        imageAlt="Ota yhteyttä"
        buttonLabel="Ota yhteyttä"
        buttonLink="/contact"
        imageLeft
        index={3}
      />
      
      {/* Final call-to-action */}
      <CTASection />
    </div>
  );
}

export default Home;
