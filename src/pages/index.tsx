import React, { useState } from 'react';

interface QuoteResponse {
  quote: string;
  message?: string;
}

const Home: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<string>('');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [fontFamily, setFontFamily] = useState<string>('Arial, sans-serif');
  const [loading, setLoading] = useState<boolean>(false);

  const generateRandomQuote = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch('/api/generateQuote');
      const data: QuoteResponse = await response.json();

      if (response.ok) {
        setCurrentQuote(data.quote);
      } else {
        console.error('Error fetching quote:', data.message);
        setCurrentQuote('Sorry, something went wrong.');
      }
    } catch (error: unknown) {
      console.error('Request failed:', error);
      setCurrentQuote('Sorry, something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const tweetQuote = (): void => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      currentQuote
    )}`;
    window.open(twitterUrl, '_blank');
  };

  const changeBackgroundColor = (): void => {
    const colors: string[] = ['#FFCDD2', '#C8E6C9', '#BBDEFB', '#FFF9C4', '#D1C4E9'];
    const randomColor: string = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  };

  const changeFontFamily = (): void => {
    const fonts: string[] = [
      'Arial, sans-serif',
      'Georgia, serif',
      'Tahoma, sans-serif',
      'Courier New, monospace',
    ];
    const randomFont: string = fonts[Math.floor(Math.random() * fonts.length)];
    setFontFamily(randomFont);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: bgColor, fontFamily: fontFamily }}
    >
      <h1 className="text-4xl font-bold mb-8">Interactive Quote Generator</h1>
      {currentQuote && (
        <p className="text-xl italic text-center mb-6">{currentQuote}</p>
      )}

      <button
        onClick={generateRandomQuote}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded shadow mb-6 disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Quote'}
      </button>

      {currentQuote && (
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <button
            onClick={tweetQuote}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded shadow"
          >
            Tweet This Quote
          </button>
          <button
            onClick={changeBackgroundColor}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded shadow"
          >
            Change Background Color
          </button>
          <button
            onClick={changeFontFamily}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded shadow"
          >
            Change Font
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
