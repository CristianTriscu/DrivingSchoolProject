import { saveAs } from "file-saver";
import { Packer, Document, HeadingLevel } from "docx";
import { Paragraph } from "docx";
import { AlignmentType, TextRun } from "docx";

export default function generateFisaDeTransfer(nume, prenume, categorie, dataIncepere) {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `Nr. ${Math.floor(Math.random() * 10 + 1)}/100`,
                bold: true,
                color: "#000000",
              }),
            ],

            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.LEFT,

            thematicBreak: true,
          }),
          new Paragraph({}),
          new Paragraph({}),
          new Paragraph({}),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,

            children: [
              new TextRun({
                text: "FIȘĂ DE TRANSFER",
                bold: true,
                color: "000000",
              }),
            ],
          }),
          new Paragraph({}),
          new Paragraph({
            text: `         Şcoala de conducători auto SC AUTODRIVE SRL autorizată să desfăşoare activitatea de pregătire teoretică şi practică în vederea obţinerii permisului de conducere pentru categoriile: ${categorie} în baza autorizaţiei AS, NR. 0008877, adevereşte faptul că D-nul(a) ${nume} ${prenume} înregistrat(ă) în registrul Naţional al Cursanţilor cu nr. în baza contractului de şcolarizare nr. ____/____ a efectuat: `,
            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({}),

          new Paragraph({
            text: `pregătirea teoretică din data de: ${new Date(dataIncepere).toLocaleDateString("RO")} până la data de: _______ reprezentând un nr. de ____ ore pregătirea practică din data de: _________ până la data de: _________reprezentând un nr. de ______ ore aferentă obţinerii permisului de conducere cat: _____`,
          }),
          new Paragraph({}),
          new Paragraph({}),
          new Paragraph({
            children: [
              new TextRun({
                bold: true,
                text: `DIRECTOR/P.F.A`,
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            text: `Numele și Prenumele`,

            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Ionescu Ion`,
                bold: true,
              }),
            ],
            alignment:AlignmentType.LEFT
          }),
          new Paragraph({
            text: `Semnătura`,

            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            text: "___________",
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: `Managerul activității școlii de conducători auto`,
                bold: true,
              }),
            ],

            alignment: AlignmentType.RIGHT,
          }),
          new Paragraph({
            text: `Numele și Prenumele`,

            alignment: AlignmentType.RIGHT,
          }),
          new Paragraph({
            text: `__________`,

            alignment: AlignmentType.RIGHT,
          }),
          new Paragraph({
            text: `Semnătura`,
            bold: true,

            alignment: AlignmentType.RIGHT,
          }),
          new Paragraph({
            text: `__________`,

            alignment: AlignmentType.RIGHT,
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "FIȘA DE TRANSFER.docx");
    console.log("Document created successfully");
  });
}
