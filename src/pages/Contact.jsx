import ParagraphBox from "../components/ParagraphBox"

function Contact() {
    return (
      <div className="mt-8 space-y-8">
      <ParagraphBox title="Hallitus">
      <p>
          Kaikissa yhdistyksen toimintaan liittyvissä kysymyksissä voit ottaa yhteyttä hallitukseen sähköpostitse:
        </p>
        <p className="mb-10 font-bold">hallitus@speedcubingfinland.fi</p>
        <p>
          Yhdistyksen hallitukseen vuonna 2025 kuuluu:
          <li>
          Tomi Ronkainen (puheenjohtaja)
          </li>
          <li>
          Niko Ronkainen (varapuheenjohtaja)
          </li>
          <li>
          Timo Norrkniivilä (rahastonhoitaja)
          </li>
          <li>
          Arttu Puttonen (sihteeri)
          </li>
          <li>
          Jarno Viljanen
          </li>
        </p>
      </ParagraphBox>
        
      <ParagraphBox title="WCA-delegaatit">
        <p className="mb-4">
          Kilpailuihin tai kilpailujen järjestämiseen liittyvissä asioissa
          voit ottaa yhteyttä suoraan johonkin Suomen kolmesta World Cube Associationin valtuuttamasta
          delegaatista:
        </p>
        
        <ul className="list-disc ml-5">
          <li>
          Niko Ronkainen: <span className="font-bold">nronkainen@worldcubeassociation.org</span>
          </li>
          <li>
          Tomi Ronkainen: <span className="font-bold">tronkainen@worldcubeassociation.org</span>
          </li>
          <li>
          Olli Vikstedt: <span className="font-bold">ovikstedt@worldcubeassociation.org</span>
          </li>
        </ul>
      </ParagraphBox>

      <ParagraphBox title="Laskutustiedot">
        <p>Yhdistys ottaa laskuja vastaan sähköpostitse. Laskutuksen yhteystiedot löydät alta:</p>
        <br></br>
        Vastaanottaja: Speedcubing Finland ry
        <br></br>
        Y-tunnus: 3501504-2
        <br></br>
        Sähköpostiosoite: hallitus@speedcubingfinland.fi
      </ParagraphBox>
      </div>
    )
}

export default Contact;
