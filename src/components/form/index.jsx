/**
 * Input parameters:
1. String of keywords and phrases: a string of censored keywords and phrases separated by spaces or
commas. Phrases will be enclosed in single or double-quotes. Some examples:
Hello world “Boston Red Sox”
‘Pepperoni Pizza’, ‘Cheese Pizza’, beer
2. Document text – the original document text that needs the provided keywords and phrases removed
(masked out).
Returns:
Document text with indicated keywords and phrases removed and replaced with XXXX.

 */

import { useState, useEffect } from 'react';
import fetch from 'node-fetch';
import './style.scss';

const Form = () => {
  const [wordsData, setWordsData] = useState('');
  const [textData, setTextData] = useState('');

  useEffect(() => {
    // debug
    console.log(wordsData);
    console.log(textData);
  });

  const handleWords = (event) => {
    setWordsData(event.target.value);
  };

  const handleText = (event) => {
    setTextData(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        words: wordsData,
        text: textData,
      }),
    };

    fetch('http://localhost:8080/api/process-text', requestOptions)
      .then((res) => res.text())
      .then((res) => console.log(res));
  };

  return (
    <div className='form'>
      <h3>Redact documents</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Words to redact(separate with commas or spaces):
          <input
            type='text'
            name='words'
            value={wordsData}
            onChange={(e) => handleWords(e)}
            />
        </label>
        <label>
          Text to process:
          <textarea
            name='text'
            value={textData}
            onChange={(e) => handleText(e)}
          />
        </label>
        <button className='submit' type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Form;
