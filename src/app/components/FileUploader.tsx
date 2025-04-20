'use client';
import React, { useState } from 'react';
import styles from '../styles/FileUploader.module.css'; // Import the CSS module

interface Props {
  onFileSelect: (file: File, lang: string) => void;
  onDownload: () => void;
  onDownloadPDF: () => void;
  disableDownload: boolean;
}

const FileUploader = ({ onFileSelect, onDownload, onDownloadPDF, disableDownload }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [lang, setLang] = useState<string>('eng');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleExtract = () => {
    if (selectedFile) {
      onFileSelect(selectedFile, lang);
    } else {
      alert('Please upload a file.');
    }
  };

  return (
    <div className={styles.uploaderContainer}>
      <input
        type="file"
        accept=".png,.jpg,.jpeg,.pdf"
        onChange={handleChange}
        className={styles.inputFile}
      />
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className={styles.selectLang}
      >
        <option value="eng">English</option>
        <option value="tam">Tamil</option>
        <option value="hin">Hindi</option>
        {/* Add more languages as needed */}
      </select>
      <button
        onClick={handleExtract}
        className={`${styles.button} ${styles.extractButton}`}
      >
        Extract Text
      </button>
      <button
        onClick={onDownload}
        disabled={disableDownload}
        className={`${styles.button} ${styles.downloadButton}`}
      >
        Download TXT
      </button>
      <button
        onClick={onDownloadPDF}
        disabled={disableDownload}
        className={`${styles.button} ${styles.downloadPDFButton}`}
        style={{ marginLeft: '10px' }}
      >
        Download PDF
      </button>
    </div>
  );
};

export default FileUploader;
