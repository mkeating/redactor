/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import fetch from 'node-fetch';
import Pending from './subcomponents/pending.jsx';
import Failure from './subcomponents/failure.jsx';
import Redacted from './subcomponents/redacted.jsx';

import './style.scss';

const Form = () => {
  // form data
  const [wordsData, setWordsData] = useState('');
  const [textData, setTextData] = useState('');

  // UI states
  const [displayForm, setDisplayForm] = useState(true);
  const [displayPending, setDisplayPending] = useState(false);
  const [displayRedacted, setDisplayRedacted] = useState(null);
  const [displayError, setdisplayError] = useState(false);

  const handleWords = (event) => {
    setWordsData(event.target.value);
  };

  const handleText = (event) => {
    setTextData(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisplayPending(true);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        words: wordsData,
        text: textData,
      }),
    };

    const response = await fetch('http://localhost:8080/api/process-text', requestOptions)
      .catch((err) => {
        setdisplayError(true);
        setDisplayPending(false);
        setDisplayForm(true);
      });

    if (response && response.ok) {
      const data = await response.json();
      setDisplayRedacted(data.body.redacted);
      setDisplayPending(false);
      setDisplayForm(false);
    }
  };

  return (
    <div className='form-container'>

      {/** Form state */}
      {displayForm && (
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
          <button
            disabled={(wordsData.length === 0 || textData.length === 0) && 'disabled'}
            className='submit'
            type='submit'
          >
            Submit
          </button>
        </form>
      </div>
      )}

      {/** Pending State */}
      {displayPending && <Pending />}

      {/** Success State */}
      {displayRedacted && <Redacted text={displayRedacted} />}

      {/** Fail state */}
      {displayError && <Failure />}
    </div>
  );
};

export default Form;
