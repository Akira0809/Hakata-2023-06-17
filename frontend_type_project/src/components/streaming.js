import React, { useEffect, useState } from 'react';

const StreamingJsonComponent = () => {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:8080/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "prefecture": "愛媛県",
          "question": "観光スポットはありますか？"
        })
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');

      const processStream = (result) => {
        if (result.done) return;

        const chunk = decoder.decode(result.value);

        try {
          const parsedChunk = JSON.parse(chunk);
          if (parsedChunk.answer) {
            setResponse((oldResponse) => oldResponse + parsedChunk.answer);
          }
        } catch (error) {
          console.error('Error parsing chunk:', error);
        }

        reader.read().then(processStream);
      }

      reader.read().then(processStream);
    };

    fetchData();
  }, []);

  return (
    <div>{response}</div>
  );
};

export default StreamingJsonComponent;
