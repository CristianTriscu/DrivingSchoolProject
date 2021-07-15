import { saveAs } from "file-saver";
import { Packer, Document, HeadingLevel } from "docx";
import { Paragraph } from "docx";
import { AlignmentType, TextRun } from "docx";

export default function generateAdeveritaRemorca(nume, prenume, CNP) {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "Școala de conducători auto",
                bold: true,
                color: "#000000",
              }),
            ],
            heading: HeadingLevel.HEADING_3,
            alignment: AlignmentType.LEFT,
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "AUTODRIVE SRL",
                bold: true,
                color: "#000000",
              }),
            ],
            heading: HeadingLevel.HEADING_3,
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Seria AS nr.  ${Math.floor(Math.random() * 10 + 1)}`,
                bold: true,
                color: "#000000",
              }),
            ],
            heading: HeadingLevel.HEADING_3,
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Valabilă din data de: ${new Date().toLocaleDateString("RO")}`,
                bold: true,
                color: "#000000",
              }),
            ],
            heading: HeadingLevel.HEADING_3,
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({}),
          new Paragraph({}),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,

            children: [
              new TextRun({
                text: "ADEVERINȚĂ",
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
                text: `Nr.  ${Math.floor(Math.random() * 10 + 1)}/300`,
                bold: true,
                color: "000000",
              }),
            ],
          }),
          new Paragraph({}),
          new Paragraph({}),

          new Paragraph({
            text: `         Prin prezenta se adevereşte faptul că d-nul (a) ${nume} ${prenume} C.N.P. ${CNP}, posesor al permisului de conducere seria 2234 nr: 4213 și care a obţinut categoria B în data de 11/05/2021 , a absolvit cursul minim obligatoriu prevăzut la art. 24 alin.(3) din Ordonanţa Guvernului nr. 195/2002 privind circulaţia pe drumurile publice, republicată, cu modificările şi completările ulterioare, necesar conducerii ansamblului de vehicule a cărui masă totală maximă autorizată este mai mare de 3500 kg dar nu depăşeşte 4250 kg, format dintr-un autovehicul trăgător din categoria B şi o remorca a cărei masă totală maximă autorizată depăşeşte 750 kg.`,
            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({}),

          new Paragraph({
            text: `         Cursul a fost efectuat de la data de 05/03/2021 până la data de 05/05/2021 fiind înscris în Registrul Electronic Naţional al Cursanţilor cu nr. 134 / 299.`,
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
          new Paragraph({}),
          new Paragraph({
            text: `Numele și Prenumele`,

            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children:[
              new TextRun({
                text: `Ionescu Ion`,
                bold:true,
              })
             

            ],
           
            alignment: AlignmentType.LEFT,
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
          new Paragraph({}),
          new Paragraph({
            
            text: `Numele și Prenumele`,
            
            alignment: AlignmentType.RIGHT,
          }),
          new Paragraph({
            children:[
              new TextRun({
                text: `Ionescu Ion`,
                bold:true,
              })
            ],
          

            alignment: AlignmentType.RIGHT,
          }),
          new Paragraph({
            text: `Semnătura`,

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
    saveAs(blob, "ADEVERINTA REMORCA.docx");
    console.log("Document created successfully");
  });
}
