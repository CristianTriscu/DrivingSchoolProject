import { saveAs } from "file-saver";
import {
  Packer,
  Document,
  HeadingLevel,
  VerticalAlign,
  Table,
  TableRow,
  TableCell,
  TextRun,
  AlignmentType,
} from "docx";
import { Paragraph } from "docx";


//functie exemplu
export default function generateCerereExaminare(
  nume,
  prenume,
  seria,
  numarCI,
  CNP,

  categorie,
  eliberatDe,
  dataEliberarii,
  dataExpirarii,
) {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.LEFT,

            children: [
              new TextRun({
                text: "Instituţia Prefectului Judeţului _____________________",
                color: "000000",
              }),
            ],
          }),
          new Paragraph({}),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.LEFT,

            children: [
              new TextRun({
                text: "Serviciul public comunitar regim permise de conducere şi înmatriculare a vehiculelor",
                color: "000000",
              }),
            ],
          }),
          new Paragraph({}),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.LEFT,

            children: [
              new TextRun({
                text: "Nr. __________ din ___________",
                color: "000000",
              }),
            ],
          }),
          new Paragraph({}),
          new Paragraph({}),
          new Paragraph({}),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Nr. crt.",
                        verticalAlign: VerticalAlign.CENTER,
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                    alignment: AlignmentType.CENTER,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Data programării la examen",
                        verticalAlign: VerticalAlign.CENTER,
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Gradul profesional numele și prenumele lucratorului care a primit și verificat dosarul",
                        verticalAlign: VerticalAlign.CENTER,
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                  }),
                  new TableCell({
                    children:[

                    ]
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Proba teoretică",
                        verticalAlign: VerticalAlign.CENTER,
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Semnătura lucrătorului",
                        verticalAlign: VerticalAlign.CENTER,
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Poligon",
                        verticalAlign: VerticalAlign.CENTER,
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Traseu",
                        verticalAlign: VerticalAlign.CENTER,
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Categoria obținută",
                        verticalAlign: VerticalAlign.CENTER,
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Data obținerii categoriei",
                        verticalAlign: VerticalAlign.CENTER,
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Semnătura examinatorului",
                        verticalAlign: VerticalAlign.CENTER,
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                ],
              }),

              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "1.",
                            bold: true,
                            color: "000000",
                          }),
                        ],
                      }),
                      new Paragraph({}),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                    alignment: AlignmentType.JUSTIFIED,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "2.",
                            bold: true,
                            color: "000000",
                          }),
                        ],
                      }),
                      new Paragraph({}),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                    alignment: AlignmentType.JUSTIFIED,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "3.",
                            bold: true,
                            color: "000000",
                          }),
                        ],
                      }),
                      new Paragraph({}),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                    alignment: AlignmentType.JUSTIFIED,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "4.",
                            bold: true,
                            color: "000000",
                          }),
                        ],
                      }),
                      new Paragraph({}),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                    alignment: AlignmentType.JUSTIFIED,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "5.",
                            bold: true,
                            color: "000000",
                          }),
                        ],
                      }),
                      new Paragraph({}),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                    alignment: AlignmentType.JUSTIFIED,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "6.",
                            bold: true,
                            color: "000000",
                          }),
                        ],
                      }),
                      new Paragraph({}),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                    alignment: AlignmentType.JUSTIFIED,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [new Paragraph({}), new Paragraph({})],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                ],
              }),
            ],
          }),
          new Paragraph({}),
          new Paragraph({}),
          new Paragraph({}),
      
          new Paragraph({}),
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,

            children: [
              new TextRun({
                text: "Domule șef de serviciu,",
                bold: true,
                color: "000000",
              }),
            ],
          }),

       
          new Paragraph({}),
          new Paragraph({}),

          new Paragraph({
            text: `         Subsemnatul/Subsemnata, ${nume} ${prenume}, cu domiciliul/reşedinţa în localitatea Tecuci judeţul Galați posesor/posesoare al/a actului de identitate seria ${seria} nr. ${numarCI} eliberat de ${eliberatDe} la data de ${dataEliberarii} , valabil pana la data de ${dataExpirarii}, CNP ${CNP} , solicit prezentarea la examenul pentru obţinerea permisului de conducere categoria ${categorie}. Menţionez că pregătirea necesară susţinerii acestui examen am efectuat-o în cadrul Şcolii de conducători auto SC AUTODRIVE SRL cu instructorul auto Popescu Ion
              `,
            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({}),
          new Paragraph({
            text: "Anexez dosarul de examinare",
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            text: "            - solicit □ /nu solicit □  editarea permisului de conducere;",
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            text: "            - solicit examinarea teoretică în limba  engleză □ franceză □ germană □ (în cazul străinilor, al cetăţenilor statelor membre ale Uniunii Europene, altele decât România, al cetăţenilor statelor membre ale spaţiului Economic European şi al cetăţenilor Confederaţiei Elveţiene);",
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            text: "            - solicit examinarea teoretică în limba maternă maghiară  □ germană  □",
            alignment: AlignmentType.LEFT,
          }),

          new Paragraph({
            text: " Declar pe propria răspundere, sub sancţiunea prevăzută de art. 326 din Codul penal că:",
            alignment: AlignmentType.LEFT,
          }),

          new Paragraph({
            text: " A □ locuiesc în mod obişnuit cel puţin 185 de zile din fiecare an calendaristic la adresa sus-menţionată datorită unor legături personale sau profesionale ori a altor legături strânse cu adresa respectivă sau",
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            text: " B □ revin periodic la adresa sus-menţionată datorită unor legături personale cu adresa respectivă, deşi locuiesc alternativ în locuri diferite, situate în două sau mai multe state membre, întrucât legăturile mele profesionale sunt intr-un loc diferit de cel al legăturilor personale sau",
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            text: " C □ locuiesc la adresa sus-menţionată pentru îndeplinirea unei activităţi sau misiuni pe o durată determinată în România, deşi locuiesc alternativ şi în alte locuri diferite, situate în două sau mai multe state membre sau",
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            text: " D □ mă aflu la studii în România de cel puţin 6 luni şi locuiesc la adresa sus-menţionată.Instituţia de învăţământ care se afla pe raza de competenţă teritorială a acestui serviciu este ............................................................................................................................",
            alignment: AlignmentType.LEFT,
          }),

          new Paragraph({
            text: " Semnătura ________________",
            alignment: AlignmentType.RIGHT,
          }),

          new Paragraph({}),
          new Paragraph({}),
          new Paragraph({
         
            alignment: AlignmentType.CENTER,
            children:[
                new TextRun({
                    text: "NOTĂ INFORMATIVĂ",
                    alignment: AlignmentType.CENTER,
                    bold:true
                })
            ]
          }),
          new Paragraph({}),
          new Paragraph({
              text:"S.p.c.r.p.c.i.v din cadrul Instituţiei Prefectului Judeţului X, înregistrat la Autoritatea Naţională de Supraveghere a Prelucrării Datelor cu Caracter Personal cu nr.___________ prelucrează date cu caracter personal furnizate de dumneavoastră prin mijloace automatizate în scopul obţinerii şi eliberării permisului de conducere.Informaţiile înregistrate sunt destinate utilizării de către operator şi sunt comunicate numai destinatarilor abilitaţi de lege, cum sunt organele de poliţie, parchet, instanţe şi pot fi transmise inclusiv în străinătate organelor judiciare sau în vederea preschimbării permisului de conducere cu un document similar din acea ţară, în condiţiile legii. Conform Legii nr. 677/2001 pentru protecţia persoanelor cu privire la prelucrarea datelor cu caracter personal şi libera circulaţie a acestor date, cu modificările şi completările ulterioare, beneficiaţi de dreptul de acces, de intervenţie asupra datelor şi de dreptul de a nu fi supus unei decizii individuale. Totodată, aveţi dreptul să vă opuneţi prelucrării datelor personale care vă privesc, în limitele prevăzute de art. 15 din Legea nr. 677/2001, cu modificările şi completările ulterioare. Pentru exercitarea acestor drepturi, vă puteţi adresa cu o cerere scrisă, datată şi semnată,la Instituţia Prefectului Judeţului Tulcea. De asemenea, vă este recunoscut dreptul de a vă adresa justiţiei.",
              alignment:AlignmentType.JUSTIFIED
            })
        ],
        VerticalAlign: VerticalAlign.CENTER,
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "CERERE EXAMINARE.docx");
    console.log("Document created successfully");
  });
}
