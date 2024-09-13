// pages/index.js

import { useState } from 'react';

export default function Home() {
  const [currentQuote, setCurrentQuote] = useState('');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [fontFamily, setFontFamily] = useState('Arial, sans-serif');
  const [loading, setLoading] = useState(false);

  const generateRandomQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generateQuote');
      const data = await response.json();

      if (response.ok) {
        setCurrentQuote(data.quote);
      } else {
        console.error('Error fetching quote:', data.message);
        setCurrentQuote('Sorry, something went wrong.');
      }
    } catch (error) {
      console.error('Request failed:', error);
      setCurrentQuote('Sorry, something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      currentQuote
    )}`;
    window.open(twitterUrl, '_blank');
  };

  const changeBackgroundColor = () => {
    const colors = ['#FFCDD2', '#C8E6C9', '#BBDEFB', '#FFF9C4', '#D1C4E9'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  };

  const changeFontFamily = () => {
    const fonts = [
      'Arial, sans-serif',
      'Georgia, serif',
      'Tahoma, sans-serif',
      'Courier New, monospace',
    ];
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    setFontFamily(randomFont);
  };

  return (
    <div
      className="container"
      style={{ backgroundColor: bgColor, fontFamily: fontFamily }}
    >
      <h1>Interactive Quote Generator</h1>
      {currentQuote && <p>{currentQuote}</p>}

      <button onClick={generateRandomQuote} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Quote'}
      </button>

      {currentQuote && (
        <>
          <button onClick={tweetQuote}>Tweet This Quote</button>
          <button onClick={changeBackgroundColor}>Change Background Color</button>
          <button onClick={changeFontFamily}>Change Font</button>
        </>
      )}
    </div>
  );
}