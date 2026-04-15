import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const PDFExporter = {
  exportToPDF: async (element: HTMLElement, options: any) => {
    const canvas = await html2canvas(element, {
      scale: options.scale || 2,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save(options.filename || "resume.pdf");
  },
};
