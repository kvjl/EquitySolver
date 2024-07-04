import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GeminiComponent = ({ initialPrompt }) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setPrompt(initialPrompt);
  }, [initialPrompt]);

  const submitPrompt = async (newPrompt, retryCount = 0) => {
    setLoading(true);
    setError("");
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(newPrompt);
      const text = await result.response.text();
      setResponse(text.trim());
    } catch (error) {
      if (error.message.includes("429") && retryCount < 3) {
        // Exponential backoff
        const delay = Math.pow(2, retryCount) * 1000;
        console.warn(
          `Rate limit exceeded. Retrying in ${delay / 1000} seconds...`
        );
        setTimeout(() => submitPrompt(newPrompt, retryCount + 1), delay);
      } else {
        console.error("Error:", error);
        setError(
          "An error occurred while fetching the response. Please try again later."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    submitPrompt(prompt);
  };

  return (
    <div className="gemini-component">
      <h1>Gemini React App</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here"
      />
      <button onClick={handleSubmit}>Submit</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && response && (
        <div>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default GeminiComponent;
