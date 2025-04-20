import Tesseract from 'tesseract.js';

export const extractTextFromFile = async (file: File, lang: string): Promise<string> => {
  try {
    const result = await Tesseract.recognize(file, lang, {
      logger: (m) => console.log(m),
    });
    return result.data.text;
  } catch (error) {
    console.error('Error extracting text:', error);
    return 'Error extracting text.';
  }
};
