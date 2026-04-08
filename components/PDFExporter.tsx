import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export interface PDFOptions {
  filename?: string;
  quality?: number;
  scale?: number;
}

export class PDFExporter {
  private static A4_WIDTH_MM = 210;
  private static A4_HEIGHT_MM = 297;
  private static MARGIN_MM = 10;

  /**
   * Export HTML element to PDF with proper page breaks and formatting
   */
  static async exportToPDF(element: HTMLElement, options: PDFOptions = {}): Promise<void> {
    const {
      filename = "resume.pdf",
      quality = 0.95,
      scale = 2
    } = options;

    try {
      // Show loading state
      this.showLoadingState();

      // Create a clone of the element to avoid modifying the original
      const clonedElement = element.cloneNode(true) as HTMLElement;
      clonedElement.style.width = `${this.A4_WIDTH_MM - this.MARGIN_MM * 2}mm`;
      
      // Temporarily add clone to DOM for proper rendering
      clonedElement.style.position = 'absolute';
      clonedElement.style.left = '-9999px';
      clonedElement.style.top = '0';
      clonedElement.style.opacity = '0';
      document.body.appendChild(clonedElement);

      // Wait for fonts and images to load
      await this.waitForImages(clonedElement);
      await this.delay(500);

      // Capture the element as canvas
      const canvas = await html2canvas(element, {
        scale: scale,
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        removeContainer: true,
        foreignObjectRendering: false,
        imageTimeout: 15000,
        onclone: (clonedDoc) => {
          // Ensure proper styling in the cloned document
          const clonedElement = clonedDoc.querySelector('[data-resume-content]') as HTMLElement;
          if (clonedElement) {
            clonedElement.style.fontFamily = 'Inter, system-ui, -apple-system, sans-serif';
            clonedElement.style.lineHeight = '1.6';
            clonedElement.style.color = '#1f2937';
            clonedElement.style.backgroundColor = '#ffffff';
            // Set white background for all child elements
            const allElements = clonedElement.querySelectorAll('*');
            allElements.forEach(el => {
              const htmlEl = el as HTMLElement;
              if (htmlEl.style) {
                htmlEl.style.backgroundColor = htmlEl.style.backgroundColor || 'transparent';
              }
            });
          }
        }
      });

      // Remove the cloned element
      document.body.removeChild(clonedElement);

      // Create PDF with proper dimensions
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true
      });

      const imgData = canvas.toDataURL("image/png", quality);
      
      // Calculate dimensions to maintain aspect ratio
      const pdfWidth = this.A4_WIDTH_MM - (this.MARGIN_MM * 2);
      const pdfHeight = this.A4_HEIGHT_MM - (this.MARGIN_MM * 2);
      
      // Calculate the scale to fit content without stretching
      const contentWidth = canvas.width / scale;
      const contentHeight = canvas.height / scale;
      
      // Convert mm to pixels (96 DPI = 3.7795 pixels per mm)
      const pdfWidthPixels = pdfWidth * 3.7795;
      const pdfHeightPixels = pdfHeight * 3.7795;
      
      // Calculate scale to fit content within PDF bounds
      const scaleX = pdfWidthPixels / contentWidth;
      const scaleY = pdfHeightPixels / contentHeight;
      const fitScale = Math.min(scaleX, scaleY);
      
      // Calculate final dimensions maintaining aspect ratio
      const finalWidth = contentWidth * fitScale;
      const finalHeight = contentHeight * fitScale;
      
      // Convert back to mm for PDF
      const imgWidthMM = finalWidth / 3.7795;
      const imgHeightMM = finalHeight / 3.7795;
      
      // Calculate how many pages are needed
      const pageHeightPixels = pdfHeight * 3.7795;
      const totalPages = Math.ceil(finalHeight / pageHeightPixels);
      
      // Add pages with proper breaks
      for (let i = 0; i < totalPages; i++) {
        if (i > 0) {
          pdf.addPage();
        }
        
        // Calculate the portion of the image to show on this page
        const yOffset = i * pageHeightPixels;
        const remainingHeight = Math.min(finalHeight - yOffset, pageHeightPixels);
        
        // Create a temporary canvas for this page
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = finalWidth;
        pageCanvas.height = remainingHeight;
        const pageCtx = pageCanvas.getContext('2d');
        
        if (pageCtx) {
          pageCtx.drawImage(
            canvas,
            0, yOffset * scale, finalWidth, remainingHeight * scale,
            0, 0, finalWidth, remainingHeight
          );
          
          const pageImgData = pageCanvas.toDataURL("image/png", quality);
          pdf.addImage(pageImgData, "PNG", this.MARGIN_MM, this.MARGIN_MM, imgWidthMM, remainingHeight / 3.7795);
        }
      }

      // Save the PDF
      pdf.save(filename);
      
      this.hideLoadingState();
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      this.hideLoadingState();
      throw error;
    }
  }

  /**
   * Alternative method: Split content into pages before capturing
   */
  static async exportWithPageBreaks(element: HTMLElement, options: PDFOptions = {}): Promise<void> {
    const {
      filename = "resume.pdf",
      quality = 0.95,
      scale = 2
    } = options;

    try {
      this.showLoadingState();

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true
      });

      const pdfWidth = this.A4_WIDTH_MM - (this.MARGIN_MM * 2);
      const pdfHeight = this.A4_HEIGHT_MM - (this.MARGIN_MM * 2);

      // Find all page break elements
      const pageBreaks = element.querySelectorAll('[data-page-break]') as NodeListOf<HTMLElement>;
      const sections = Array.from(pageBreaks.length > 0 ? pageBreaks : [element]);

      for (let i = 0; i < sections.length; i++) {
        if (i > 0) {
          pdf.addPage();
        }

        const section = sections[i];
        
        // Capture this section
        const canvas = await html2canvas(section as HTMLElement, {
          scale: scale,
          backgroundColor: "#ffffff",
          useCORS: true,
          allowTaint: true,
          logging: false,
        });

        const imgData = canvas.toDataURL("image/png", quality);
        
        // Calculate dimensions to fit the page
        const aspectRatio = canvas.height / canvas.width;
        const fittedHeight = Math.min(pdfHeight, pdfWidth * aspectRatio);
        
        pdf.addImage(imgData, "PNG", this.MARGIN_MM, this.MARGIN_MM, pdfWidth, fittedHeight);
      }

      pdf.save(filename);
      this.hideLoadingState();
      
    } catch (error) {
      console.error("Error generating PDF with page breaks:", error);
      this.hideLoadingState();
      throw error;
    }
  }

  private static showLoadingState(): void {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'pdf-loading-overlay';
    loadingOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      font-family: Inter, system-ui, sans-serif;
      color: white;
    `;
    
    loadingOverlay.innerHTML = `
      <div style="text-align: center;">
        <div style="font-size: 18px; margin-bottom: 10px;">Generating PDF...</div>
        <div style="font-size: 14px; opacity: 0.8;">Please wait while we create your resume</div>
      </div>
    `;
    
    document.body.appendChild(loadingOverlay);
  }

  private static hideLoadingState(): void {
    const loadingOverlay = document.getElementById('pdf-loading-overlay');
    if (loadingOverlay) {
      document.body.removeChild(loadingOverlay);
    }
  }

  private static waitForImages(element: HTMLElement): Promise<void> {
    const images = element.querySelectorAll('img');
    const promises = Array.from(images).map((img): Promise<void> => {
      return new Promise<void>((resolve) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Resolve even on error to continue
        }
      });
    });
    
    return Promise.all(promises).then(() => {});
  }

  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
