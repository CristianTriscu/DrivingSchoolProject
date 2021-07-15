import { saveAs } from "file-saver";
import { Packer, Document, HeadingLevel } from "docx";
import { Paragraph } from "docx";
import {
  AlignmentType,
  TextRun,
  VerticalAlign,
  Table,
  TableRow,
  TableCell,
} from "docx";

function CNPtoDate(cnp){
    return cnp.substring(5,7)+"/"+cnp.substring(3,5)+"/"+cnp.substring(1,3)
}

export default function generateFisaDeScolarizare(
  nume,
  prenume,
  CNP,
  numeTata,
  numeMama,
  seria,
  numaCI,
  eliberatDe,
  dataEliberare
) {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "Institutia Prefectului Județului ______",

                color: "#000000",
              }),
            ],
            heading: HeadingLevel.HEADING_3,
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Serviciul public comunitar regim permise de conducere şi înmatriculare a vehiculelor",
                color: "#000000",
              }),
            ],
            heading: HeadingLevel.HEADING_3,
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Nr. ____  din _____",

                color: "#000000",
              }),
            ],
            heading: HeadingLevel.HEADING_3,
            alignment: AlignmentType.LEFT,
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
                        text: "Data programării la examen ______",
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
                    children: [],
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
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.LEFT,

            children: [
              new TextRun({
                text: "ȘCOALA DE CONDUCĂTORI AUTO AUTODRIVE SRL",
                bold: true,
                color: "000000",
              }),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,

            children: [
              new TextRun({
                text: "AS , NR. 0008877, 23.05.2012, 23.05.2017",

                color: "000000",
              }),
            ],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,

            children: [
              new TextRun({
                text: "FIŞA DE ŞCOLARIZARE PENTRU CONDUCEREA AUTOVEHICULELOR",
                bold: true,
                color: "000000",
              }),
            ],
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,

            children: [
              new TextRun({
                text: `Nr. ${Math.floor(Math.random() * 10 + 10)} din 299`,
                bold: true,
                color: "000000",
              }),
            ],
          }),
          new Paragraph({}),
          new Paragraph({}),
          new Paragraph({
            text: `CNP ${CNP.split(" | ").toString()}`,
            alignment: AlignmentType.LEFT,
          }),

          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
          }),

          new Paragraph({
            text: `Motivul emiterii:`,

            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({
            text: "    □ EXAMEN PENTRU OBȚINERE PERMIS",
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            text: "    □ EXAMEN PENTRU ADĂUGARE CATEGORII PERMIS",
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            text: "    □ EXAMEN PENTRU OBŢINEREA UNUI NOU PERMIS",
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({}),
          new Paragraph({
            text: `     Numele ${nume} Prenumele ${prenume} Nume anterior - Prenumele părinţilor: Tata ${numeTata} Mama ${numeMama} Cetăţenie romana, Data nașterii: ${CNPtoDate(CNP)}, Locul naşterii: București Ţara Romania jud.(sect) București localitatea București, Domiciliu/Reşedinţă: jud.(sect) Vrancea localitatea Focsani str. Dimitrie Sturdza nr. 30 , bl. , sc. , ap. , Act de identitate: CI seria ${seria} nr. ${numaCI} eliberat de ${eliberatDe} la data de ${dataEliberare}`,
            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({
            text: "   □ Nu am posedat permis de conducere",
            bullet: {
              level: 0,
            },
          }),
          new Paragraph({
            text: "   □ Am posedat permis de conducere categoria , care a fost anulat în anul",
            bullet: {
              level: 0,
            },
          }),
          new Paragraph({
            text: "   □ Posed permis de conducere categoria numărul eliberat de la data de - - ,",
            bullet: {
              level: 0,
            },
          }),
          new Paragraph({}),
          new Paragraph({}),

          new Paragraph({}),
          new Paragraph({
            text: "Semnătura candidatului _______________",

            alignment: AlignmentType.RIGHT,
          }),

          new Paragraph({}),
          new Paragraph({}),
          new Paragraph({
            bold: true,
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: "Certific autenticitatea imaginii şi corectitudinea datelor",
                bold: true,
                color: "000000",
              }),
            ],
          }),
          new Paragraph({
            bold: true,
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: "Lucrător public serviciul comunitar  ______________, Semnătura  ______________",
                bold: true,
                color: "000000",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: "Chitanţa reprezentând contravaloarea permisului de conducere, cu seria _______ nr _______",

                color: "000000",
              }),
            ],
          }),
          new Paragraph({}),
          new Paragraph({}),
          new Paragraph({
            children: [
              new TextRun({
                text: "CERTIFICAT DE ABSOLVIRE",

                color: "#000000",
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({}),
          new Paragraph({}),
          new Paragraph({
            children: [
              new TextRun({
                text: "Se certifică absolvirea cursurilor de pregătire teoretică şi practică în vederea susţinerii examenului pentru obţinerea permisului de conducere categoria B , organizate de S.C. ADMIS TOTAL AUTO S.R.L. , în perioada ___________",
                bold: true,
                color: "#000000",
              }),
            ],
            heading: HeadingLevel.HEADING_3,
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({}),
          new Paragraph({
            children: [
              new TextRun({
                text: "Data eliberării ___________",
                bold: true,
                color: "#000000",
              }),
            ],
            heading: HeadingLevel.HEADING_4,
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({}),
          new Paragraph({
            children: [
              new TextRun({
                text: "DIRECTOR",
                bold: true,
                color: "#000000",
              }),
              new TextRun({
                text: "_________",
                bold: true,
                color: "#000000",
              }),
            ],
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.LEFT,
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "SECRETAR",
                bold: true,
                color: "#000000",
              }),
              new TextRun({
                text: "________",
                bold: true,
                color: "#000000",
              }),
            ],
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.RIGHT,
          }),

          new Paragraph({}),
          new Paragraph({}),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "PROFESOR DE LEGISLAŢIE RUTIERĂ",
                            bold: true,
                          }),
                        ],
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "INSTRUCTOR AUTO DE PREGĂTIRE PRACTICĂ",
                            bold: true,
                          }),
                        ],
                      }),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "MEDIC",
                            bold: true,
                          }),
                        ],
                      }),
                      new Paragraph({}),
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
                            text: "nume, prenume semnătura",
                          }),
                        ],
                      }),
                    ],
                    verticalAlign: VerticalAlign.LEFT,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "nume, prenume, semnătura",
                          }),
                        ],
                      }),
                      new Paragraph({}),
                    ],
                    verticalAlign: VerticalAlign.LEFT,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "APT/INAPT PENTRU CONDUCEREA AUTOVEHICULELOR DIN GRUPA _____________ (nume, prenume şi semnătura) nume, prenume şi semnătura ŞI RESTRICŢII APLICATE (dupa caz) ",
                            bold: true,
                          }),
                        ],
                      }),
                      new Paragraph({}),
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
                            text: "Nr. atestat valabil până la data:",
                          }),
                        ],
                      }),
                    ],
                    verticalAlign: VerticalAlign.LEFT,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Nr. atestat valabil până la data:",
                          }),
                        ],
                      }),
                      new Paragraph({}),
                    ],
                    verticalAlign: VerticalAlign.LEFT,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "parafă, ștampilă și semnătură",
                          }),
                        ],
                      }),
                      new Paragraph({}),
                      new Paragraph({}),
                      new Paragraph({}),
                      new Paragraph({}),
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({}),
          new Paragraph({}),
          new Paragraph({
            children: [
              new TextRun({
                text: "Fișă medicală nr ......  din ......",
                bold: true,
                color: "#000000",
              }),
            ],
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.RIGHT,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Unitatea medicală emitentă ......................",
                bold: true,
                color: "#000000",
              }),
            ],
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.RIGHT,
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "FISĂ DE ȘCOLARIZARE.docx");
    console.log("Document created successfully");
  });
}
