import { saveAs } from "file-saver";
import { Packer, Document, HeadingLevel } from "docx";
import { Paragraph } from "docx";
import { AlignmentType, TextRun } from "docx";

export default function generateDeclaratieProprieRaspundere(
  nume,
  prenume,
  seria,
  numarCI,
  eliberatDe,
  dataEliberarii,
  CNP,
  categorie
 
) {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: "Şcola de şoferi SC AUTODRIVE SRL",
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.LEFT,
            bold: true,
            thematicBreak: true,
          }),
          new Paragraph({}),
          new Paragraph({}),
          new Paragraph({}),
          new Paragraph({}),
          new Paragraph({}),
          new Paragraph({}),

          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,

            children: [
              new TextRun({
                text: "DOMNULE DIRECTOR,",
                bold: true,
                color: "000000",
              }),
            ],
          }),
          new Paragraph({}),
          new Paragraph({
            text: `   Subsemnatul/a ${nume} ${prenume} , domiciliat/ă în ${"Focsani"} judeţ ${"Vrancea"} , strada ${"Dimitrie Sturdza"} , nr. ${"30"} , bloc , scara ap. , identificat/ă cu actul de identitate seria ${seria} numarul ${numarCI} eliberat de ${eliberatDe} la data de ${dataEliberarii} , CNP ${CNP} , declar pe proprie răspundere,cunoscând prevederile art. 292 din Codul Penal cu privire la falsul în declaraţii, că`,
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: ` nu am fost condamnat/ă pentru una din infracţiunile regimului circulaţiei pe drumurile publice, omor, lovire sau vătămare corporală cauzatoare de moarte, vătămare corporală gravă, tâlhărie sau furtul unui autovehicul.`,
                bold: true,
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({}),
          new Paragraph({}),
          new Paragraph({
            text: `   Solicit înscrierea la cursurile şcolii de şoferi SC AUTODRIVE SRL în vederea obţinerii permisului de
              conducere categoria/catagoriile ${categorie}.`,

            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({}),
          new Paragraph({
            text: `Mi s-au adus la cunoştinţă şi înţeleg să respect prevederile următoraleor documente:`,

            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            text: "Contractul şi condiţiile de şcolarizare",
            bullet: {
              level: 0,
            },
          }),
          new Paragraph({
            text: "Regulamentul şcolii",
            bullet: {
              level: 0,
            },
          }),
          new Paragraph({
            text: "Planul de învăţământ, programa şcolară şi orarul de desfăşurare a cursurilor",
            bullet: {
              level: 0,
            },
          }),
          new Paragraph({}),
          new Paragraph({}),
          new Paragraph({}),
          new Paragraph({}),
          new Paragraph({}),
          new Paragraph({
            text: "Data:",

            alignment: AlignmentType.LEFT,
          }),

          new Paragraph({
            text: "Ziua _______ luna ________ anul __________            ",

            alignment: AlignmentType.LEFT,
          }),

          new Paragraph({}),

          new Paragraph({
            bold: true,
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: "Nume și prenume:",
                bold: true,
                color: "000000",
              }),
            ],
          }),
          new Paragraph({}),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: "Semnatura:",
                bold: true,
                color: "000000",
              }),
            ],
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "DECLARATIE PROPRIE RASPUNDERE.docx");
    console.log("Document created successfully");
  });
}
