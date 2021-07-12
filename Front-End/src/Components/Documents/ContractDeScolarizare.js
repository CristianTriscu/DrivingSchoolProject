import { saveAs } from "file-saver";
import {
  Packer,
  Document,
  HeadingLevel,

} from "docx";
import { Paragraph } from "docx";
import {

  AlignmentType,

} from "docx";



export default function generateContractScolarizare() {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: "CONTRACT DE ŞCOLARIZARE",
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.CENTER,
              bold: true,
              thematicBreak: true,
            }),
            new Paragraph({}),
            new Paragraph({
              text: `NR 751713283 încheiat la data de $31.10.2020`,
              alignment: AlignmentType.JUSTIFIED,
            }),
            new Paragraph({}),
            new Paragraph({
              text: "I. Părțile contractate",
              heading: HeadingLevel.HEADING_3,
              alignment: AlignmentType.LEFT,
            }),
            new Paragraph({}),
            new Paragraph({
              text: "1. SC AutoDriver SRL - şcoală de conducători auto, cu sediul în Test, str. tst nr.1, J36/240/1990, RO 237777, telefon 0241/517111 reprezentată legal de ........................................., având calitatea de director, denumit în continuare PRESTATOR servicii şi D-l./D-na Trișcu Cristian , domiciliat(ă) în Tecuci , posesor al CI/BI seria ZL , nr 312 , CNP 1990726161603 , fiul lui Alexandru si Ioana , în calitate de BENEFICIAR, denumit(ă) în continuare CURSANT, am încheiat prezentul contract în următoarele  condiţii aupra cărora am convenit: ",
  
              alignment: AlignmentType.JUSTIFIED,
            }),
            new Paragraph({}),
            new Paragraph({
              text: "II. Obiectul contractulu",
              heading: HeadingLevel.HEADING_3,
              alignment: AlignmentType.LEFT,
            }),
            new Paragraph({}),
            new Paragraph({
              text: "Pregătirea teoretică şi practică în vederea obţinerii permisului de conducere pentru categoria/subcategoria:",
              alignment: AlignmentType.JUSTIFIED,
            }),
            new Paragraph({}),
            new Paragraph({
              text: "III. Termenul de executare a serviciilor",
              heading: HeadingLevel.HEADING_3,
              alignment: AlignmentType.LEFT,
            }),
            new Paragraph({}),
            new Paragraph({
              text: "Şcoala de conducători auto va începe pregătirea la data de _____________________ durata acesteia fiind de ___________________ ore",
  
              alignment: AlignmentType.JUSTIFIED,
            }),
            new Paragraph({}),
            new Paragraph({
              text: "IV. Termenul contractului",
              heading: HeadingLevel.HEADING_3,
              alignment: AlignmentType.LEFT,
            }),
            new Paragraph({}),
            new Paragraph({
              text: "Valoarea activităţii prestate este de _____________________ RON, convenită de ambele părţi, plătită integral sau în ________________ rate.",
  
              alignment: AlignmentType.JUSTIFIED,
            }),
            new Paragraph({}),
            new Paragraph({
              text: "V. Obligaţiile parţilor",
              heading: HeadingLevel.HEADING_3,
              alignment: AlignmentType.LEFT,
            }),
            new Paragraph({}),
  
            new Paragraph({
              text: "1. Şcoala se obligă:",
  
              alignment: AlignmentType.JUSTIFIED,
            }),
  
            new Paragraph({
              text: " să permită transferul cursantului, la cerere, la o alta şcoală şi, în acest caz, să elibereze documentele personale depuse de acesta la sediul şcolii, precum şi caietul cursantului;",
              bullet: {
                level: 0,
              },
            }),
            new Paragraph({
              text: " să asigure pregătirea teoretică şi practică conform planului de învăţământ",
              bullet: {
                level: 0,
              },
            }),
            new Paragraph({
              text: " să efectueze ore de pregătire/instruire cu durata de 50 minute şi 10 minute pauză; (Se pot efectua şi 2 ore comasate timp de 100 minute urmate de 20 minute de pauză);",
              bullet: {
                level: 0,
              },
            }),
            new Paragraph({
              text: " să reprogrameze, în caz de defectare a autovehiculului, orele de instruire practică neefectuate;",
              bullet: {
                level: 0,
              },
            }),
            new Paragraph({
              text: " ca instructorul să consemneze după fiecare şedinţă durata acesteia în caietul cursantului;",
              bullet: {
                level: 0,
              },
            }),
            new Paragraph({
              text: " să anunţe amânarea orelor de conducere cu cel puţin 24 ore înaintea programarii, în scris sau telefonic, cursantului;",
              bullet: {
                level: 0,
              },
            }),
            new Paragraph({
              text: "2. Cursantul se obligă:",
  
              alignment: AlignmentType.JUSTIFIED,
            }),
  
            new Paragraph({
              text: " să achite contravaloarea prestaţiei anticipat (integral sau în rate)",
              bullet: {
                level: 0,
              },
            }),
            new Paragraph({
              text: " să se prezinte la cursuri în stare psiho-fizică bună;",
              bullet: {
                level: 0,
              },
            }),
            new Paragraph({
              text: " să anunţe amânarea orelor de conducere cu cel puţin 24 de ore înaintea programării, în scris sau telefonic la şcoală;",
              bullet: {
                level: 0,
              },
            }),
            new Paragraph({
              text: " să posede asupra sa actul de identitate şi caietul cursantului în timpul orelor de instruire practică;",
              bullet: {
                level: 0,
              },
            }),
            new Paragraph({
              text: " să nu se prezinte sub influenţa băuturilor alcoolice, drogurilor sau a medicamentelor care afectează calităţile psihomotorii",
              bullet: {
                level: 0,
              },
            }),
            new Paragraph({}),
            new Paragraph({
              text: "VI. Răspunderea părţilor contractante",
              heading: HeadingLevel.HEADING_3,
              alignment: AlignmentType.LEFT,
            }),
            new Paragraph({}),
            new Paragraph({
              text: "Pentru neexecutare, executarea parţială sau executarea necorespunzătoare a obligaţiilor, partea în culpă va plati celeilalte părţi daune. Modificarea prezentului contract este posibilă numai cu acordul parţilor contractante, caz în care se va încheia un act adiţional, legal întocmit;",
  
              alignment: AlignmentType.JUSTIFIED,
            }),
            new Paragraph({}),
            new Paragraph({
              text: "VII. Rezilierea contractului",
              heading: HeadingLevel.HEADING_3,
              alignment: AlignmentType.LEFT,
            }),
            new Paragraph({}),
            new Paragraph({
              text: " nefinalizarea în termen de 6 luni a serviciilor de pregătire, duce la încetarea de drept a acestuia",
              bullet: {
                level: 0,
              },
            }),
            new Paragraph({
              text: " nefinalizarea cursului datorată unor cauze, imputabile şcolii de conducători auto, conduce la restituirea către cursant, a valorii prestaţiei  nerealizate;",
              bullet: {
                level: 0,
              },
            }),
            new Paragraph({
              text: " nefinalizarea serviciului de pregătire datorată unor cauze, imputabile cursantului, conduce la restituirea către şcoala de conducători auto a valorii prestaţiei nerealizate",
              bullet: {
                level: 0,
              },
            }),
            new Paragraph({}),
            new Paragraph({
              text: "VIII. Litigii",
              heading: HeadingLevel.HEADING_3,
              alignment: AlignmentType.LEFT,
            }),
            new Paragraph({}),
  
            new Paragraph({
              text: "Eventualele litigii care s-ar putea ivi în legătură cu acest contract vor fi soluţionate pe cale amiabilă, iar dacă acest lucru nu este posibil, vor fi soluţionate de instanţele competente. Drept pentru care s-a încheiat prezentul contract în două exemplare, câte unul pentru fiecare contractant",
  
              alignment: AlignmentType.JUSTIFIED,
            }),
            new Paragraph({}),
            new Paragraph({
              text: "Data încheierii contractului",
  
              alignment: AlignmentType.LEFT,
            }),
            new Paragraph({}),
            new Paragraph({
              text: "Ziua _______ luna ________ anul __________            ",
  
              alignment: AlignmentType.LEFT,
            }),
            new Paragraph({
              text: "La sediul ______________________",
  
              alignment: AlignmentType.LEFT,
            }),
            new Paragraph({}),
            new Paragraph({
              text: "NOTA DE INFORMARE: SCOALA DE SOFERI SC AGROTRANSPORT TULCEA SA, inregistrata la Autoritatea Nationala de Supraveghere a Prelucrarii Datelor cu Caracter Personal cu nr. 35148, prelucreaza date cu caracter personal furnizate de dumneavoastra in scopul scolarizarii teoretice si practice, pentru obtinerea permisului de conducere pentru categoriile: B,C, CE, D conform autorizatiei AS Nr.:0006077/23.05.2012",
  
              alignment: AlignmentType.JUSTIFIED,
            }),
            new Paragraph({}),
            new Paragraph({}),
            new Paragraph({
              text: "Director Şcoală",
              bold: true,
              alignment: AlignmentType.LEFT,
            }),
            new Paragraph({
              text: "Cursant/Tutore legal:",
              bold: true,
              alignment: AlignmentType.RIGHT,
            }),
          ],
        },
      ],
    });
  
    Packer.toBlob(doc).then((blob) => {
     
      saveAs(blob, "CONTRACT DE SCOLARIZARE.docx");
      console.log("Document created successfully");
    });
  }