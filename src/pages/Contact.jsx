import ParagraphBox from "../components/ParagraphBox"

function Contact() {
    return (
      <ParagraphBox title="Yhteystiedot">
        <p>
          Mikäli sinulla on mitä tahansa kysyttävää, ota yhteyttä sähköpostitse:
        </p>
        <p className="mb-10 font-bold">speedcubingfinland@gmail.com</p>
        <p className="mb-4">
          Kilpailuihin tai kilpailujen järjestämiseen liittyvissä asioissa
          voit ottaa yhteyttä myös suoraan johonkin Suomen neljästä World Cube Associationin valtuuttamasta
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
          Timo Norrkniivilä: <span className="font-bold">tnorrkniivila©worldcubeassociation.org</span>
          </li>
          <li>
          Olli Vikstedt: <span className="font-bold">ovikstedt@worldcubeassociation.org</span>
          </li>
        </ul>
      </ParagraphBox>
    )
}

export default Contact;
