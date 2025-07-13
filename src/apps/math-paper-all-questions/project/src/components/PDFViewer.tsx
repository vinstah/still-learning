import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  url: string;
  title: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ url, title }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => Math.min(Math.max(1, prevPageNumber + offset), numPages || 1));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border-2 border-amber-200">
      <div className="bg-amber-100 px-4 py-3 rounded-t-lg border-b border-amber-200">
        <h3 className="font-handwriting text-xl text-amber-800">{title}</h3>
      </div>
      
      <div className="p-4">
        <div className="flex justify-center mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => changePage(-1)}
              disabled={pageNumber <= 1}
              className="p-2 rounded-full hover:bg-amber-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={24} className="text-amber-700" />
            </button>
            
            <span className="font-handwriting text-lg">
              Page {pageNumber} of {numPages || '--'}
            </span>
            
            <button
              onClick={() => changePage(1)}
              disabled={pageNumber >= (numPages || 1)}
              className="p-2 rounded-full hover:bg-amber-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={24} className="text-amber-700" />
            </button>
            
            <select
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="ml-4 px-3 py-1 rounded border-2 border-amber-200 font-handwriting text-amber-800"
            >
              <option value={0.5}>50%</option>
              <option value={0.75}>75%</option>
              <option value={1.0}>100%</option>
              <option value={1.25}>125%</option>
              <option value={1.5}>150%</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            className="border-2 border-amber-100 rounded"
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              className="shadow-lg"
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;