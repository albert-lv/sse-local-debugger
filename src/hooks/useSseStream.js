import { useRef, useState, useEffect } from 'react';

const useSseStream = (apiPath, shouldConnect) => {
    const [content, setContent] = useState("");
    const [isStreaming, setIsStreaming] = useState(true);
    const eventSourceRef = useRef(null);

    useEffect(() => {
        if (shouldConnect && apiPath && eventSourceRef.current === null) {
            eventSourceRef.current = new EventSource(apiPath);
            setIsStreaming(true);
            setContent("");
        
            eventSourceRef.current.onmessage = (event) => {
                try {
                    const result = JSON.parse(event.data);
                    if (result && result.content) {
                        setContent((prevContent) => prevContent + result.content);
                    }
                } catch (error) {
                    console.log("Error parsing JSON:", error);
                }
            };
            eventSourceRef.current.onerror = (error) => {
                console.error("EventSource error:", error);
                setIsStreaming(false);
            };
        }
        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
                eventSourceRef.current = null;
                setIsStreaming(false);
            }
        }
    }, [apiPath, shouldConnect]);

    const closeConnection = () => {
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
            setIsStreaming(false);
        }
    };

    return { content, isStreaming, closeConnection };  
};

export default useSseStream;
