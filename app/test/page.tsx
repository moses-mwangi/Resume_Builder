// "use client";

// import { useRef, useState } from "react";
// import html2canvas from "html2canvas-pro";
// import jsPDF from "jspdf";

// // Demo data for testing
// const demoData = {
//   personalInfo: {
//     fullName: "John Doe",
//     title: "Senior Software Engineer",
//     email: "john.doe@example.com",
//     phone: "+1 (555) 123-4567",
//     location: "San Francisco, CA",
//     summary:
//       "Experienced software engineer with 8+ years of expertise in full-stack development, specializing in React, Next.js, and cloud architecture. Passionate about building scalable applications and mentoring junior developers.",
//   },
//   experience: [
//     {
//       company: "Tech Innovations Inc.",
//       position: "Senior Frontend Developer",
//       startDate: "2021-01",
//       endDate: "Present",
//       description:
//         "Lead frontend development for enterprise SaaS product. Implemented component library, improved performance by 40%, mentored 3 junior developers.",
//     },
//     {
//       company: "Digital Solutions Co.",
//       position: "Full Stack Developer",
//       startDate: "2018-03",
//       endDate: "2020-12",
//       description:
//         "Developed and maintained multiple React applications. Integrated RESTful APIs, implemented responsive designs, and reduced bundle size by 25%.",
//     },
//     {
//       company: "StartUp Labs",
//       position: "Junior Developer",
//       startDate: "2016-06",
//       endDate: "2018-02",
//       description:
//         "Built internal tools using React and Node.js. Collaborated with design team to implement pixel-perfect UIs.",
//     },
//   ],
//   education: [
//     {
//       degree: "M.S. in Computer Science",
//       institution: "Stanford University",
//       year: "2016",
//       details: "Focus on Human-Computer Interaction",
//     },
//     {
//       degree: "B.S. in Software Engineering",
//       institution: "University of Washington",
//       year: "2014",
//       details: "Minor in Mathematics, Cum Laude",
//     },
//   ],
//   skills: [
//     "React",
//     "Next.js",
//     "TypeScript",
//     "Tailwind CSS",
//     "Node.js",
//     "Python",
//     "AWS",
//     "GraphQL",
//     "PostgreSQL",
//     "Docker",
//   ],
//   certifications: [
//     "AWS Solutions Architect - Professional",
//     "Google Cloud Developer Certified",
//     "Scrum Master Certification",
//   ],
// };

// interface PdfExporterWithBreaksProps {
//   data?: typeof demoData;
//   fileName?: string;
// }

// export default function PdfExporterWithBreaks({
//   data = demoData,
//   fileName = "exported-document",
// }: PdfExporterWithBreaksProps) {
//   const contentRef = useRef<HTMLDivElement>(null);
//   const [isExporting, setIsExporting] = useState(false);
//   const [exportSuccess, setExportSuccess] = useState(false);

//   // Calculate how many pages are needed and split content
//   const splitContentIntoPages = async (element: HTMLElement) => {
//     const originalOverflow = element.style.overflow;
//     const originalHeight = element.style.height;

//     // Temporarily set to visible to get full height
//     element.style.overflow = "visible";
//     element.style.height = "auto";

//     // Get all potential page break markers
//     const pageBreaks = element.querySelectorAll("[data-page-break]");
//     const sections: HTMLElement[] = [];

//     // Group content into pages based on data-page-break attributes
//     let currentPage: HTMLElement[] = [];
//     const children = Array.from(element.children);

//     for (const child of children) {
//       currentPage.push(child as HTMLElement);

//       if ((child as HTMLElement).getAttribute("data-page-break") === "after") {
//         sections.push(...currentPage);
//         sections.push(document.createElement("div")); // Page separator
//         currentPage = [];
//       }
//     }

//     if (currentPage.length > 0) {
//       sections.push(...currentPage);
//     }

//     // Restore original styles
//     element.style.overflow = originalOverflow;
//     element.style.height = originalHeight;

//     return sections.length > 0 ? sections : null;
//   };

//   const exportToPDF = async () => {
//     if (!contentRef.current) return;
//     setIsExporting(true);

//     try {
//       const element = contentRef.current;
//       const originalDisplay = element.style.display;

//       // Ensure element is visible for capture
//       element.style.display = "block";

//       // Capture the entire content as one long canvas (supports Tailwind v6 colors)
//       const canvas = await html2canvas(element, {
//         scale: 3, // Higher scale for better quality
//         backgroundColor: "#ffffff",
//         useCORS: true,
//         logging: false,
//         // Tailwind v6 OKLCH color support
//         onclone: (clonedDoc, element) => {
//           // Ensure cloned element preserves all styles
//           const clonedElement =
//             clonedDoc.body.querySelector("[data-pdf-export]");
//           if (clonedElement) {
//             // Force all Tailwind colors to render correctly
//             const allElements = clonedDoc.querySelectorAll("*");
//             allElements.forEach((el: any) => {
//               const computedStyle = clonedDoc.defaultView?.getComputedStyle(el);
//               if (computedStyle) {
//                 // Preserve OKLCH colors
//                 const bgColor = computedStyle.backgroundColor;
//                 const color = computedStyle.color;
//                 if (bgColor && bgColor.includes("oklch")) {
//                   el.style.backgroundColor = bgColor;
//                 }
//                 if (color && color.includes("oklch")) {
//                   el.style.color = color;
//                 }
//               }
//             });
//           }
//         },
//       });

//       const imgData = canvas.toDataURL("image/png");

//       // PDF configuration
//       const pdf = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: "a4",
//       });

//       // A4 dimensions in mm: 210 x 297
//       const PDF_WIDTH = 210;
//       const PDF_HEIGHT = 297;
//       const MARGIN = 10;
//       const CONTENT_WIDTH = PDF_WIDTH - MARGIN * 2;

//       // Calculate image dimensions
//       const imgWidth = CONTENT_WIDTH;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//       // Calculate how many pages are needed
//       const pageHeight = PDF_HEIGHT - MARGIN * 2;
//       const totalPages = Math.ceil(imgHeight / pageHeight);

//       // Add first page
//       let currentY = MARGIN;
//       let remainingHeight = imgHeight;
//       let currentPosition = 0;

//       for (let page = 0; page < totalPages; page++) {
//         if (page > 0) {
//           pdf.addPage();
//           currentY = MARGIN;
//         }

//         // Calculate the slice of the image to draw
//         const sourceY = currentPosition;
//         const sliceHeight = Math.min(pageHeight, remainingHeight);

//         // Add image slice to PDF
//         pdf.addImage(
//           imgData,
//           "PNG",
//           MARGIN,
//           currentY,
//           imgWidth,
//           sliceHeight,
//           undefined,
//           "NONE",
//           0,
//           (sourceY / canvas.height) * 100, // Source Y position ratio
//         );

//         // Update positions
//         currentPosition += sliceHeight;
//         remainingHeight -= sliceHeight;

//         // Add page number
//         pdf.setFontSize(10);
//         pdf.setTextColor(100, 100, 100);
//         pdf.text(
//           `Page ${page + 1} of ${totalPages}`,
//           PDF_WIDTH / 2,
//           PDF_HEIGHT - 5,
//           { align: "center" },
//         );
//       }

//       // Handle clickable elements (optional - uncomment if needed)
//       const clickableElements = element.querySelectorAll(
//         '[data-clickable="true"]',
//       );

//       if (clickableElements.length > 0) {
//         // Note: With multi-page PDFs, link positioning becomes complex
//         // This is a simplified version that only adds links to first page
//         clickableElements.forEach((el) => {
//           const url = el.getAttribute("data-url");
//           if (!url) return;

//           const rect = el.getBoundingClientRect();
//           const containerRect = element.getBoundingClientRect();

//           const x =
//             ((rect.left - containerRect.left) / containerRect.width) *
//               CONTENT_WIDTH +
//             MARGIN;
//           const y =
//             ((rect.top - containerRect.top) / containerRect.height) *
//               pageHeight +
//             MARGIN;
//           const width = (rect.width / containerRect.width) * CONTENT_WIDTH;
//           const height = (rect.height / containerRect.height) * pageHeight;

//           if (y <= PDF_HEIGHT - MARGIN) {
//             // Only add if on first page
//             pdf.link(x, y, width, height, { url });
//           }
//         });
//       }

//       pdf.save(`${fileName}.pdf`);
//       setExportSuccess(true);
//       setTimeout(() => setExportSuccess(false), 3000);

//       // Restore original display
//       element.style.display = originalDisplay;
//     } catch (error) {
//       console.error("PDF Export Error:", error);
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto p-6 bg-gray-50 dark:bg-gray-900">
//       {/* Export Button */}
//       <div className="mb-6 flex justify-end gap-4">
//         <button
//           onClick={exportToPDF}
//           disabled={isExporting}
//           className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           style={{ backgroundColor: "#2563eb" }} // Fallback for Tailwind v6
//         >
//           {isExporting ? "Generating PDF..." : "📄 Export to PDF"}
//         </button>

//         {exportSuccess && (
//           <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
//             ✓ PDF exported successfully!
//           </div>
//         )}
//       </div>

//       {/* Content to Export - Supports Tailwind v6 */}
//       <div
//         ref={contentRef}
//         data-pdf-export
//         className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
//         style={{ backgroundColor: "#ffffff" }} // Fallback
//       >
//         {/* Page 1 */}
//         <div className="p-8">
//           {/* Header */}
//           <div className="border-b border-gray-200 pb-6 mb-6">
//             <h1
//               className="text-4xl font-bold mb-2"
//               style={{ color: "#1f2937" }}
//             >
//               {data.personalInfo.fullName}
//             </h1>
//             <p className="text-xl mb-4" style={{ color: "#4b5563" }}>
//               {data.personalInfo.title}
//             </p>
//             <div
//               className="flex flex-wrap gap-4 text-sm"
//               style={{ color: "#6b7280" }}
//             >
//               <span>📧 {data.personalInfo.email}</span>
//               <span>📱 {data.personalInfo.phone}</span>
//               <span>📍 {data.personalInfo.location}</span>
//             </div>
//           </div>

//           {/* Summary */}
//           <div className="mb-8">
//             <h2
//               className="text-2xl font-semibold mb-3 pb-2 border-b-2 border-blue-500"
//               style={{ color: "#1f2937" }}
//             >
//               Professional Summary
//             </h2>
//             <p className="leading-relaxed" style={{ color: "#374151" }}>
//               {data.personalInfo.summary}
//             </p>
//           </div>

//           {/* Work Experience */}
//           <div className="mb-8">
//             <h2
//               className="text-2xl font-semibold mb-4 pb-2 border-b-2 border-blue-500"
//               style={{ color: "#1f2937" }}
//             >
//               Work Experience
//             </h2>
//             {data.experience.map((job, idx) => (
//               <div key={idx} className="mb-6">
//                 <div className="flex justify-between items-start mb-2">
//                   <div>
//                     <h3
//                       className="text-xl font-semibold"
//                       style={{ color: "#1f2937" }}
//                     >
//                       {job.position}
//                     </h3>
//                     <p className="font-medium" style={{ color: "#4b5563" }}>
//                       {job.company}
//                     </p>
//                   </div>
//                   <p className="text-sm" style={{ color: "#6b7280" }}>
//                     {job.startDate} - {job.endDate}
//                   </p>
//                 </div>
//                 <p className="leading-relaxed" style={{ color: "#374151" }}>
//                   {job.description}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* Page Break - Force new page after this point */}
//           <div data-page-break="after" className="hidden"></div>
//         </div>

//         {/* Page 2 */}
//         <div className="p-8" data-page-break>
//           {/* Education */}
//           <div className="mb-8">
//             <h2
//               className="text-2xl font-semibold mb-4 pb-2 border-b-2 border-blue-500"
//               style={{ color: "#1f2937" }}
//             >
//               Education
//             </h2>
//             {data.education.map((edu, idx) => (
//               <div key={idx} className="mb-4">
//                 <div className="flex justify-between items-start mb-1">
//                   <h3
//                     className="text-xl font-semibold"
//                     style={{ color: "#1f2937" }}
//                   >
//                     {edu.degree}
//                   </h3>
//                   <p className="text-sm" style={{ color: "#6b7280" }}>
//                     {edu.year}
//                   </p>
//                 </div>
//                 <p className="font-medium mb-1" style={{ color: "#4b5563" }}>
//                   {edu.institution}
//                 </p>
//                 <p className="text-sm" style={{ color: "#6b7280" }}>
//                   {edu.details}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* Skills Grid */}
//           <div className="mb-8">
//             <h2
//               className="text-2xl font-semibold mb-4 pb-2 border-b-2 border-blue-500"
//               style={{ color: "#1f2937" }}
//             >
//               Technical Skills
//             </h2>
//             <div className="flex flex-wrap gap-2">
//               {data.skills.map((skill, idx) => (
//                 <span
//                   key={idx}
//                   className="px-3 py-1 rounded-full text-sm font-medium"
//                   style={{
//                     backgroundColor: "#e0e7ff",
//                     color: "#3730a3",
//                   }}
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Certifications */}
//           <div className="mb-8">
//             <h2
//               className="text-2xl font-semibold mb-4 pb-2 border-b-2 border-blue-500"
//               style={{ color: "#1f2937" }}
//             >
//               Certifications
//             </h2>
//             <ul className="list-disc list-inside space-y-2">
//               {data.certifications.map((cert, idx) => (
//                 <li key={idx} style={{ color: "#374151" }}>
//                   {cert}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Test Tailwind v6 Colors (OKLCH format) */}
//           <div
//             className="mt-8 p-4 rounded-lg"
//             style={{
//               backgroundColor: "oklch(0.9 0.1 200)",
//               color: "oklch(0.2 0.05 260)",
//             }}
//           >
//             <p className="text-center font-medium">
//               ✅ Tailwind v6 OKLCH colors are properly supported!
//             </p>
//           </div>
//         </div>
//       </div>
//       <div
//         ref={contentRef}
//         data-pdf-export
//         className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
//         style={{ backgroundColor: "#ffffff" }} // Fallback
//       >
//         {/* Page 1 */}
//         <div className="p-8">
//           {/* Header */}
//           <div className="border-b border-gray-200 pb-6 mb-6">
//             <h1
//               className="text-4xl font-bold mb-2"
//               style={{ color: "#1f2937" }}
//             >
//               {data.personalInfo.fullName}
//             </h1>
//             <p className="text-xl mb-4" style={{ color: "#4b5563" }}>
//               {data.personalInfo.title}
//             </p>
//             <div
//               className="flex flex-wrap gap-4 text-sm"
//               style={{ color: "#6b7280" }}
//             >
//               <span>📧 {data.personalInfo.email}</span>
//               <span>📱 {data.personalInfo.phone}</span>
//               <span>📍 {data.personalInfo.location}</span>
//             </div>
//           </div>

//           {/* Summary */}
//           <div className="mb-8">
//             <h2
//               className="text-2xl font-semibold mb-3 pb-2 border-b-2 border-blue-500"
//               style={{ color: "#1f2937" }}
//             >
//               Professional Summary
//             </h2>
//             <p className="leading-relaxed" style={{ color: "#374151" }}>
//               {data.personalInfo.summary}
//             </p>
//           </div>

//           {/* Work Experience */}
//           <div className="mb-8">
//             <h2
//               className="text-2xl font-semibold mb-4 pb-2 border-b-2 border-blue-500"
//               style={{ color: "#1f2937" }}
//             >
//               Work Experience
//             </h2>
//             {data.experience.map((job, idx) => (
//               <div key={idx} className="mb-6">
//                 <div className="flex justify-between items-start mb-2">
//                   <div>
//                     <h3
//                       className="text-xl font-semibold"
//                       style={{ color: "#1f2937" }}
//                     >
//                       {job.position}
//                     </h3>
//                     <p className="font-medium" style={{ color: "#4b5563" }}>
//                       {job.company}
//                     </p>
//                   </div>
//                   <p className="text-sm" style={{ color: "#6b7280" }}>
//                     {job.startDate} - {job.endDate}
//                   </p>
//                 </div>
//                 <p className="leading-relaxed" style={{ color: "#374151" }}>
//                   {job.description}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* Page Break - Force new page after this point */}
//           <div data-page-break="after" className="hidden"></div>
//         </div>

//         {/* Page 2 */}
//         <div className="p-8" data-page-break>
//           {/* Education */}
//           <div className="mb-8">
//             <h2
//               className="text-2xl font-semibold mb-4 pb-2 border-b-2 border-blue-500"
//               style={{ color: "#1f2937" }}
//             >
//               Education
//             </h2>
//             {data.education.map((edu, idx) => (
//               <div key={idx} className="mb-4">
//                 <div className="flex justify-between items-start mb-1">
//                   <h3
//                     className="text-xl font-semibold"
//                     style={{ color: "#1f2937" }}
//                   >
//                     {edu.degree}
//                   </h3>
//                   <p className="text-sm" style={{ color: "#6b7280" }}>
//                     {edu.year}
//                   </p>
//                 </div>
//                 <p className="font-medium mb-1" style={{ color: "#4b5563" }}>
//                   {edu.institution}
//                 </p>
//                 <p className="text-sm" style={{ color: "#6b7280" }}>
//                   {edu.details}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* Skills Grid */}
//           <div className="mb-8">
//             <h2
//               className="text-2xl font-semibold mb-4 pb-2 border-b-2 border-blue-500"
//               style={{ color: "#1f2937" }}
//             >
//               Technical Skills
//             </h2>
//             <div className="flex flex-wrap gap-2">
//               {data.skills.map((skill, idx) => (
//                 <span
//                   key={idx}
//                   className="px-3 py-1 rounded-full text-sm font-medium"
//                   style={{
//                     backgroundColor: "#e0e7ff",
//                     color: "#3730a3",
//                   }}
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Certifications */}
//           <div className="mb-8">
//             <h2
//               className="text-2xl font-semibold mb-4 pb-2 border-b-2 border-blue-500"
//               style={{ color: "#1f2937" }}
//             >
//               Certifications
//             </h2>
//             <ul className="list-disc list-inside space-y-2">
//               {data.certifications.map((cert, idx) => (
//                 <li key={idx} style={{ color: "#374151" }}>
//                   {cert}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Test Tailwind v6 Colors (OKLCH format) */}
//           <div
//             className="mt-8 p-4 rounded-lg"
//             style={{
//               backgroundColor: "oklch(0.9 0.1 200)",
//               color: "oklch(0.2 0.05 260)",
//             }}
//           >
//             <p className="text-center font-medium">
//               ✅ Tailwind v6 OKLCH colors are properly supported!
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF, { Html2CanvasOptions } from "jspdf";
import Html2PdfOptions from "html2pdf.js";
import html2pdf from "html2pdf.js";

export default function PdfExporter() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    if (!contentRef.current) return;
    setIsExporting(true);

    try {
      const html2pdf = (await import("html2pdf.js")).default;

      // const options = {
      //   margin: 0.5,
      //   filename: "my-document.pdf",
      //   image: { type: "jpeg", quality: 0.98 },
      //   html2canvas: { scale: 2 },
      //   jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      //   pagebreak: { mode: ["css", "legacy"] } as any,
      // };

      // const options: Html2PdfOptions = {
      const options = {
        margin: 0.5,
        filename: "my-document.pdf",
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" as const },
        pagebreak: { mode: ["css", "legacy"] },
      };

      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
      });

      // await html2pdf().set(options).from(canvas).save();
      await html2pdf()
        .set(options)
        .from(contentRef.current) // ✅ pass element, not canvas
        .save();
    } catch (error) {
      console.error("PDF Export Error:", error);
    } finally {
      setIsExporting(false);
    }
  };
  const exportToPDFd = async () => {
    if (!contentRef.current) return;
    setIsExporting(true);

    try {
      // 1. Capture canvas with html2canvas-pro (supports Tailwind v6)
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      // 2. Setup PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      // 3. Calculate dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // 4. Split into multiple pages
      let heightLeft = imgHeight;
      let position = 0;
      let page = 1;

      // Add first page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Add remaining pages
      while (heightLeft > 0) {
        position = position - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
        page++;
      }

      pdf.save("my-document.pdf");
    } catch (error) {
      console.error("PDF Export Error:", error);
    } finally {
      setIsExporting(false);
    }
  };

  // Generate 50 paragraphs of lorem ipsum for testing
  const generateLoremIpsum = (count: number) => {
    const ipsum =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    return Array(count)
      .fill(null)
      .map((_, i) => (
        <div key={i} className="mb-4 p-3 border-b border-gray-200">
          <h3 className="font-bold text-lg mb-2">Section {i + 1}</h3>
          <p className="text-gray-700 leading-relaxed">
            {ipsum} {ipsum.slice(0, 100)}
          </p>
          {i % 5 === 0 && i > 0 && (
            <div className="mt-3 p-2 bg-blue-50 rounded">
              <span className="text-blue-600">
                ✨ Highlight: Important information here
              </span>
            </div>
          )}
        </div>
      ));
  };

  // Generate 30 list items
  const generateListItems = (count: number) => {
    return Array(count)
      .fill(null)
      .map((_, i) => (
        <li key={i} className="mb-2 ml-6">
          <span className="font-medium">Item {i + 1}:</span> Detailed
          description with some extra text to make it wrap to multiple lines
          naturally
        </li>
      ));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="sticky top-0 bg-white z-10 pb-4 mb-4 border-b shadow-sm">
        <button
          onClick={exportToPDF}
          disabled={isExporting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          {isExporting ? "📄 Generating PDF..." : "📑 Download Multi-Page PDF"}
        </button>
        {isExporting && (
          <p className="text-sm text-gray-500 mt-2">
            Rendering large content, please wait...
          </p>
        )}
      </div>

      {/* Content to export - will span MANY pages automatically */}
      <div ref={contentRef} className="mt-4 p-8 bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div className="text-center mb-8 pb-4 border-b-2 border-gray-300">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Complete Documentation
          </h1>
          <p className="text-xl text-gray-600">
            Multi-Page PDF Test with Automatic Page Breaks
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Generated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Executive Summary */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3 border-l-4 border-blue-500 pl-3">
            Executive Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">
            This document contains extensive content designed to test automatic
            page breaking functionality. The html2pdf.js library with
            html2canvas-pro will automatically split this content across
            multiple A4 pages without any manual page break indicators. Each
            section will flow naturally to the next page when content exceeds
            the page height.
          </p>
        </div>

        {/* Detailed Analysis Section - Large Table */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3 border-l-4 border-blue-500 pl-3">
            Data Analysis Report
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 p-2 text-left">ID</th>
                  <th className="border border-gray-300 p-2 text-left">
                    Project Name
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Status
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Completion
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array(25)
                  .fill(null)
                  .map((_, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="border border-gray-300 p-2">
                        #{1000 + i}
                      </td>
                      <td className="border border-gray-300 p-2">
                        Project {String.fromCharCode(65 + (i % 26))}
                        {i}
                      </td>
                      <td className="border border-gray-300 p-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${i % 3 === 0 ? "bg-green-100 text-green-800" : i % 3 === 1 ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"}`}
                        >
                          {i % 3 === 0
                            ? "Completed"
                            : i % 3 === 1
                              ? "In Progress"
                              : "Planning"}
                        </span>
                      </td>
                      <td className="border border-gray-300 p-2">
                        {(i % 5) * 20}%
                      </td>
                      <td className="border border-gray-300 p-2">
                        ${(i * 12450).toLocaleString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Findings - Multiple sections */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3 border-l-4 border-blue-500 pl-3">
            Key Findings & Analysis
          </h2>
          {generateLoremIpsum(35)}
        </div>

        {/* Detailed List Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3 border-l-4 border-blue-500 pl-3">
            Comprehensive Itemized List
          </h2>
          <ul className="list-disc space-y-1">{generateListItems(45)}</ul>
        </div>

        {/* Statistics Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3 border-l-4 border-blue-500 pl-3">
            Performance Metrics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array(18)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200"
                >
                  <div className="text-sm text-gray-500 mb-1">
                    Metric {i + 1}
                  </div>
                  {/* <div className="text-2xl font-bold text-blue-600"> */}
                  {/* <div className="">{(Math.random() * 100).toFixed(1)}%</div> */}
                  {/* <div className="text-xs text-gray-400 mt-1">
                    Change: +{(Math.random() * 15).toFixed(1)}%
                  </div> */}
                </div>
              ))}
          </div>
        </div>

        {/* Charts Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3 border-l-4 border-blue-500 pl-3">
            Data Visualization Summary
          </h2>
          {Array(8)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="mb-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-lg mb-2">
                  Chart {i + 1}: Distribution Analysis
                </h3>
                <div className="h-32 bg-gradient-to-r from-blue-200 to-purple-200 rounded flex items-center justify-center">
                  <span className="text-gray-600">
                    [Chart visualization would be here]
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  This chart demonstrates the correlation between various
                  factors over time.
                </p>
              </div>
            ))}
        </div>

        {/* Recommendations */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3 border-l-4 border-blue-500 pl-3">
            Strategic Recommendations
          </h2>
          <div className="space-y-3">
            {Array(12)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg"
                >
                  <div className="text-blue-600 font-bold text-xl">
                    {i + 1}.
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Recommendation {i + 1}
                    </h4>
                    <p className="text-gray-600">
                      Detailed implementation strategy with expected outcomes
                      and resource requirements.
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Footer with Tailwind v4 gradient */}
        <div className="mt-8 pt-4 border-t-2 border-gray-300 text-center">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 rounded-lg text-white">
            <p className="font-semibold">
              ✅ Tailwind v4 OKLCH colors working perfectly!
            </p>
            <p className="text-sm mt-1">
              This document was automatically paginated - no manual page breaks
              needed
            </p>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Page breaks will be inserted automatically when content exceeds A4
            page height
          </p>
        </div>
      </div>
    </div>
  );
}
