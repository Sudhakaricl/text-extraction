'use client';
import React from 'react';

interface Props {
  text: string;
}

const TextOutput = ({ text }: Props) => {
  return (
    <div style={{ padding: '20px', marginTop: '20px' }}>
      <h3>Extracted Text:</h3>
      <textarea value={text} readOnly rows={15} style={{ width: '100%', padding: '10px' }} />
    </div>
  );
};

export default TextOutput;
