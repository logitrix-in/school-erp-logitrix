import { useState } from 'react';
import { Document, Page } from 'react-pdf';

export default function PDFViewer() {
    const [pageNumber, setPageNumber] = useState(null);

    return (
        <div>
            <Document file="somefile.pdf">
                <Page pageNumber={pageNumber} />
            </Document>
            <p>
            </p>
        </div>
    );
}