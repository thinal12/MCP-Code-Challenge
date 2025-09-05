import pkg from "pdfjs-dist/legacy/build/pdf.js";
const { getDocument } = pkg;
import fs from "fs";
import path from "path";

const resumePath = path.join(process.cwd(), "resources", "Thinal Nuvin Pethiyagoda CV.pdf");

export async function ResumeInfo() {
  if (!fs.existsSync(resumePath)) {
    throw new Error("PDF file not found at " + resumePath);
  }

  const data = new Uint8Array(fs.readFileSync(resumePath));
  const loadingTask = getDocument({ data });
  const pdfDoc = await loadingTask.promise;

  let fullText = "";
  for (let i = 1; i <= pdfDoc.numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str || "").join(" ");
    fullText += pageText + "\n\n"; // extra newline for readability between pages
  }

  return fullText;
}
