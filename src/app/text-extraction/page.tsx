'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FileUploader from '../components/FileUploader';
import TextOutput from '../components/TextOutput';
import History from '../components/History';
import { extractTextFromFile } from '../utils/extractText';
import jsPDF from 'jspdf';
import styles from '../styles/TextExtractionPage.module.css'; // Import CSS module


const TextExtractionPage = () => {
  const router = useRouter();
  const [extractedText, setExtractedText] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [disableDownload, setDisableDownload] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('authUser');
    if (!user) {
      router.push('/login'); // Redirect to login if user is not found
    }
  }, [router]);

  const handleFileSelect = async (file: File, lang: string) => {
    setDisableDownload(true);
    const text = await extractTextFromFile(file, lang);
    setExtractedText(text);
    setHistory(prev => [text, ...prev]);
    setDisableDownload(false);
  };

  const handleDownload = () => {
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted-text.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(extractedText || 'No text extracted yet.', 10, 10);
    doc.save('extracted-text.pdf');
  };

  return (
    <div className={styles.textExtractionContainer}>
      <h1 className={styles.welcomeHeading}>Text Extraction App</h1>
      <FileUploader
        onFileSelect={handleFileSelect}
        onDownload={handleDownload}
        onDownloadPDF={handleDownloadPDF}
        disableDownload={disableDownload}
      />
      <div className={styles.contentContainer}>
        <div className={styles.textOutputContainer}>
          <TextOutput text={extractedText} />
        </div>
        <div className={styles.historyContainer}>
          <History entries={history} />
        </div>
      </div>
    </div>
  );
};

export default TextExtractionPage;

