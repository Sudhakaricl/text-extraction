'use client';
import React from 'react';
import styles from '../styles/History.module.css'; // Import the CSS module

interface HistoryProps {
  entries: string[];
}

const History: React.FC<HistoryProps> = ({ entries }) => {
  return (
    <div className={styles.historyContainer}>
      <h2 className={styles.historyTitle}>History</h2>
      <ul className={styles.historyList}>
        {entries.map((entry, index) => (
          <li key={index} className={styles.historyItem}>
            {entry}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
