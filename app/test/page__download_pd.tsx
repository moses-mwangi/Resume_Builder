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
