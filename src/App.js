import React, { useState, useEffect } from 'react';
import SseInputForm from './components/SseInputForm';
import SseOutputDisplay from './components/SseOutputDisplay';
import useSseStream from './hooks/useSseStream';
import './App.css';

function App() {
  const [apiUrl, setApiUrl] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);

  const { content, isStreaming, closeConnection } = useSseStream(apiUrl, isRequesting);

  useEffect(() => {
    if (!isStreaming) {
      setIsRequesting(false);
    }
  }, [isStreaming]);

  return (
    <div className='app-container'>
      <h1>SSE Local Debugger</h1>
      <SseInputForm apiUrl={apiUrl} isRequesting={isRequesting} setApiUrl={setApiUrl} setIsRequesting={setIsRequesting} closeConnection={closeConnection} />
      <SseOutputDisplay content={content} />
    </div>
  )
}

export default App;
