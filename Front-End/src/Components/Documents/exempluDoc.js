import { saveAs } from "file-saver";
import {
  Packer,
  Document,
  HeadingLevel,
  VerticalAlign,
  HorizontalPositionAlign,
} from "docx";
import { Paragraph } from "docx";

//functie exemplu
export default function generateContract() {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: "Hello World",
            heading: HeadingLevel.HEADING_1,
          }),
        ],
        VerticalAlign: VerticalAlign.CENTER,
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    console.log(blob);
    saveAs(blob, "example.docx");
    console.log("Document created successfully");
  });
}